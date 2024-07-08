from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks, status, Form, Response, Request, File, UploadFile
from fastapi.responses import HTMLResponse
from database import get_db, engine
import models
import crud
import schemas
from filters import filter_job
from typing import List
from mailer import send_mail
from config import MailBody
import random
import string
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from utils import (
                    create_access_token,  ACCESS_TOKEN_EXPIRE_MINUTES, JWT_SECRET_KEY, ALGORITHM,
                    get_hashed_password,  verify_password, create_refresh_token,
                    create_reset_token
                    )
from datetime import timedelta
import jwt
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from deps import get_current_user, get_current_company_user
from sqlalchemy.orm import Session
import jinja2
import os
from datetime import datetime
import shutil
import base64


env = jinja2.Environment(loader=jinja2.FileSystemLoader('../templates'))

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/profile', summary='Get details of currently logged in user', response_model=schemas.UserOutput)
async def get_me(user: schemas.SystemUser = Depends(get_current_user)):
    return {"email": user.email, "username": user.username}

@app.get('/me')
async def get_me(user: schemas.UserContact = Depends(get_current_user), db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, user.email)
    image_str = None
    if user.image:
        image_str = base64.b64encode(user.image).decode("utf-8")
    return {"email": user.email, "contact_info": user.contact_info, 'username': user.username, 'image': image_str}

@app.put('/me')
async def change_data(user_update: schemas.UserContact, user: schemas.UserContact = Depends(get_current_user), db: Session = Depends(get_db)):
    user_db = crud.get_user_by_email(db, user.email)
    if not user_db:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update user data
    updated_data = user_update.dict(exclude_unset=True)
    for key, value in updated_data.items():
        setattr(user_db, key, value)
    
    db.commit()
    db.refresh(user_db)
    return {"message": "User data updated successfully", "user": user_db}

