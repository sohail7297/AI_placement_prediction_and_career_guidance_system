
import pandas as pd

df = pd.read_csv(
    r"D:\cllg projects\AI-Career-Intelligence-Platform\backend\datasets\student_placement_dataset_1M.csv"
)

print(df.drop("placed", axis=1).columns.tolist())