// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Manual from "./components/Manual";
import VA from "./components/VA";


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Manual />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/va" element={<VA />} />
      </Routes>
    </Router>
  );
};

export default App;
