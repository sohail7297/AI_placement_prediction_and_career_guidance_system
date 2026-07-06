import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

print("API KEY:", os.getenv("GEMINI_API_KEY"))

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.0-flash")


def generate_career_analysis(student_data, prediction, probability):

    prompt = f"""
    You are an expert AI Career Coach.

    Student Data:
    {student_data}

    Placement Prediction:
    {prediction}

    Placement Probability:
    {probability}%

    Give response in JSON format:

    {{
      "strengths": [],
      "weaknesses": [],
      "recommendations": [],
      "career_paths": []
    }}

    Keep points short and professional.
    """

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print("GEMINI ERROR:", str(e))
        return f"Gemini Error: {str(e)}"