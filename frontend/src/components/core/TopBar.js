import React from 'react';
import { FiMenu, FiBell } from 'react-icons/fi';

const TopBar = ({ title = "Kanban Pipeline", avatarLetter = "A", onMenuClick, onBellClick }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm border-b gap-3 md:gap-6">
      {/* Hamburger menu */}
      <button
        className="text-2xl text-gray-700 focus:outline-none md:hidden"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <FiMenu />
      </button>

      {/* Title */}
      <div className="flex flex-col text-left flex-1 min-w-0">
        <span className="text-lg font-semibold text-gray-900 leading-tight whitespace-nowrap">
          {title.split(' ')[0]}
        </span>
        <span className="text-md font-normal text-gray-700 leading-tight whitespace-nowrap">
          {title.split(' ').slice(1).join(' ')}
        </span>
      </div>

      {/* Notification bell */}
      <button
        className="relative text-2xl text-gray-700 focus:outline-none mx-2"
        onClick={onBellClick}
        aria-label="Notifications"
      >
        <FiBell />
        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
      </button>

      {/* Avatar */}
      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-black border-2 border-yellow-400 text-yellow-400 font-bold text-lg shadow-md">
        {avatarLetter}
      </div>
    </div>
  );
};

export default TopBar;
