// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Manual from "./components/Manual";
import VA from "./components/VA";
import Results from "./components/Results";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Manual />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/va" element={<VA />} />
        <Route path="/result" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;