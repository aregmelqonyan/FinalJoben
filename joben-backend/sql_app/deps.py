from typing import Union, Any
from datetime import datetime
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from utils import (
    ALGORITHM,
    JWT_SECRET_KEY
)

from jose import jwt
from pydantic import ValidationError
from schemas import TokenPayload, SystemUser
from database import get_db
from models import User, CompanyUser
from schemas import SystemUser, TokenPayload, CompanySystemUser
reuseable_oauth = OAuth2PasswordBearer(
    tokenUrl="/login",
    scheme_name="JWT"
)

reuseable_oauth2 = OAuth2PasswordBearer(
    tokenUrl='/login_company',
    scheme_name='JWT'
)


async def get_current_user(token: str = Depends(reuseable_oauth), db: Session=Depends(get_db)) -> SystemUser:
    try:
        payload = jwt.decode(
            token, JWT_SECRET_KEY, algorithms=[ALGORITHM]
        )
        token_data = TokenPayload(**payload)
        
        if datetime.fromtimestamp(token_data.exp) < datetime.now():
            raise HTTPException(
                status_code = status.HTTP_401_UNAUTHORIZED,
                detail="Token expired",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except(jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    # user: Union[dict[str, Any], None] = db.get(token_data.sub, None)
    print(token_data.sub)
    user = db.query(User).filter(User.email == token_data.sub).first()
    print(user)
    user_dct = {
        'user_id': user.user_id,
        'password': user.password,
        'email': user.email
    }
    
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find user",
        )
    
    return SystemUser(**user_dct)


async def get_current_company_user(token: str = Depends(reuseable_oauth2), db: Session=Depends(get_db)) -> CompanySystemUser:
    try:
        payload = jwt.decode(
            token, JWT_SECRET_KEY, algorithms=[ALGORITHM]
        )
        token_data = TokenPayload(**payload)
        
        if datetime.fromtimestamp(token_data.exp) < datetime.now():
            raise HTTPException(
                status_code = status.HTTP_401_UNAUTHORIZED,
                detail="Token expired",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except(jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    # user: Union[dict[str, Any], None] = db.get(token_data.sub, None)
    print(token_data.sub)
    user = db.query(CompanyUser).filter(CompanyUser.email == token_data.sub).first()
    print(user)
    user_dct = {
        'user_id': user.user_id,
        'password': user.password,
        'email': user.email,
        'company': user.company
    }
    
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find user",
        )
    
    return CompanySystemUser(**user_dct)