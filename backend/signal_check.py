
import pandas as pd

df = pd.read_csv(
    r"D:\cllg projects\AI-Career-Intelligence-Platform\backend\datasets\student_placement_dataset_1M.csv"
)

print(df["placed"].value_counts())

print("\nCGPA")
print(df.groupby("placed")["cgpa"].mean())

print("\nPython Skill")
print(df.groupby("placed")["python_skill"].mean())

print("\nInternships")
print(df.groupby("placed")["internships"].mean())

print("\nCommunication")
print(df.groupby("placed")["communication_skill"].mean())