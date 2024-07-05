from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, DateTime, Table, LargeBinary
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

user_job = Table('user_job_association', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.user_id')),
    Column('job_id', Integer, ForeignKey('jobs.job_id'))
)

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), nullable=False)
    email = Column(String, unique=True, nullable=False)
    contact_info = Column(String(20))
    password = Column(String(60), nullable=False)
    sended_code = Column(String, nullable=True)
    input_code = Column(String, nullable=True)
    reset_token = Column(String, nullable=True)
    reset_token_expiry = Column(DateTime, nullable=True)
    image = Column(LargeBinary) 

    jobs = relationship('Job', secondary=user_job, back_populates='applicants')
    experiences = relationship('UserExperience', back_populates='user')
    education = relationship('UserEducation', back_populates='user')
    skill = relationship('Skill', back_populates='user')
    language = relationship('Language', back_populates='user')

class UserExperience(Base):
    __tablename__ = 'experience'

    experience_id = Column(Integer, primary_key=True)
    profession = Column(String(50), nullable=False)
    job_type = Column(String(20), nullable=False)
    company = Column(String(50), nullable=False)
    location = Column(String(30), nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime)
    description = Column(String(300), nullable=False)

    user_id = Column(Integer, ForeignKey('users.user_id'))
    company_user_id = Column(Integer, ForeignKey('company_user.user_id'))
    user = relationship('User', back_populates='experiences')
    company_user = relationship('CompanyUser', back_populates='experiences')

class UserEducation(Base):
    __tablename__ = 'education'

    education_id = Column(Integer, primary_key=True)
    place = Column(String(50), nullable=False)
    field_of_study = Column(String(50), nullable=False)
    description = Column(String(300), nullable = False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime)

    company_user_id = Column(Integer, ForeignKey('company_user.user_id'))
    user_id = Column(Integer, ForeignKey('users.user_id'))
    user = relationship('User', back_populates='education')
    company_user = relationship('CompanyUser', back_populates='education')

class Skill(Base):
    __tablename__ = 'skill'

    skill_id = Column(Integer, primary_key=True)
    skill = Column(String(20), nullable=False)

    user_id = Column(Integer, ForeignKey('users.user_id'))
    user = relationship('User', back_populates='skill')
    company_user_id = Column(Integer, ForeignKey('company_user.user_id'))
    company_user = relationship('CompanyUser', back_populates='skill')

class Language(Base):

    __tablename__ = 'language'

    language_id = Column(Integer, primary_key=True)
    language = Column(String(15), nullable=False)
    proficiency = Column(String(40), nullable=False)

    user_id = Column(Integer, ForeignKey('users.user_id'))
    user = relationship('User', back_populates='language')
    company_user_id = Column(Integer, ForeignKey('company_user.user_id'))
    company_user = relationship('CompanyUser', back_populates='language')

class CompanyUser(Base):
    __tablename__ = 'company_user'

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), nullable=False)
    email = Column(String, unique=True, nullable=False)
    contact_info = Column(String(20))
    password = Column(String(60), nullable=False)
    sended_code = Column(String, nullable=True)
    input_code = Column(String, nullable=True)
    company = Column(String, nullable=False)
    reset_token = Column(String, nullable=True)
    reset_token_expiry = Column(DateTime, nullable=True)
    image = Column(LargeBinary) 
    
    experiences = relationship('UserExperience', back_populates='company_user')
    education = relationship('UserEducation', back_populates='company_user')
    skill = relationship('Skill', back_populates='company_user')
    language = relationship('Language', back_populates='company_user')
    posted_jobs = relationship('Job', back_populates='poster')


class Job(Base):
    __tablename__ = 'jobs'

    job_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(50), nullable=False)
    description = Column(String, nullable=False)
    company_name = Column(String(40), nullable=False)
    location = Column(String(30), nullable=False)
    job_type = Column(String(15), nullable=False)
    industry = Column(String(20), nullable=False)
    level = Column(String(15), nullable=False)
    education_level = Column(String(20))
    required_skills = Column(String)
    deadline = Column(DateTime, default=None)
    date_posted = Column(DateTime, nullable=False, default=datetime.utcnow)
    contact_information = Column(String)
    remote_work = Column(String, nullable=False, default=False)
    views = Column(Integer, default=0)

    poster_id = Column(Integer, ForeignKey('company_user.user_id'))
    poster = relationship('CompanyUser', back_populates='posted_jobs')
    
    applicants = relationship('User', secondary=user_job, back_populates='jobs')

