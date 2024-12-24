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
  const { current } = useSelector((state) => state.user);

  const permissionUser = current?.permission;
  const linkPermission = permissionUser
    ? permissionUser.map((perm) => perm.link)
    : [];

  console.log("pers", permissionUser);
  const [actived, setactived] = useState([]);

  const handleShowSubmenu = (tabid) => {
    if (actived.some((el) => el === tabid)) {
      setactived((prev) => prev.filter((e) => e !== tabid));
    } else setactived((prev) => [...prev, tabid]);
  };

  const hasPermissionForSubmenu = (submenu) => {
    // Kiểm tra quyền cho tất cả các submenu của PARENT
    return submenu.some((item) => linkPermission.includes(item.path));
  };

  return (
    <div className="bg-white py-4 min-h-screen h-full overflow-y-auto">
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
      <div className="h-full">
        {adminSidebar.map((el) => (
          <Fragment key={el.id}>
            {/* Kiểm tra quyền cho menu loại SINGLE */}
            {el.type === "SINGLE" && linkPermission.includes(el.path) && (
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

            {/* Kiểm tra quyền cho menu loại PARENT và submenu của nó */}
            {el.type === "PARENT" &&
              // Kiểm tra quyền cho menu PARENT nếu ít nhất có một submenu được phép
              hasPermissionForSubmenu(el.submenu) && (
                <div
                  onClick={() => handleShowSubmenu(+el.id)}
                  className="flex flex-col"
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
                    <div className="flex flex-col">
                      {el.submenu.map(
                        (i) =>
                          // Kiểm tra quyền cho từng submenu bên trong
                          linkPermission.includes(i.path) && (
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
                          )
                      )}
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