@app.post("/password-reset")
async def request_password_reset(request: schemas.PasswordResetRequest, tasks: BackgroundTasks, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    token = create_reset_token(user.email)
    user.reset_token = token
    user.reset_token_expiry = datetime.utcnow() + timedelta(hours=1)
    db.commit()

    subject = "Password Reset Request"
    template = env.get_template('password_reset_email.html')
    message = template.render(subject=subject, token=token)
    mail_body = MailBody(subject=subject, recipient_email=user.email, message=message, body=message)

    tasks.add_task(send_mail, mail_body.dict())

    return {"message": "Password reset email sent"}

@app.post("/password-reset-company")
async def request_password_reset(request: schemas.PasswordResetRequest, tasks: BackgroundTasks, db: Session = Depends(get_db)):
    user = db.query(models.CompanyUser).filter(models.CompanyUser.email == request.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    token = create_reset_token(user.email)
    user.reset_token = token
    user.reset_token_expiry = datetime.utcnow() + timedelta(hours=1)
    db.commit()

    subject = "Password Reset Request"
    template = env.get_template('password_reset_email_company.html')
    message = template.render(subject=subject, token=token)
    mail_body = MailBody(subject=subject, recipient_email=user.email, message=message, body=message)

    tasks.add_task(send_mail, mail_body.dict())

    return {"message": "Password reset email sent"}

@app.get("/password-reset-confirm", response_class=HTMLResponse)
async def password_reset_form(token: str, request: Request):
    template = env.get_template("password_reset_confirm.html")
    return HTMLResponse(template.render(request=request, token=token))

@app.get("/password-reset-confirm-company", response_class=HTMLResponse)
async def password_reset_form(token: str, request: Request):
    template = env.get_template("password_reset_confirm_company.html")
    return HTMLResponse(template.render(request=request, token=token))

# Endpoint to confirm password reset
@app.post("/password-reset-confirm")
async def password_reset_confirm(request: Request, token: str = Form(...), new_password: str = Form(...), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.reset_token == token).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid token")

    if user.reset_token_expiry < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Token expired")

    user.password = get_hashed_password(new_password)
    user.reset_token = None
    user.reset_token_expiry = None
    db.commit()

    return {"message": "Password has been reset successfully"}

@app.post("/password-reset-confirm-company")
async def password_reset_confirm(request: Request, token: str = Form(...), new_password: str = Form(...), db: Session = Depends(get_db)):
    user = db.query(models.CompanyUser).filter(models.CompanyUser.reset_token == token).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid token")

    if user.reset_token_expiry < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Token expired")

    user.password = get_hashed_password(new_password)
    user.reset_token = None
    user.reset_token_expiry = None
    db.commit()

    return {"message": "Password has been reset successfully"}

@app.get('/company_profile', summary='Get details of currently logged in user')
async def get_me(user: schemas.CompanySystemUser = Depends(get_current_company_user), db: Session = Depends(get_db)):
    user = crud.get_company_user_by_email(db, user.email)
    image_str = None
    if user.image:
        image_str = base64.b64encode(user.image).decode("utf-8")
    return {"email": user.email, "username": user.username, "contact_info": user.contact_info, 'image': image_str}


@app.post("/register_company")
def register_company_user(user: schemas.CompanyUserCreate, tasks: BackgroundTasks, db: Session = Depends(get_db)):
    existed_user = db.query(models.User).filter(models.CompanyUser.email == user.email).first()
    if existed_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists."
        )
    verification_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    
    user.password = get_hashed_password(user.password)

    new_user = crud.create_company_user(user=user, db=db)
    
    new_user.sended_code = verification_code
    db.commit()
    
    subject = "Verify Your Email Address"
    template = env.get_template('verification_company.html')
    message = template.render(subject=subject, verification_code=verification_code)
    mail_body = MailBody(subject=subject, recipient_email=user.email, message=message, body=message)
    
    tasks.add_task(send_mail, mail_body.dict())
    return new_user

@app.post("/verify_company")
def verify_email(user: schemas.CompanyVerificationCreate, db: Session = Depends(get_db)):
    user_in_db = crud.get_company_user_by_email(db, user.email)
    if user_in_db is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    if user_in_db.sended_code != user.input_code:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid verification code")
    
    user_in_db.input_code = user.input_code
    db.commit()

    return {"message": "Email verified successfully"}

@app.post("/login_company", response_model=schemas.TokenCompany)
def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    print(request.username)
    user = db.query(models.CompanyUser).filter(models.CompanyUser.email == request.username).first()
    print(user)

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not exists")
    
    if user.email != request.username:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User exists")
    
    if user.input_code is None:
         raise HTTPException(status_code=401, detail="User Not Verified")
    
    if not verify_password(request.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="The Password do not match")

    # if user.company != company:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    print(user.company)
    return {
        "access_token": create_access_token(user.email),
        "refresh_token": create_refresh_token(user.email),
        "company": user.company
    }

@app.post("/refresh_token", response_model=schemas.TokenCompany)
def refresh_token(token: str, db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        
        user = db.query(models.CompanyUser).filter(models.CompanyUser.email == email).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
        
        return {
            "access_token": create_access_token({"sub": email}),
            "refresh_token": create_refresh_token({"sub": email}),
            "company": user.company
        }
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token expired")
    except jwt.JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

@app.post("/logout")
def logout(response: Response):
    """
    Logout endpoint to invalidate the JWT token by setting the 'Authorization' header to an empty string.
    """
    response.headers["Authorization"] = ""
    return {"message": "Logout successful"}

@app.get("/get_company_users", response_model=List[schemas.CompanyUserSchema])
def get_company_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_all_company_users(skip=skip, limit=limit, db=db)
    
    for user in users:
        if user.image is None:
            user.image = ""
        else:
            user.image = base64.b64encode(user.image).decode("utf-8")
    
    return users

@app.get('/company_user/{user_id}')
def get_company_user(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_company_user_by_id(db, user_id)
    return user

@app.get("/companyuser/jobs", response_model=list[schemas.JobSchema])
def get_companyuser_jobs(current_user: models.CompanyUser = Depends(get_current_company_user), db: Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    company_user = crud.get_company_user_by_id(db, current_user.user_id)
    if not company_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="CompanyUser not found")
    
    return company_user.posted_jobs

@app.get('/user/experience', response_model=list[schemas.UserExperience])
def get_user_experience(current_user: models.User = Depends(get_current_user), db: Session=Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    user = crud.get_user_by_id(db, current_user.user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="CompanyUser not found")
    
    return user.experiences



@app.post("/register", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOutput)
def register_user(user: schemas.UserCreate, tasks: BackgroundTasks, db: Session = Depends(get_db)):
    existed_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existed_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists."
        )
    verification_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    user.password = get_hashed_password(user.password)
    new_user = crud.create_user(user=user, db=db)
    new_user.sended_code = verification_code
    db.commit()
    
    subject = "Verify Your Email Address"
    template = env.get_template('verification_email.html')
    message = template.render(subject=subject, verification_code=verification_code)
    mail_body = MailBody(subject=subject, recipient_email=user.email, message=message, body=message)
    tasks.add_task(send_mail, mail_body.dict())
    
    return new_user


@app.post("/verify")
def verify_email(user: schemas.VerificationCreate, db: Session = Depends(get_db)):
    user_in_db = crud.get_user_by_email(db, user.email)
    if user_in_db is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    if user_in_db.sended_code != user.input_code:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid verification code")

    user_in_db.input_code = user.input_code
    db.commit()

    return {"message": "Email verified successfully"}

@app.post("/send-email", response_model=bool)
async def send_email(applied_data: schemas.EmailData, tasks: BackgroundTasks, db: Session = Depends(get_db)):
    print("This is email", applied_data.email)
    subject = "Apply to job"
    template = env.get_template("email_template.html")
    
    message = template.render(
        job_title=applied_data.job_title,
        first_name=applied_data.first_name,
        last_name=applied_data.last_name,
        user_email=applied_data.user_email,
        contact_info=applied_data.contact_info
    )

    mail_body = MailBody(subject=subject, recipient_email=applied_data.email, message=message, body=message)
    tasks.add_task(send_mail, mail_body.dict())
    return True
  
@app.post("/login", response_model=schemas.Token)
def login(userdetails: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
   
    user = db.query(models.User).filter(models.User.email == userdetails.username).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not exists")
    
    if user.input_code is None:
         raise HTTPException(status_code=401, detail="User Not Verified")
    
    if not verify_password(userdetails.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="The Password do not match")
    return {
        "access_token": create_access_token(user.email),
        "refresh_token": create_refresh_token(user.email),
    }

@app.get("/getusers", response_model=List[schemas.UserSchema])
def get_users(skip: int=0, limit: int=100, db: Session = Depends(get_db)):
    return crud.get_all_users(skip=skip, limit=limit, db=db)


@app.put("/users/{user_id}", response_model=schemas.UserCreate)
def update_user(user_id: int, user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.update_user(db, user_id, user)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_user(db, user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}


@app.get("/user/{user_id}/jobs/", response_model=List[schemas.JobSchema])
def read_user_jobs(user_id: int, current_user: schemas.UserSchema = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.user_id != user_id:
        raise HTTPException(status_code=403, detail="Forbidden")
    return crud.get_jobs_by_user_id(db, user_id)

@app.post("/jobs/", response_model=schemas.JobSchema)
def create_job(job: schemas.JobCreateSchema, current_user: models.CompanyUser = Depends(get_current_company_user), db: Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unouthorized")
    
    try:
        return crud.create_job(db=db, job=job, poster_id=current_user.user_id)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@app.get("/jobs/{job_id}")
def read_job(job_id: int, db: Session = Depends(get_db)):
    db_job = crud.get_job_by_id(db, job_id=job_id)
    print(db_job.views)
    if db_job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return db_job


@app.put("/jobs/{job_id}", response_model=schemas.JobSchema)
def update_job(job_id: int, job: schemas.JobCreateSchema, db: Session = Depends(get_db)):
    db_job = crud.update_job(db, job_id, job)
    if db_job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return db_job

@app.put("/jobs/{job_id}/views")
async def increment_views(job_id: int, db: Session = Depends(get_db)):
    job = db.query(models.Job).filter(models.Job.job_id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    job.views = job.views + 1
    print(job.views)
    db.commit()

    return {"message": "Views count updated", "new_views_count": job.views}


@app.delete("/jobs/{job_id}")
def delete_job(job_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_job(db, job_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Job not found")
    return {"message": "Job deleted successfully"}

@app.get("/jobs/", response_model=List[schemas.JobSchema])
def filter_jobs(category: str = None, location: str = None, job_type: str = None,
                level: str = None, db: Session = Depends(get_db)):
    return filter_job.get_jobs(db, category, location, job_type, level)


#Experience

@app.get('/user/experience', response_model=list[schemas.UserExperience])
def get_user_experience(current_user: models.User = Depends(get_current_user), db: Session=Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    user = crud.get_user_by_id(db, current_user.user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    return user.experiences

@app.get('/user/experience/{user_id}', response_model=list[schemas.UserExperience])
def get_user_experience(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_company_user_by_id(db, user_id)
    return user.experiences

@app.post("/user/experience", response_model=schemas.UserExperience)
def create_experience(experience: schemas.UserExperience, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unouthorized")
    
    try:
        return crud.create_experience(db=db, experience=experience, user_id=current_user.user_id)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@app.get('/companyuser/experience/', response_model=list[schemas.UserExperience])
def get_user_experience(current_user: models.CompanyUser = Depends(get_current_company_user), db: Session=Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    user = crud.get_company_user_by_id(db, current_user.user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    print(user.experiences)
    return user.experiences

@app.post("/companyuser/experience/", response_model=schemas.UserExperience)
def create_experience(experience: schemas.UserExperience, current_user: models.CompanyUser = Depends(get_current_company_user), db: Session = Depends(get_db)):
    print(current_user, 5000)
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unouthorized")
    
    try:
        return crud.create_experience_company(db=db, experience=experience, user_id=current_user.user_id)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

#Education

@app.get('/user/education', response_model=list[schemas.UserEducation])
def get_user_education(current_user: models.User = Depends(get_current_user), db: Session=Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    user = crud.get_user_by_id(db, current_user.user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="CompanyUser not found")
    
    return user.education

@app.get('/user/education/{user_id}', response_model=list[schemas.UserEducation])
def get_user_education(user_id: int, db: Session=Depends(get_db)):
    user = crud.get_company_user_by_id(db, user_id)
    return user.education

@app.post("/user/education", response_model=schemas.UserEducation)
def create_education(education: schemas.UserEducation, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unouthorized")
    
    try:
        return crud.create_education(db=db, education=education, user_id=current_user.user_id)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@app.get('/companyuser/education/', response_model=list[schemas.UserEducation])
def get_user_education(current_user: models.CompanyUser = Depends(get_current_company_user), db: Session=Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    
    user = crud.get_company_user_by_id(db, current_user.user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="CompanyUser not found")
    
    return user.education

@app.post("/companyuser/education/", response_model=schemas.UserEducation)
def create_education(education: schemas.UserEducation, current_user: models.CompanyUser = Depends(get_current_company_user), db: Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unouthorized")
    
    try:
        return crud.create_education_company(db=db, education=education, user_id=current_user.user_id)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@app.post('/add_skill')
def add_skill(skill: schemas.Skill, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unouthorized")
    
    try:
        return crud.create_skill(db=db, skill=skill, user_id=current_user.user_id)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@app.post('/add_company_skill')
def add_skill(skill: schemas.Skill, current_user: models.CompanyUser = Depends(get_current_company_user), db: Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unouthorized")
    
    try:
        return crud.create_skill_company(db=db, skill=skill, user_id=current_user.user_id)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@app.get('/skills', response_model=list[schemas.Skill])
def add_skill(current_user: models.User = Depends(get_current_user), db: Session=Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    user = crud.get_user_by_id(db, current_user.user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="CompanyUser not found")
    return user.skill

@app.get('/companyskills', response_model=list[schemas.Skill])
def add_skill(current_user: models.CompanyUser = Depends(get_current_company_user), db: Session=Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    user = crud.get_company_user_by_id(db, current_user.user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="CompanyUser not found")
    return user.skill

@app.get('/user/skills/{user_id}', response_model=list[schemas.Skill])
def get_skills(user_id: int, db: Session=Depends(get_db)):
    user = crud.get_user_by_id(db, user_id)
    return user.skill


@app.post('/add_language')
def add_language(language: schemas.Language, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unouthorized")
    
    try:
        return crud.create_language(db=db, language=language, user_id=current_user.user_id)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@app.post('/add_company_language')
def add_language(language: schemas.Language, current_user: models.CompanyUser = Depends(get_current_company_user), db: Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unouthorized")
    
    try:
        return crud.create_language_company(db=db, language=language, user_id=current_user.user_id)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@app.get('/languages', response_model=list[schemas.Language])
def add_language(current_user: models.User = Depends(get_current_user), db: Session=Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    user = crud.get_user_by_id(db, current_user.user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="CompanyUser not found")
    return user.language

@app.get('/companylanguages/', response_model=list[schemas.Language])
def add_language(current_user: models.CompanyUser = Depends(get_current_company_user), db: Session=Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    user = crud.get_company_user_by_id(db, current_user.user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="CompanyUser not found")
    return user.language

@app.get('/user/languages/{user_id}', response_model=list[schemas.Language])
def get_languages(user_id: int, db: Session=Depends(get_db)):
    user = crud.get_company_user_by_id(db, user_id)
    return user.language


@app.post("/upload-image/")
async def upload_image(file: UploadFile = File(...), current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        current_user = crud.get_user_by_id(db, current_user.user_id)
        file_bytes = await file.read()
        current_user.image = file_bytes
        db.commit()
        
        return {"image": base64.b64encode(file_bytes).decode("utf-8")}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=422, detail=str(e))

@app.post("/upload-image-company/")
async def upload_image(file: UploadFile = File(...), current_user: models.CompanyUser = Depends(get_current_company_user), db: Session = Depends(get_db)):
    try:
        current_user = crud.get_company_user_by_id(db, current_user.user_id)
        file_bytes = await file.read()
        current_user.image = file_bytes
        db.commit()
        
        return {"image": base64.b64encode(file_bytes).decode("utf-8")}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=422, detail=str(e))

