# train_models.py
import numpy as np
from models.scheduling_model import SchedulingModel
from models.resource_allocation_model import ResourceAllocationModel

# Sample training data (replace with real data)
X = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])  # Example feature data
y_scheduling = np.array([30, 45, 25])            # Example target for scheduling
y_resource = np.array([5, 10, 15])               # Example target for resource allocation

# Train scheduling model
scheduling_model = SchedulingModel()
scheduling_model.train(X, y_scheduling)
scheduling_model.save_model()  # Saves 'scheduling_model.pkl'

# Train resource allocation model
resource_model = ResourceAllocationModel()
resource_model.train(X, y_resource)
resource_model.save_model()  # Saves 'resource_allocation_model.pkl'

print("Models trained and saved successfully.")
