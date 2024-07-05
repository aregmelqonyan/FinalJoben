from typing import List
from sqlalchemy.orm import Session
from fastapi import Query
import models


def get_jobs(db: Session, category: List[str] = Query(None), location: List[str] = Query(None), 
             job_type: List[str] = Query(None), level: List[str] = Query(None)):
    
    query = db.query(models.Job)
    if category:
        query = query.filter(models.Job.industry.in_([category]))
    if location:
        query = query.filter(models.Job.location.in_([location]))
    if job_type:
        query = query.filter(models.Job.job_type.in_([job_type]))
    if level:
        query = query.filter(models.Job.level.in_([level]))

    return query.all()