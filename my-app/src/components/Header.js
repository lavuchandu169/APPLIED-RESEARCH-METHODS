// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl">My Application</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/manual" className="hover:text-gray-400">
              Manual
            </Link>
          </li>
          <li>
            <Link to="/va" className="hover:text-gray-400">
              Virtual-Assistant
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
