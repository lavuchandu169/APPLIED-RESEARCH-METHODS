from flask import Blueprint, request, jsonify
from services.resource_allocator import ResourceAllocator

# Create a Blueprint for resource allocation routes
resource_blueprint = Blueprint('resources', __name__)

# Initialize the ResourceAllocator
allocator = ResourceAllocator()

@resource_blueprint.route('/allocate', methods=['POST'])
def allocate():
    # Get data from the request
    data = request.json
    
    # Check if 'resource_data' is in the request
    if 'resource_data' not in data:
        return jsonify({"error": "Resource data is required"}), 400

    # Call the allocation method
    predicted_allocation = allocator.allocate_resources(data['resource_data'])
    
    # Return the predicted allocation as a JSON response
    return jsonify({"predicted_allocation": predicted_allocation.tolist()})
