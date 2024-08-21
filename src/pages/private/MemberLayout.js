import React, { Fragment, useState } from "react";
import { Outlet, Navigate, NavLink } from "react-router-dom";
import path from "utils/path";
import { useSelector } from "react-redux";
import { MemberSidebar } from "components";
import { AiOutlineMenu, AiOutlineRollback } from "react-icons/ai"; // Import icon menu
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { memberSidebar } from "utils/contants";
import clsx from "clsx";

const activedStyle = "px-4 py-2 flex items-center gap-2 bg-blue-500";
const noActivedStyle = "px-4 py-2 flex items-center gap-2 hover:bg-blue-100";

const MemberLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State để điều khiển hiển thị sidebar

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!isLoggedIn || !current)
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;

  return (
    <div className="flex w-full  min-h-screen">
      {/* Icon menu điều khiển hiển thị sidebar trên di động */}
      {/* <button
        className="md:hidden fixed top-4 left-4 z-10 bg-gray-300 rounded-lg p-2"
        onClick={toggleSidebar}
      >
        <AiOutlineMenu size={24} />
      </button> */}

      <div className="w-[270px] flex-none fixed top-0 bottom-0 hidden md:block text-gray-900">
        <MemberSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
      <div className="md:w-[270px] hidden md:block"></div>
      {/* Phần còn lại của layout */}
      {/* <div className="md:w-[250px] hidden md:block"></div> */}
      <div className="flex-1 bg-gray-100">
        <div className="md:hidden block pt-2 px-4">
          <button className="p-1" onClick={toggleSidebar}>
            {sidebarOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
          </button>
          {sidebarOpen && (
            <div
              style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
              className="fixed inset-0 z-50"
            >
              <div className="w-[320px] h-screen bg-white text-black  fixed shadow-lg">
                <header className="border-b border-gray-100 flex items-center justify-between px-2">
                  <span>Tài khoản</span>
                  <span
                    onClick={() => toggleSidebar()} // Toggle menu visibility
                    className="cursor-pointer p-2"
                  >
                    <IoMdClose size={24} />
                  </span>
                </header>
                <section>
                  <div>
                    {memberSidebar?.map((el) => (
                      <Fragment key={el.id}>
                        {el.type === "SINGLE" && (
                          <NavLink
                            to={el.path}
                            className={({ isActive }) =>
                              clsx(
                                isActive && activedStyle,
                                !isActive && noActivedStyle
                              )
                            }
                          >
                            <span>{el.icon}</span>
                            <span>{el.text}</span>
                          </NavLink>
                        )}
                      </Fragment>
                    ))}
                  </div>
                  <NavLink
                    className="px-4 py-2 flex items-center gap-2"
                    to={`/${path.HOME}`}
                  >
                    <AiOutlineRollback /> Quay về trang chủ
                  </NavLink>
                </section>
              </div>
            </div>
          )}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MemberLayout;
