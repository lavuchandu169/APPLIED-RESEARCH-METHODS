// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl">
        <Link to={"/"}>Hospital Resource Management</Link>
      </h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/manual" className="hover:text-gray-400">
              Manual
            </Link>
          </li>
          <li>
            <Link to="/help" className="hover:text-gray-400">
              Help
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
