import React, { useEffect, useState } from "react";
import { Outlet, Navigate, Link } from "react-router-dom";
import path from "utils/path";
import { useSelector } from "react-redux";
import { AdminSidebar } from "components";
import { HiUserCircle } from "react-icons/hi";
import withBase from "hocs/withBase";
import { getCurrent } from "store/user/userActions";
import { logout } from "store/user/userSlice";
import { FaRegBell } from "react-icons/fa";
import moment from "moment";
import { apiGetOrdersByAdmin } from "apis";
import { toast } from "react-toastify";
import { apigetEnquirys } from "apis/enquiry";
import { BsEnvelope } from "react-icons/bs";

const AdminLayout = ({ dispatch }) => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  const [isShowOption, setisShowOption] = useState(false);
  const [newOrder, setNewOrder] = useState(0); // State để lưu số đơn hàng mới trong 24h
  const [isHovering, setIsHovering] = useState(false);

  const [newEnquiry, setNewEnquiry] = useState(0); // State để lưu số thư mới trong 24h
  const [isHoverEnvelope, setIsHoverEnvelope] = useState(false);

  // Function to check if the device is a mobile or tablet
  const isMobileOrTablet = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    return (
      /android/.test(userAgent) ||
      /webos/.test(userAgent) ||
      /iphone|ipad|ipod/.test(userAgent) ||
      /blackberry/.test(userAgent) ||
      /windows phone/.test(userAgent)
    );
  };

  const fetchOrder = async () => {
    const response = await apiGetOrdersByAdmin();

    if (response.success) {
      if (response.orders === null) {
        setNewOrder(0);
      } else {
        const newOrdersInLast24h = response.orders.filter((order) =>
          moment(order.createdAt).isSame(moment(), "day")
        );
        // Cập nhật số đơn hàng mới trong 24h
        setNewOrder(newOrdersInLast24h.length);
      }
    }
  };

  const fetchEnquiry = async () => {
    const response = await apigetEnquirys();

    if (response.success) {
      if (response.enquiry === null) {
        setNewEnquiry(0);
      } else {
        const newEnquiryInLast24h = response.enquiry.filter((el) =>
          moment(el.createdAt).isSame(moment(), "day")
        );
        // Cập nhật số đơn hàng mới trong 24h
        setNewEnquiry(newEnquiryInLast24h.length);
      }
    }
  };

  useEffect(() => {
    fetchOrder();
    fetchEnquiry();
  }, []);

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
      if (!profile?.contains(e.target)) setisShowOption(false);
    };
    document.addEventListener("click", handleClickOutOption);
    return () => {
      document.removeEventListener("click", handleClickOutOption);
    };
  }, []);

  if (!isLoggedIn || !current || +current.role !== 1 || isMobileOrTablet()) {
    toast.warning(
      "Không thể truy cập trang Admin từ thiết bị di động hoặc tablet."
    );
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }

  return (
    <div className="flex w-full  min-h-screen relative ">
      <div className="w-[270px] flex-none fixed top-0 bottom-0 text-gray-900">
        <AdminSidebar />
      </div>
      <div className="w-[270px]"></div>
      <div className="flex-1 bg-gray-100">
        <div className="sticky top-0 bg-white py-2 border-b border-t px-4 shadow-sm z-10">
          <div className="flex gap-4 items-center justify-end">
            <div className="relative">
              <Link
                to={`/${path.ADMIN}/${path.MANAGE_ENQUIRY}`}
                className="flex items-center gap-1 cursor-pointer"
                onMouseEnter={() => setIsHoverEnvelope(true)}
                onMouseLeave={() => setIsHoverEnvelope(false)}
              >
                <BsEnvelope size={24} className="text-gray-700" />
                <span className="bg-red-500 rounded-full px-1 py-0 text-xs text-white absolute top-1 right-0 transform translate-x-1/2 -translate-y-1/2">
                  {newEnquiry}
                </span>
              </Link>
              {isHoverEnvelope && (
                <div className="absolute mt-1 left-0 -ml-24 w-40 bg-white border border-gray-200 p-2 shadow-lg rounded-lg">
                  <p className="text-sm text-gray-700">Thông báo mới</p>
                  <p className="text-xs text-gray-500">
                    Bạn có {newEnquiry} liên hệ mới
                  </p>
                </div>
              )}
            </div>

            <div className="relative">
              <Link
                to={`/${path.ADMIN}/${path.MANAGE_ORDER}`}
                className="flex items-center gap-1 cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <FaRegBell size={24} className="text-gray-700" />
                <span className="bg-green-500 rounded-full px-1 py-0 text-xs text-white absolute top-1 right-0 transform translate-x-1/2 -translate-y-1/2">
                  {newOrder}
                </span>
              </Link>
              {isHovering && (
                <div className="absolute mt-1 left-0 -ml-24 w-40 bg-white border border-gray-200 p-2 shadow-lg rounded-lg">
                  <p className="text-sm text-gray-700">Thông báo mới</p>
                  <p className="text-xs text-gray-500">
                    Bạn có {newOrder} đơn hàng mới
                  </p>
                </div>
              )}
            </div>

            <div
              id="profile"
              onClick={() => {
                setisShowOption((prev) => !prev);
              }}
              className="flex items-center justify-center py-2 gap-2 cursor-pointer group relative pr-6"
            >
              {current?.avatar ? (
                <img
                  src={current?.avatar}
                  alt="logo"
                  className="w-6 h-6 object-cover border rounded-full"
                />
              ) : (
                <HiUserCircle />
              )}

              <span className="text-sm">{current?.firstname}</span>
              {isShowOption && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute z-10 hidden group-hover:block w-[120px] rounded-md bg-white text-gray-900 shadow-md p-2 top-8"
                >
                  <div className="space-y-2">
                    <Link
                      className="duration-200 p-1 hover:bg-main/20 inline-block w-full rounded-md hover:text-main"
                      to={`/${path.ADMIN}/${path.PERSONAL_ADMIN}`}
                    >
                      Cài đặt
                    </Link>

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
        </div>
        <div className=" px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default withBase(AdminLayout);
