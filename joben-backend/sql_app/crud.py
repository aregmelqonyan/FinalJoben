from http.client import HTTPException
from sqlalchemy.orm import Session, aliased
import models, schemas
from validators import name_validator, email_validator, contact_validator, password_validator
from typing import List
from fastapi import HTTPException, Depends, status
from utils import get_hashed_password, JWT_SECRET_KEY, ALGORITHM
from fastapi.security import HTTPAuthorizationCredentials
from auth_barer import decodeJWT
from auth_barer import JWTBearer
from fastapi_mail import ConnectionConfig
import os
from sqlalchemy.orm import joinedload


def create_company_user(db: Session, user:schemas.CompanyUserCreate):
    email_validator.validmail(user.email)
    # password_validator.ValidPassword(user.password)
    contact_validator.valid_phone(user.contact_info)
    name_validator.validate_full_name(user.username)

    db_user = models.CompanyUser(**user.dict())
    # db_user.password = encrypted_password
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_all_company_users(db: Session, skip: int = 0, limit: int = 100):
    users = db.query(models.CompanyUser).offset(skip).limit(limit).all()
    return users

def get_company_user_by_id(db: Session, user_id: int):
    print(db.query(models.CompanyUser).filter(models.CompanyUser.user_id == user_id).first())
    return db.query(models.CompanyUser).filter(models.CompanyUser.user_id == user_id).first()

def get_company_user_by_email(db: Session, email: str):
    return db.query(models.CompanyUser).filter(models.CompanyUser.email == email).first()

def update_company_user(db: Session, user_id: int, user_data: schemas.CompanyUserCreate):
    db_user = get_user_by_id(db, user_id)
    if db_user:
        for key, value in user_data.dict().items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_company_user(db: Session, user_id: int):
    db_user = get_company_user_by_id(db, user_id)
    if db_user:
        db.delete(db_user)
        db.commit()
        return True
    return False

def create_user(db: Session, user: schemas.UserCreate):
    email_validator.validmail(user.email)
    # password_validator.ValidPassword(user.password)
    contact_validator.valid_phone(user.contact_info)
    name_validator.validate_full_name(user.username)
    
    db_user = models.User(**user.dict())
    # db_user.password = encrypted_password
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_all_users(db: Session, skip: int = 0, limit: int = 100):
    users = db.query(models.User).offset(skip).limit(limit).all()
    return [schemas.UserSchema.from_orm(user) for user in users]

def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.user_id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def update_user(db: Session, user_id: int, user_data: schemas.UserCreate):
    db_user = get_user_by_id(db, user_id)
    if db_user:
        for key, value in user_data.dict().items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
    return db_user


def delete_user(db: Session, user_id: int):
    db_user = get_user_by_id(db, user_id)
    if db_user:
        db.delete(db_user)
        db.commit()
        return True
    return False

def get_jobs_by_user_id(db: Session, user_id: int) -> List[models.Job]:
    # Create an alias for the User model
    User = aliased(models.User)
    query = db.query(models.Job).filter(models.Job.applicants.any(User.user_id == user_id)).all()
    print(query)
    # Use the has() method to test if the applicants relationship contains a user with the specified user_id
    return db.query(models.Job).filter(models.Job.applicants.any(User.user_id == user_id)).all()

# Job CRUD operations

def create_job(db: Session, job: schemas.JobCreateSchema, poster_id: int):
    db_job = models.Job(**job.dict(), poster_id=poster_id)
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job

def create_experience(db: Session, experience: schemas.UserExperience, user_id: int):
    db_experience = models.UserExperience(**experience.dict(), user_id=user_id)
    db.add(db_experience)
    db.commit()
    db.refresh(db_experience)
    print(db_experience.user_id)
    return db_experience

def create_experience_company(db: Session, experience: schemas.UserExperience, user_id: int):
    db_experience = models.UserExperience(**experience.dict(), company_user_id=user_id)
    db.add(db_experience)
    db.commit()
    db.refresh(db_experience)
    print(db_experience.user_id)
    return db_experience

def create_education(db: Session, education: schemas.UserEducation, user_id: int):
    db_education = models.UserEducation(**education.dict(), user_id=user_id)
    db.add(db_education)
    db.commit()
    db.refresh(db_education)
    return db_education

def create_education_company(db: Session, education: schemas.UserEducation, user_id: int):
    db_education = models.UserEducation(**education.dict(), company_user_id=user_id)
    db.add(db_education)
    db.commit()
    db.refresh(db_education)
    return db_education

def create_skill(db: Session, skill: schemas.Skill, user_id: int):
    db_skill = models.Skill(**skill.dict(), user_id=user_id)
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill

def create_skill_company(db: Session, skill: schemas.Skill, user_id: int):
    db_skill = models.Skill(**skill.dict(), company_user_id=user_id)
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill

def create_language(db: Session, language: schemas.Language, user_id: int):
    db_language = models.Language(**language.dict(), user_id=user_id)
    db.add(db_language)
    db.commit()
    db.refresh(db_language)
    return db_language

def create_language_company(db: Session, language: schemas.Language, user_id: int):
    db_language = models.Language(**language.dict(), company_user_id=user_id)
    db.add(db_language)
    db.commit()
    db.refresh(db_language)
    return db_language

def get_all_jobs(db: Session):
    jobs = db.query(models.Job).all()
    return jobs

def get_job_by_id(db: Session, job_id: int):
    return db.query(models.Job).filter(models.Job.job_id == job_id).first()


def update_job(db: Session, job_id: int, job_data: schemas.JobCreateSchema):
    db_job = get_job_by_id(db, job_id)
    if db_job:
        for key, value in job_data.dict().items():
            setattr(db_job, key, value)
        db.commit()
        db.refresh(db_job)
    return db_job


def delete_job(db: Session, job_id: int):
    db_job = get_job_by_id(db, job_id)
    if db_job:
        db.delete(db_job)
        db.commit()
        return True
    return False






