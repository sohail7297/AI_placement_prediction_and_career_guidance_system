import pandas as pd

df = pd.read_csv(
    r"D:\cllg projects\AI-Career-Intelligence-Platform\backend\datasets\student_placement_dataset_1M.csv"
)

print(df.columns.tolist())

print("\n")
print(df.head())

print("\n")
print(df.info())