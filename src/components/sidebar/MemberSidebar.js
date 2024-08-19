import React, { Fragment, memo, useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import {
  AiOutlineClose,
  AiOutlineDown,
  AiOutlineUp,
  AiOutlineRollback,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import avatarDF from "../../assets/avatar.jpg";
import { memberSidebar } from "utils/contants";
import path from "utils/path";
import { IoMdClose } from "react-icons/io";

const activedStyle = "px-4 py-2 flex items-center gap-2 bg-blue-500";
const noActivedStyle = "px-4 py-2 flex items-center gap-2 hover:bg-blue-100";

const MemberSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [actived, setActived] = useState([]);
  const { current } = useSelector((state) => state.user);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={clsx(
        "bg-gray-200 py-4 md:min-h-screen top-0 left-0 z-50 col-span-1",
        sidebarOpen ? "block fixed" : "hidden md:block"
      )}
    >
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-300 rounded-lg p-2"
        onClick={toggleSidebar}
      >
        <AiOutlineClose size={24} />
      </button>

      {sidebarOpen && (
        <div className="absolute inset-0 z-50">
          <div className="w-[300px] h-screen bg-white text-black p-2 fixed shadow-lg">
            <header className="border-b border-gray-100 flex items-center justify-end">
              <span
                onClick={() => toggleSidebar()}
                className="cursor-pointer p-2"
              >
                <IoMdClose size={24} />
              </span>
            </header>
            <section>
              <div>
                {memberSidebar.map((el) => (
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
      <div className="w-full flex flex-col justify-center items-center py-4">
        <img
          src={current?.avatar || avatarDF}
          alt="logo"
          className="w-16 h-16 object-cover"
        />
        <small>{`${current?.lastname} ${current?.firstname}`}</small>
      </div>
      <div>
        {memberSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  clsx(isActive && activedStyle, !isActive && noActivedStyle)
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
    </div>
  );
};

export default memo(MemberSidebar);
