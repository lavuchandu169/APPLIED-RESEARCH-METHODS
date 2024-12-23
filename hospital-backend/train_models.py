
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib
import os

# Load data
data_file = "hospital_data.csv"
df = pd.read_csv(data_file)

# Train and save separate models
def train_model(target_column, model_name):
    X = df[["patient_load", "staff_available", "equipment_in_use"]]
    y = df[target_column]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = RandomForestRegressor()
    model.fit(X_train, y_train)
    joblib.dump(model, os.path.join("models", model_name))
    print(f"{model_name} trained and saved!")

if not os.path.exists("models"):
    os.makedirs("models")

train_model("bed_allocation", "bed_model.pkl")
train_model("staff_optimization", "staff_model.pkl")
train_model("equipment_utilization", "equipment_model.pkl")
print("All models trained and saved successfully!")
