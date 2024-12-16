from models.scheduling_model import SchedulingModel

class AppointmentScheduler:
    def __init__(self):
        self.model = SchedulingModel()
        self.model.load_model()

    def schedule_appointment(self, patient_data):
        predicted_duration = self.model.predict([patient_data])
        return predicted_duration
