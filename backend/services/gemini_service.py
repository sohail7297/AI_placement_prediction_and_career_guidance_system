import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_career_analysis(student_data, prediction, probability):

    prompt = f"""
You are an expert AI Career Coach.

Student Profile:
{student_data}

Prediction:
{prediction}

Probability:
{probability}%

Return ONLY valid JSON.

{{
  "strengths":[
    "..."
  ],
  "weaknesses":[
    "..."
  ],
  "recommendations":[
    "..."
  ],
  "career_paths":[
    "..."
  ]
}}
"""

    response = model.generate_content(prompt)

    text = (
        response.text
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    try:
        return json.loads(text)

    except Exception:

        print("Gemini Invalid JSON")
        print(text)

        return {
            "strengths": [],
            "weaknesses": [],
            "recommendations": [],
            "career_paths": []
        }