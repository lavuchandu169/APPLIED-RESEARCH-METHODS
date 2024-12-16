from sklearn.ensemble import RandomForestRegressor
import pickle
import os

class ResourceAllocationModel:
    def __init__(self):
        self.model = RandomForestRegressor()

    def train(self, X, y):
        self.model.fit(X, y)
        print("Resource Allocation model trained.")

    def predict(self, X):
        return self.model.predict(X)

    def save_model(self, path=None):
        # Set default path to the models directory, relative to this file
        if path is None:
            path = os.path.join(os.path.dirname(__file__), 'resource_allocation_model.pkl')
        with open(path, 'wb') as file:
            pickle.dump(self.model, file)
        print(f"Model saved to {path}")

    def load_model(self, path=None):
        # Set default path to the models directory, relative to this file
        if path is None:
            path = os.path.join(os.path.dirname(__file__), 'resource_allocation_model.pkl')
        with open(path, 'rb') as file:
            self.model = pickle.load(file)
        print(f"Model loaded from {path}")
