import React from "react";
import logo from "../assets/logo.png";
import { BsMagic } from "react-icons/bs";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg py-4 px-6 flex flex-col md:flex-row items-center justify-between rounded-b-2xl transition-colors duration-500">
       
      <div className="flex items-center space-x-4">
        <div className="bg-white rounded-full p-2 shadow-md">
          <img src={logo} alt="Project Planner AI Logo" className="w-12 h-12 md:w-16 md:h-16" />
        </div>
        <h1 className="text-white text-2xl md:text-3xl font-bold flex items-center space-x-2">
          Project Planner AI <BsMagic className="ml-2 animate-spin-slow" />
        </h1>
        <span className="ml-2 bg-white text-purple-600 text-xs font-semibold px-2 py-1 rounded-full shadow">
          Beta v1.0
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
        <p className="text-white text-sm mb-2 md:mb-0">
          Enter your app idea and generate an AI-powered project plan.
        </p>
      </div>

    </header>
  );
};

export default Header;
