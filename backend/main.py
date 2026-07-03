from fastapi import FastAPI
from schemas import StudentData
import pandas as pd
import joblib

app = FastAPI(
    title="AI Placement Prediction API"
)

model = joblib.load(
    "trained_models/placement_model.pkl"
)

@app.get("/")
def root():
    return {
        "message": "AI Placement Prediction API Running"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

@app.post("/predict")
def predict(data: StudentData):

    input_df = pd.DataFrame([{
        "age": data.age,
        "cgpa": data.cgpa,
        "backlogs": data.backlogs,
        "attendance": data.attendance,
        "tenth_percentage": data.tenth_percentage,
        "twelfth_percentage": data.twelfth_percentage,

        "branch": data.branch,
        "college_tier": data.college_tier,

        "python_skill": data.python_skill,
        "c++_skill": data.cpp_skill,
        "java_skill": data.java_skill,
        "ml_skill": data.ml_skill,
        "web_dev_skill": data.web_dev_skill,
        "communication_skill": data.communication_skill,

        "aptitude_score": data.aptitude_score,
        "logical_reasoning": data.logical_reasoning,

        "internships": data.internships,
        "projects": data.projects,
        "github_projects": data.github_projects,
        "hackathons": data.hackathons,
        "certifications": data.certifications,

        "coding_contest_rating": data.coding_contest_rating,

        "teamwork": data.teamwork,
        "leadership": data.leadership,
        "problem_solving": data.problem_solving,
        "time_management": data.time_management,

        "gender": data.gender,
        "city_tier": data.city_tier,
        "family_income": data.family_income
    }])

    prediction = model.predict(input_df)[0]

    probability = model.predict_proba(input_df)[0][1]

    return {
        "prediction":
            "Placed" if prediction == 1 else "Not Placed",

        "placement_probability":
            round(float(probability * 100), 2)
    }