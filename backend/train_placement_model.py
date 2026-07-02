import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics import accuracy_score, classification_report
from xgboost import XGBClassifier

# Load Dataset
df = pd.read_csv(
    r"D:\cllg projects\AI-Career-Intelligence-Platform\backend\datasets\student_placement_dataset_1M.csv"
)

# Features
X = df.drop("placed", axis=1)

# Target
y = df["placed"]

# Automatically detect categorical columns
categorical_cols = X.select_dtypes(
    include=["object"]
).columns.tolist()

# Preprocessing
preprocessor = ColumnTransformer(
    transformers=[
        (
            "cat",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_cols
        )
    ],
    remainder="passthrough"
)

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Model
model = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("classifier",
        XGBClassifier(
            n_estimators=800,
            max_depth=12,
            learning_rate=0.03,
            subsample=0.8,
            colsample_bytree=0.8,
            min_child_weight=3,
            random_state=42,
            eval_metric="logloss",
            n_jobs=-1
        ))
    ]
)

print("Training Started...")

model.fit(X_train, y_train)

print("Training Completed!")

predictions = model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    predictions
)

print("\nAccuracy:", accuracy)

print("\nClassification Report:")
print(
    classification_report(
        y_test,
        predictions
    )
)

joblib.dump(
    model,
    "trained_models/placement_model.pkl"
)

print("\nModel Saved Successfully!")