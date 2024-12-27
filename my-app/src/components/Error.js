import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// 404 Component
const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-700">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">Page Not Found</p>
      <a
        href="/"
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default Error;
