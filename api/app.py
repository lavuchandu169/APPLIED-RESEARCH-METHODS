from flask import Flask, render_template, request, jsonify
from routes.scheduling_routes import scheduling_blueprint
from routes.resource_routes import resource_blueprint
from routes.report_routes import report_bp
import os
import sys

# Add the project root directory to the Python path
base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(base_dir)

# Set up the Flask application with explicit paths
app = Flask(
    __name__,
    template_folder=os.path.join(base_dir, "templates"),  # Path to templates folder
    static_folder=os.path.join(base_dir, "static")        # Path to static folder
)

# Register API blueprints
app.register_blueprint(scheduling_blueprint)
app.register_blueprint(resource_blueprint)
app.register_blueprint(report_bp)

# Routes for UI pages
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/scheduling')
def scheduling():
    return render_template('scheduling.html')

@app.route('/resources')
def resources():
    return render_template('resources.html')

@app.route('/reports')
def reports():
    return render_template('reports.html')


# Run the app
if __name__ == '__main__':
    app.run(debug=True)