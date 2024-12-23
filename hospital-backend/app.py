from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os
import lightgbm as lgb
import logging

# Initialize logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Load pre-trained models
models_path = "models"
logger.info("Loading models...")
try:
    bed_model = joblib.load(os.path.join(models_path, "bed_model.pkl"))  # LightGBM model
    staff_model = joblib.load(os.path.join(models_path, "staff_model.pkl"))  # LightGBM model
    equipment_model = joblib.load(os.path.join(models_path, "equipment_model.pkl"))  # LightGBM model
    logger.info("Models loaded successfully.")
except Exception as e:
    logger.error("Error loading models: %s", e)
    raise e

# Prediction function
def predict(model, input_data):
    try:
        df = pd.DataFrame([input_data])
        result = model.predict(df)[0]
        logger.info("Prediction successful: %s", result)
        return result
    except Exception as e:
        logger.error("Error in prediction: %s", e)
        raise e

@app.before_request
def validate_request():
    if request.method == "POST":
        logger.info(f"Request Content-Type: {request.content_type}")
        logger.info(f"Request Data: {request.get_data(as_text=True)}")
        if request.content_type != "application/json":
            logger.error("Unsupported Media Type: %s", request.content_type)
            return jsonify({"error": "Unsupported Media Type. Use application/json"}), 415

@app.route("/predict/bed_allocation", methods=["POST", "OPTIONS"])
def predict_bed_allocation():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()
    data = request.get_json()
    if not data:
        logger.error("Invalid JSON format in bed allocation prediction request.")
        return jsonify({"error": "Invalid JSON format"}), 400
    try:
        prediction = predict(bed_model, data)
        return _corsify_actual_response(jsonify({"prediction": round(prediction, 2)}))
    except Exception as e:
        logger.error("Error in bed allocation prediction: %s", e)
        return _corsify_actual_response(jsonify({"error": str(e)})), 500

@app.route("/predict/staff_optimization", methods=["POST", "OPTIONS"])
def predict_staff_optimization():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()
    data = request.get_json()
    if not data:
        logger.error("Invalid JSON format in staff optimization prediction request.")
        return jsonify({"error": "Invalid JSON format"}), 400
    try:
        prediction = predict(staff_model, data)
        return _corsify_actual_response(jsonify({"prediction": round(prediction, 2)}))
    except Exception as e:
        logger.error("Error in staff optimization prediction: %s", e)
        return _corsify_actual_response(jsonify({"error": str(e)})), 500

@app.route("/predict/equipment_utilization", methods=["POST", "OPTIONS"])
def predict_equipment_utilization():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()
    data = request.get_json()
    if not data:
        logger.error("Invalid JSON format in equipment utilization prediction request.")
        return jsonify({"error": "Invalid JSON format"}), 400
    try:
        prediction = predict(equipment_model, data)
        return _corsify_actual_response(jsonify({"prediction": round(prediction, 2)}))
    except Exception as e:
        logger.error("Error in equipment utilization prediction: %s", e)
        return _corsify_actual_response(jsonify({"error": str(e)})), 500

@app.route("/predict/combined", methods=["POST", "OPTIONS"])
def combined_recommendation():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()

    try:
        data = request.get_json(force=True, silent=True)
        if not data:
            logger.error("Empty or invalid JSON payload received.")
            return jsonify({"error": "Empty or invalid JSON payload. Ensure the request body contains valid JSON."}), 400

        # Normalize field names
        normalized_data = {
            "patient_load": data.get("patient_load") or data.get("patientsLoad"),
            "staff_available": data.get("staff_available") or data.get("staffAvailable"),
            "equipment_in_use": data.get("equipment_in_use") or data.get("equipmentsInUse"),
        }

        # Validate required fields
        missing_fields = [field for field, value in normalized_data.items() if value is None]
        if missing_fields:
            logger.error(f"Missing required fields: {missing_fields}")
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

        # Convert input values to float
        input_data = {key: float(value) for key, value in normalized_data.items()}

        # Get predictions
        bed_prediction = predict(bed_model, input_data)
        staff_prediction = predict(staff_model, input_data)
        equipment_prediction = predict(equipment_model, input_data)

        # Generate recommendation
        recommendation = (
            f"Allocate {round(bed_prediction)} beds, "
            f"assign {round(staff_prediction)} staff, "
            f"and allocate {round(equipment_prediction)} equipment units."
        )

        logger.info("Combined recommendation generated successfully.")
        return jsonify({
            "bed_allocation": round(bed_prediction, 2),
            "staff_optimization": round(staff_prediction, 2),
            "equipment_utilization": round(equipment_prediction, 2),
            "recommendation": recommendation
        })

    except Exception as e:
        logger.error(f"Unexpected error in combined recommendation: {e}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

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
    logger.info("Home endpoint accessed.")
    return "Hospital Resource Allocation API is running!"

if __name__ == "__main__":
    app.run(debug=True, port=5001)
