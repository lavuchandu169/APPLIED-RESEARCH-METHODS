from models.resource_allocation_model import ResourceAllocationModel

class ResourceAllocator:
    def __init__(self):
        self.model = ResourceAllocationModel()
        self.model.load_model()

    def allocate_resources(self, resource_data):
        predicted_allocation = self.model.predict([resource_data])
        return predicted_allocation
