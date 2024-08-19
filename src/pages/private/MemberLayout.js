import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "utils/path";
import { useSelector } from "react-redux";
import { MemberSidebar } from "components";
import { AiOutlineMenu } from "react-icons/ai"; // Import icon menu
import { IoMdClose } from "react-icons/io";

const MemberLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State để điều khiển hiển thị sidebar

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!isLoggedIn || !current)
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5">
      {/* Icon menu điều khiển hiển thị sidebar trên di động */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-300 rounded-lg p-2"
        onClick={toggleSidebar}
      >
        <AiOutlineMenu size={24} />
      </button>

      <div className="fixed top-0 left-0 z-50 w-[270px]">
        <MemberSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
      <div className="w-[270px]"></div>
      {/* Phần còn lại của layout */}
      {/* <div className="md:w-[250px] hidden md:block"></div> */}
      <div className="col-span-4 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default MemberLayout;
