# APPLIED-RESEARCH-METHODS

# AI-Driven Hospital Scheduling and Resource Allocation

This web application aims to improve hospital scheduling and resource allocation using AI.

## Project Structure

- `data/`: Raw and processed data
- `templates/`: HTML templates for the web app
- `src/`: Source code for data ingestion, preprocessing, model training, evaluation, and integration
- `app.py`: Main Flask application
- `requirements.txt`: Python dependencies
- `Dockerfile`: Docker configuration

## Usage

1. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

2. Run the Flask application:
    ```bash
    python app.py
    ```

3. Open your web browser and go to `http://127.0.0.1:5000/` to access the web interface.

4. Upload your data, preprocess it, train the model, evaluate it, and make predictions through the web interface.

## Requirements

- Python 3.8
- Flask
- Docker (optional)

AI-Hospital-Scheduling/
├── data/
│   ├── raw/
│   ├── processed/
│   └── models/
├── templates/
│   ├── index.html
│   ├── upload.html
│   └── result.html
├── src/
│   ├── __init__.py
│   ├── data_ingestion.py
│   ├── preprocessing.py
│   ├── model.py
│   ├── evaluation.py
│   ├── integration.py
├── app.py
├── requirements.txt
├── README.md
└── .gitignore
