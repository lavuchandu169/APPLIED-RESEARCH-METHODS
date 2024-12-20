from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import pandas as pd
import joblib
import os
import openai  # Import OpenAI library


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)  # Allow all origins and credentials

# Load pre-trained models
models_path = "models"
bed_model = joblib.load(os.path.join(models_path, "bed_model.pkl"))
staff_model = joblib.load(os.path.join(models_path, "staff_model.pkl"))
equipment_model = joblib.load(os.path.join(models_path, "equipment_model.pkl"))

# OpenAI API Key
openai.api_key = "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"

# Prediction function
def predict(model, input_data):
    df = pd.DataFrame([input_data])
    return model.predict(df)[0]

@app.route("/predict/bed_allocation", methods=["POST", "OPTIONS"])
def predict_bed_allocation():
    if request.method == "OPTIONS":  # Handle preflight requests
        return _build_cors_preflight_response()
    data = request.json
    prediction = predict(bed_model, data)
    return _corsify_actual_response(jsonify({"prediction": round(prediction, 2)}))

@app.route("/predict/staff_optimization", methods=["POST", "OPTIONS"])
def predict_staff_optimization():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()
    data = request.json
    prediction = predict(staff_model, data)
    return _corsify_actual_response(jsonify({"prediction": round(prediction, 2)}))

@app.route("/predict/equipment_utilization", methods=["POST", "OPTIONS"])
def predict_equipment_utilization():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()
    data = request.json
    prediction = predict(equipment_model, data)
    return _corsify_actual_response(jsonify({"prediction": round(prediction, 2)}))

@app.route("/predict/combined", methods=["POST", "OPTIONS"])
def combined_recommendation():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()
    data = request.json

    bed_prediction = predict(bed_model, data)
    staff_prediction = predict(staff_model, data)
    equipment_prediction = predict(equipment_model, data)

    recommendation = (
        f"Allocate {round(bed_prediction)} beds, "
        f"assign {round(staff_prediction)} staff, "
        f"and allocate {round(equipment_prediction)} equipment units."
    )

    return _corsify_actual_response(jsonify({
        "bed_allocation": round(bed_prediction, 2),
        "staff_optimization": round(staff_prediction, 2),
        "equipment_utilization": round(equipment_prediction, 2),
        "recommendation": recommendation
    }))

@app.route("/chat", methods=["POST", "OPTIONS"])
def chat_with_gpt():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()

    data = request.json
    user_input = data.get("message", "")

    try:
        # Call OpenAI API for chat
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a hospital resource management assistant."},
                {"role": "user", "content": user_input}
            ],
            max_tokens=150
        )
        assistant_reply = response.choices[0].message["content"].strip()

        return _corsify_actual_response(jsonify({"reply": assistant_reply}))

    except Exception as e:
        return _corsify_actual_response(jsonify({"error": str(e)})), 500

# Helper Functions
def _build_cors_preflight_response():
    response = jsonify({"message": "CORS preflight successful"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/", methods=["GET"])
def home():
    return "Hospital Resource Allocation API is running!"

if __name__ == "__main__":
    app.run(debug=True, port=5000)
