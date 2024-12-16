from flask import Blueprint, request, jsonify
from services.appointment_scheduler import AppointmentScheduler

# Create a Blueprint for scheduling routes
scheduling_blueprint = Blueprint('scheduling', __name__)

# Initialize the AppointmentScheduler
scheduler = AppointmentScheduler()

@scheduling_blueprint.route('/schedule', methods=['POST'])
def schedule():
    # Get data from the request
    data = request.json
    
    # Check if 'patient_data' is in the request
    if 'patient_data' not in data:
        return jsonify({"error": "Patient data is required"}), 400

    # Call the scheduling method
    predicted_duration = scheduler.schedule_appointment(data['patient_data'])
    
    # Return the predicted duration as a JSON response
    return jsonify({"predicted_duration": predicted_duration.tolist()})
