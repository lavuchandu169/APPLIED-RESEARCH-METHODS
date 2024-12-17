# Hospital Resource Allocation System with Virtual Assistant

This project is a **Hospital Resource Allocation System** that helps optimize hospital resources such as **beds**, **staff**, and **equipment**. The system integrates **machine learning models** for predicting resource allocation and a **Virtual Assistant** powered by AI to help interact with users in real-time.

---

## 🚀 Features

- **Manual Input**: Users can input hospital data (such as patient load, available staff, and equipment in use) to get predictions for optimal resource allocation.
- **Voice Interaction**: Users can interact with the Virtual Assistant using voice commands for hands-free interaction.
- **Real-time Recommendations**: Get real-time recommendations for bed allocation, staff optimization, and equipment utilization.
- **AI-powered Virtual Assistant**: Powered by OpenAI’s ChatGPT, the assistant provides real-time responses and can speak back to users.

---

## 🛠️ Technologies Used

### Frontend
- **React.js** for the user interface.
- **Axios** for making HTTP requests to the backend.
- **Web Speech API** for voice recognition and speech synthesis.

### Backend
- **Flask** for creating the API.
- **Machine Learning models** (e.g., regression models) for predicting resource allocation.
- **OpenAI API** (optional) for integrating AI-driven conversations in the Virtual Assistant.

### Additional Tools
- **CORS** to handle cross-origin requests between the frontend and backend.

---

## 📥 Installation

### 1. Clone the Repository
Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/hospital-resource-allocation.git
cd hospital-resource-allocation

## 🖥️ Set Up Backend

### 1. Install Python Dependencies

Navigate to the backend folder and install the required dependencies:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # For Mac/Linux
venv\Scripts\activate  # For Windows
pip install -r requirements.txt

