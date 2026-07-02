from pydantic import BaseModel

class StudentData(BaseModel):
    age: int
    gender: str
    cgpa: float
    college_tier: int
    city_tier: int

    python_skill: int
    java_skill: int
    c++_skill: int
    ml_skill: int
    web_dev_skill: int

    internships: int
    projects: int
    certifications: int
    github_projects: int
    hackathons: int

    aptitude_score: int
    logical_reasoning: int
    communication_skill: int

    teamwork: int
    leadership: int
    problem_solving: int
    time_management: int

    backlogs: int
    attendance: float

    tenth_percentage: float
    twelfth_percentage: float

    family_income: float
    coding_contest_rating: int

    branch: str