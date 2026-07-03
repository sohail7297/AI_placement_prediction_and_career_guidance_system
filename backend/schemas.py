from pydantic import BaseModel

class StudentData(BaseModel):
    age: int
    cgpa: float
    backlogs: int
    attendance: float
    tenth_percentage: float
    twelfth_percentage: float

    branch: str
    college_tier: int

    python_skill: int
    java_skill: int
    ml_skill: int
    web_dev_skill: int
    communication_skill: int

    aptitude_score: int
    logical_reasoning: int

    internships: int
    projects: int
    github_projects: int
    hackathons: int
    certifications: int

    coding_contest_rating: int

    teamwork: int
    leadership: int
    problem_solving: int
    time_management: int

    gender: str
    city_tier: int
    family_income: float

    cpp_skill: int