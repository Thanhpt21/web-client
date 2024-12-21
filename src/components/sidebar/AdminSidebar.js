import React, { Fragment, memo, useState } from "react";
import logo from "../../assets/logo.png";
import { adminSidebar } from "utils/contants";
import { NavLink, Link } from "react-router-dom";
import clsx from "clsx";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import path from "utils/path";
import { useSelector } from "react-redux";

const activedStyle = "px-4 py-2 flex items-center gap-2 bg-blue-500";
const noActivedStyle = "px-4 py-2 flex items-center gap-2 hover:bg-blue-100";

const AdminSidebar = () => {
  const { configs } = useSelector((state) => state?.app);
  const [actived, setactived] = useState([]);

  const handleShowSubmenu = (tabid) => {
    if (actived.some((el) => el === tabid)) {
      setactived((prev) => prev.filter((e) => e !== tabid));
    } else setactived((prev) => [...prev, tabid]);
  };
  return (
    <div className=" bg-white py-4 min-h-screen h-full overflow-y-auto">
      <Link
        to={`/${path.HOME}`}
        className="flex flex-col justify-center items-center p-4 gap-2"
      >
        <img
          src={configs?.logo || logo}
          alt="logo"
          className="w-[100px] object-contain"
        />
        <small>Admin workspace</small>
      </Link>
      <div className="h-full ">
        {adminSidebar.map((el) => (
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
            {el.type === "PARENT" && (
              <div
                onClick={() => handleShowSubmenu(+el.id)}
                className=" flex flex-col "
              >
                <div className="px-4 py-2 flex items-center justify-between gap-2 hover:bg-blue-200">
                  <div className="flex items-center gap-2">
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                  </div>
                  {actived.some((id) => id === +el.id) ? (
                    <AiOutlineUp />
                  ) : (
                    <AiOutlineDown />
                  )}
                </div>
                {actived.some((id) => id === +el.id) && (
                  <div className="flex flex-col ">
                    {el.submenu.map((i) => (
                      <NavLink
                        key={i.text}
                        to={i.path}
                        onClick={(e) => e.stopPropagation()}
                        className={({ isActive }) =>
                          clsx(
                            isActive && activedStyle,
                            !isActive && noActivedStyle,
                            "pl-6"
                          )
                        }
                      >
                        {i.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
export default memo(AdminSidebar);
