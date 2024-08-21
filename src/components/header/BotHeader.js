import React, { memo, useEffect, useState } from "react";
import {
  createSearchParams,
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import path from "../../utils/path";
import { getCurrent } from "../../store/user/userActions";
import { logout } from "../../store/user/userSlice";
import logo from "../../assets/logo.png";
import withBase from "hocs/withBase";
import { useSelector } from "react-redux";
import SearchBar from "components/search/SearchBar";
import { showCart } from "store/app/appSlice";
import { GiShoppingBag } from "react-icons/gi";
import { FaCaretDown, FaRegUser, FaUserCircle } from "react-icons/fa";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { HiMenuAlt3 } from "react-icons/hi";
import { convertToSlug } from "utils/helpers";
import { apigetBrands } from "apis/brand";
import "./BotHeader.css";
import clsx from "clsx";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const BotHeader = ({
  dispatch,
  menuOpen,
  toggleMenu,
  navigate,
  menus,
  location,
}) => {
  const { configs } = useSelector((state) => state?.app);

  const { isLoggedIn, current } = useSelector((state) => state?.user);
  const [isShowProfileOption, setIsShowProfileOption] = useState(false);
  const [isShowCategoryOption, setIsShowCategoryOption] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState([]);
  const { categories } = useSelector((state) => state?.app);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [brandData, setBrandData] = useState([]);

  const toggleSubMenu = (menuId) => {
    if (expandedMenus.includes(menuId)) {
      setExpandedMenus((prev) => prev.filter((id) => id !== menuId));
    } else {
      setExpandedMenus((prev) => [...prev, menuId]);
    }
  };

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent());
    }, 300);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    const handleClickOutOption = (e) => {
      const profile = document.getElementById("profile");
      const category = document.getElementById("category");
      if (!profile?.contains(e.target)) setIsShowProfileOption(false);
      if (!category?.contains(e.target)) setIsShowCategoryOption(false);
    };
    document.addEventListener("click", handleClickOutOption);
    return () => {
      document.removeEventListener("click", handleClickOutOption);
    };
  }, []);

  const fetchBrandByCategory = async () => {
    const response = await apigetBrands({ category: selectedCategory });
    if (response.success) {
      setBrandData(response.brands);
    }
  };

  const handleCategoryClick = async (id, title) => {
    setSelectedCategory(id);
    setCategoryName(title);
  };

  useEffect(() => {
    fetchBrandByCategory();
  }, [selectedCategory]);

  // Hàm xử lý khi nhấp vào thương hiệu
  const handleBrandClick = (brandId) => {
    // Cập nhật URL với tham số brand
    if (categoryName !== null) {
      navigate({
        pathname: `/${convertToSlug(categoryName)}`, // Đường dẫn danh mục hiện tại
        search: createSearchParams({
          page: 1,
          brand: brandId, // Thêm brandId vào tham số query
        }).toString(),
      });
    }
  };

  return (
    <div className="w-full bg-white text-black">
      <div className="container">
        <nav className="grid grid-cols-2 md:grid-cols-4">
          <div className="md:col-span-3">
            <div className="flex items-center justify-between">
              <div className="md:hidden block">
                <button
                  className="p-1 border border-1 border-black"
                  onClick={toggleMenu}
                >
                  {menuOpen ? <IoMdClose /> : <IoMdMenu />}
                </button>
                {menuOpen && (
                  <div className="absolute inset-0 z-50">
                    <div className="w-[300px] h-screen bg-white text-black  fixed shadow-lg">
                      <header className="border-b border-gray-100 flex items-center justify-between px-2">
                        <span>Tài khoản</span>
                        <span
                          onClick={() => toggleMenu()} // Toggle menu visibility
                          className="cursor-pointer p-2"
                        >
                          <IoMdClose size={24} />
                        </span>
                      </header>
                      <section>
                        <div className="w-full px-2">
                          <SearchBar />
                        </div>
                        <div className="flex flex-col justify-start items-start w-full mt-2">
                          {menus
                            ?.filter((el) => el.type === "SINGLE")
                            ?.sort((a, b) => (a.orderly > b.orderly ? 1 : -1))
                            ?.map((menu) => (
                              <div
                                key={menu._id}
                                className="w-full bg-transparent border border-t"
                              >
                                <NavLink
                                  to={menu.path}
                                  className={({ isActive }) =>
                                    clsx(
                                      "flex items-center justify-between px-4 py-2 text-gray-700 rounded-0 border-black transition-colors duration-300 w-full", // Chiếm toàn bộ chiều rộng
                                      (isActive ||
                                        location.pathname.includes(
                                          menu.path
                                        )) &&
                                        "bg-black text-white",
                                      "hover:bg-black hover:text-white" // Thay đổi màu nền và chữ khi hover
                                    )
                                  }
                                  onClick={(e) => {
                                    // Ngăn không đóng menu khi nhấp vào item
                                    e.stopPropagation();
                                  }}
                                >
                                  <span>{menu.value}</span>
                                  {menu.submenu && menu.submenu.length > 0 && (
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation(); // Ngăn không đóng menu khi nhấp vào nút
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
                                      "pl-4 transition-all duration-300 ",
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
                                          "rounded-0  block px-4 py-2 text-sm text-gray-700 border-gray-600 hover:bg-black hover:text-white w-full", // Chiếm toàn bộ chiều rộng
                                          location.pathname === submenu.path &&
                                            "bg-black text-white"
                                        )}
                                        onClick={(e) => {
                                          // Ngăn không đóng menu khi nhấp vào submenu
                                          e.stopPropagation();
                                        }}
                                      >
                                        {submenu.value}
                                      </NavLink>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                        <div className="bg-transparent border border-1">
                          <div
                            id="profile"
                            onClick={() => {
                              setIsShowProfileOption((prev) => !prev);
                              setIsShowCategoryOption(false); // Hide category options when showing profile
                            }}
                            className="flex items-center justify-start py-2 px-3 gap-1 cursor-pointer group relative"
                          >
                            <FaUserCircle size={24} />
                            <span className="text-sm">
                              {current?.firstname ? (
                                <div className="flex gap-1 items-center">
                                  <span>{current?.firstname}</span>
                                  <span>
                                    {isShowProfileOption ? (
                                      <AiOutlineUp />
                                    ) : (
                                      <AiOutlineDown />
                                    )}
                                  </span>
                                </div>
                              ) : (
                                <AiOutlineDown />
                              )}
                            </span>
                            {isShowProfileOption && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute z-20 w-[150px] rounded-sm bg-white text-gray-900 shadow-md p-2 top-full mt-2"
                              >
                                <div className="space-y-2">
                                  {current && (
                                    <Link
                                      className="duration-200 p-1 hover:bg-main/20 inline-block w-full rounded-md hover:text-main"
                                      to={`/${path.MEMBER}/${path.PERSONAL}`}
                                    >
                                      Quản lý
                                    </Link>
                                  )}

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
                                        Đăng nhập hoặc Đăng ký
                                      </Link>
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                )}
              </div>
              <Link to={`/${path.HOME}`}>
                <img
                  src={configs?.[0]?.logo || logo}
                  alt="logo"
                  className="h-20 object-contain"
                />
              </Link>
              <div className=" hidden md:block">
                <div className="flex items-center gap-2 relative">
                  <div
                    id="category"
                    className="cursor-pointer flex items-center gap-2"
                    onClick={() => {
                      setIsShowCategoryOption((prev) => !prev);
                      setIsShowProfileOption(false); // Hide profile options when showing categories
                      setSelectedCategory(null);
                    }}
                  >
                    <div>
                      {isShowCategoryOption ? (
                        <IoMdClose size={24} className="ml-2 text-xl" />
                      ) : (
                        <HiMenuAlt3 size={24} className="ml-2 text-xl" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs">Danh mục</span>
                      <span className="font-semibold flex items-center">
                        Sản phẩm <FaCaretDown />
                      </span>
                    </div>
                  </div>
                  <div className="hidden md:block w-[500px]">
                    <SearchBar />
                  </div>
                  {/* Dropdown Menu */}
                  {isShowCategoryOption && (
                    <div className="absolute z-20 w-full bg-white text-gray-900 shadow-md top-full left-1/2 mt-2 transform -translate-x-1/2 flex">
                      {/* Danh mục */}
                      <div className="relative w-2/12 bg-[#FEFEFE] shadow-custom">
                        <ul>
                          {categories?.map((el) => (
                            <li
                              key={el._id}
                              onMouseEnter={() =>
                                handleCategoryClick(el._id, el.title)
                              }
                              className={`p-2 cursor-pointer transition-colors duration-200 relative ${
                                selectedCategory === el._id
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-900"
                              }`}
                            >
                              <Link
                                to={`/${convertToSlug(el.title)}`}
                                className="block"
                              >
                                {el.title}
                              </Link>
                              {selectedCategory === el._id && (
                                <div className="absolute left-full top-1/2 transform -translate-y-1/2 rotate-180 w-0 h-0 border-t-20 border-t-transparent border-r-8 border-r-black border-b-20 border-b-transparent" />
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Thương hiệu */}
                      <div className="w-10/12 bg-white px-6">
                        {selectedCategory && brandData.length > 0 && (
                          <div>
                            {brandData?.map((brand) => (
                              <div
                                key={brand?._id}
                                className="flex gap-1 items-center cursor-pointer hover:text-main"
                                onClick={() => handleBrandClick(brand?._id)}
                              >
                                <div className="flex gap-1 text-sm">
                                  <span>{brand?.category?.title} </span>
                                  <span>{brand?.title}</span>
                                </div>

                                <img
                                  src={brand?.images}
                                  className="w-10 h-10"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-1 ">
            <div className="flex items-center justify-end h-full">
              <div className="flex justify-center md:justify-end items-center gap-2">
                <div className="hidden md:block">
                  <div className="flex flex-col font-semibold pl-2">
                    <span className="text-[10px]">HOTLINE</span>
                    <span className="">0123.456.789</span>
                  </div>
                </div>

                <div>
                  <div
                    onClick={() => dispatch(showCart())}
                    className="flex items-center cursor-pointer px-2 relative"
                  >
                    <GiShoppingBag size={24} />
                    <span className="text-xs">{`(${
                      current?.cart?.length || 0
                    })`}</span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div
                    id="profile"
                    onClick={() => {
                      setIsShowProfileOption((prev) => !prev);
                      setIsShowCategoryOption(false); // Hide category options when showing profile
                    }}
                    className="flex items-center justify-start gap-1 cursor-pointer group relative"
                  >
                    <FaUserCircle size={24} />
                    <span className="text-sm">
                      {current?.firstname ? (
                        <div className="flex gap-1 items-center">
                          <span>{current?.firstname}</span>
                          <span>
                            {isShowProfileOption ? (
                              <AiOutlineUp />
                            ) : (
                              <AiOutlineDown />
                            )}
                          </span>
                        </div>
                      ) : (
                        <AiOutlineDown />
                      )}
                    </span>
                    {isShowProfileOption && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute z-20 w-[150px] rounded-sm bg-white text-gray-900 shadow-md p-2 top-full mt-2"
                      >
                        <div className="space-y-2">
                          {current && (
                            <Link
                              className="duration-200 p-1 hover:bg-main/20 inline-block w-full rounded-md hover:text-main"
                              to={`/${path.MEMBER}/${path.PERSONAL}`}
                            >
                              Quản lý
                            </Link>
                          )}

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
                                Đăng nhập hoặc Đăng ký
                              </Link>
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default withBase(BotHeader);
