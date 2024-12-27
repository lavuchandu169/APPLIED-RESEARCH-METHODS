// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Manual from "./components/Manual";
import VA from "./components/VA";
import Error from "./components/Error";
import Home from "./components/Home";
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/help" element={<VA />} />
        <Route path="*" component={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
