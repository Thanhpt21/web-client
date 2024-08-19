import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import SearchBar from "components/search/SearchBar";
import withBase from "hocs/withBase";
import { useSelector } from "react-redux";
import { FaCaretDown, FaRegUser } from "react-icons/fa";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import path from "utils/path";
import { logout } from "store/user/userSlice";

const Navigation = ({ menuOpen, location, dispatch }) => {
  const { menus } = useSelector((state) => state?.app);
  const { isLoggedIn, current } = useSelector((state) => state?.user);
  const [expandedMenus, setExpandedMenus] = useState([]);
  const [isMenuFixed, setIsMenuFixed] = useState(false);
  const [isShowOption, setisShowOption] = useState(false);

  const toggleSubMenu = (menuId) => {
    if (expandedMenus.includes(menuId)) {
      setExpandedMenus((prev) => prev.filter((id) => id !== menuId));
    } else {
      setExpandedMenus((prev) => [...prev, menuId]);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setIsMenuFixed(true);
      } else {
        setIsMenuFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={clsx("w-full bg-gray-800 text-white md:py-1 py-0 md:hidden", {
        "fixed top-0 left-0 z-[9999]": isMenuFixed,
      })}
    >
      <div className="container">
        <div className="hidden md:block">
          <div className="flex justify-center items-center">
            {menus
              ?.filter((menu) => menu.type === "SINGLE")
              ?.sort((a, b) => (a.orderly > b.orderly ? 1 : -1))
              .map((el) => (
                <div key={el.id} className="relative group inline-block">
                  <NavLink
                    to={el.path}
                    className="inline-block text-sm py-2 px-3 uppercase hover:text-main cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span>{el.value}</span>
                      {el.submenu.length > 0 && (
                        <span>
                          <FaCaretDown className="group-hover:rotate-180 duration-300" />
                        </span>
                      )}
                    </span>
                  </NavLink>
                  {el.submenu.length > 0 && (
                    <div className="absolute z-10 hidden group-hover:block w-[150px] rounded-md bg-white text-gray-900 shadow-md p-2 top-8">
                      <ul className="space-y-2">
                        {el?.submenu.map((sub) => (
                          <li key={sub.id}>
                            <NavLink
                              to={sub.path}
                              className="duration-200 p-2 hover:bg-main/20 inline-block w-full rounded-md hover:text-main"
                            >
                              {sub.value}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
        {menuOpen && (
          <div
            className={clsx(
              "flex md:hidden flex-col items-start py-8 left-0 w-full transition-all duration-800 ease-in-out",
              { "fixed top-0 left-0": isMenuFixed }
            )}
          >
            {/* Search bar */}
            <div className="w-full">
              <SearchBar />
            </div>

            <div className="w-full mt-4">
              {menus
                ?.filter((el) => el.type === "SINGLE")
                ?.sort((a, b) => (a.orderly > b.orderly ? 1 : -1))
                ?.map((menu) => (
                  <div key={menu._id}>
                    <NavLink
                      to={menu.path}
                      className={({ isActive }) =>
                        clsx(
                          "flex items-center justify-between px-4 py-2 text-gray-300 rounded-md",
                          (isActive || location.pathname.includes(menu.path)) &&
                            "bg-gray-700"
                        )
                      }
                      onClick={() => toggleSubMenu(menu._id)}
                    >
                      <span>{menu.value}</span>
                      {menu.submenu && menu.submenu.length > 0 && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleSubMenu(menu._id);
                          }}
                          className="text-gray-400 focus:outline-none focus:text-white"
                        >
                          {expandedMenus.includes(menu._id) ? (
                            <AiOutlineUp />
                          ) : (
                            <AiOutlineDown />
                          )}
                        </button>
                      )}
                    </NavLink>
                    {menu.submenu && menu.submenu.length > 0 && (
                      <div
                        className={clsx(
                          "pl-4 transition-all duration-300",
                          expandedMenus.includes(menu._id)
                            ? "block opacity-100"
                            : "hidden opacity-0"
                        )}
                      >
                        {menu.submenu.map((submenu) => (
                          <NavLink
                            key={submenu._id}
                            to={submenu.path}
                            className={clsx(
                              "rounded-md block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white",
                              location.pathname === submenu.path &&
                                "bg-gray-700"
                            )}
                          >
                            {submenu.value}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div className="border-t-2 border-gray-200 w-full mt-2">
              {current ? (
                <div className="">
                  <div
                    id="profile"
                    onClick={() => {
                      setisShowOption((prev) => !prev);
                    }}
                    className="flex items-center justify-start py-2 gap-2 cursor-pointer group relative px-4"
                  >
                    <FaRegUser color="white" />
                    <span className="text-sm">{current?.firstname}</span>
                    {isShowOption && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute z-10 hidden group-hover:block w-[150px] rounded-md bg-white text-gray-900 shadow-md p-2 top-8"
                      >
                        <div className="space-y-2">
                          <Link
                            className="duration-200 p-1 hover:bg-main/20 inline-block w-full rounded-md hover:text-main"
                            to={`/${path.MEMBER}/${path.PERSONAL}`}
                          >
                            Quản lý
                          </Link>
                          {+current?.role === 1 && (
                            <Link
                              className="duration-200 p-1 hover:bg-main/20 inline-block w-full rounded-md hover:text-main"
                              to={`/${path.ADMIN}/${path.DASHBOARD}`}
                            >
                              Admin
                            </Link>
                          )}
                          {current ? (
                            <span
                              onClick={() => dispatch(logout())}
                              className="duration-200 p-1 hover:bg-main/20 inline-block w-full rounded-md hover:text-main"
                            >
                              Đăng xuất
                            </span>
                          ) : (
                            <span>
                              <Link
                                className="duration-200 p-1 hover:bg-main/20 inline-block w-full rounded-md hover:text-main"
                                to={`/${path.LOGIN}`}
                              >
                                Đăng nhập
                              </Link>
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="pl-2 mt-2">
                  <Link to={`/${path.LOGIN}`}>Đăng ký / Đăng nhập</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withBase(Navigation);
