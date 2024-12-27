import React from "react";
import { div } from "react-router-dom";
import image1 from "../resources/Blood donation-bro.png";
import image2 from "../resources/Hospital patient-rafiki.png";
import image3 from "../resources/Doctors-amico.png";
import image4 from "../resources/CT scan-amico.png";
import image5 from "../resources/Chat bot-bro.png";
const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <main className="flex flex-col items-center p-8">
        <img
          src={image1}
          alt="Hospital Care Illustration"
          className="w-80 h-auto my-6"
        />
        <p className="text-gray-700 text-lg text-center max-w-3xl">
          Welcome to the Hospital Resource Management System. Our platform
          leverages advanced predictions to optimize hospital operations,
          including bed allocation, staff scheduling, and equipment forecasting.
          Additionally, our Virtual Assistant is here to help answer your
          questions and streamline your experience.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            to="/bed-allocation"
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            <img
              src={image2}
              alt="Bed Allocation"
              className="w-32 h-auto mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800">Bed Allocation</h2>
            <p className="text-gray-600 text-sm text-center mt-2">
              Predict and manage bed availability efficiently to provide timely
              care for patients.
            </p>
          </div>

          <div
            to="/staff-allocation"
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            <img
              src={image3}
              alt="Staff Allocation"
              className="w-32 h-auto mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800">
              Staff Allocation
            </h2>
            <p className="text-gray-600 text-sm text-center mt-2">
              Optimize staff schedules and ensure the right resources are
              available at the right time.
            </p>
          </div>

          <div
            to="/equipment-prediction"
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            <img
              src={image4}
              alt="Equipment Prediction"
              className="w-32 h-auto mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800">
              Equipment Prediction
            </h2>
            <p className="text-gray-600 text-sm text-center mt-2">
              Accurately forecast equipment needs to reduce downtime and improve
              care quality.
            </p>
          </div>

          <div
            to="/virtual-assistant"
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            <img
              src={image5}
              alt="Virtual Assistant"
              className="w-32 h-auto mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800">
              Virtual Assistant
            </h2>
            <p className="text-gray-600 text-sm text-center mt-2">
              Get instant answers to your questions with our AI-powered virtual
              assistant.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
