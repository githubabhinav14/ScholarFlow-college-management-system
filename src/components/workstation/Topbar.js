"use client";

import { Bell, Settings, User } from "lucide-react";

const TopBar = ({ currentRoute }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 py-2">
      <h1 className="text-xl font-semibold text-gray-800">{currentRoute}</h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Profile</span>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
