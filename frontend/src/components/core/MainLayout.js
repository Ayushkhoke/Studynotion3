import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Comman/Navbar';
// import Sidebar from './Sidebar'; // Uncomment if you have a sidebar
// import Footer from '../Comman/Footer'; // Uncomment if you have a footer

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar at the top */}
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar (optional) */}
        {/* <Sidebar /> */}
        {/* Main content area */}
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
      {/* Footer at the bottom (optional) */}
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
