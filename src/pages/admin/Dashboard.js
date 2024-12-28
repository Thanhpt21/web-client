import {
  apiDeleteRating,
  apiGetAllProduct,
  apigetBlogs,
  apiGetLatestRatings,
  apiGetOrdersByAdmin,
  apiGetUsers,
  getProducts,
} from "apis";
import HeaderPageAdmin from "components/admin/HeaderPageAdmin";

import React, { useEffect, useState } from "react";
import ChartOrder from "./chart/ChartOrder";
import { MdDelete, MdGroups, MdProductionQuantityLimits } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { PiNewspaperClippingLight } from "react-icons/pi";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalNews, setTotalNews] = useState(0);
  const [latestProductsRating, setLatestProductsRatings] = useState([]);

  const fetchProduct = async () => {
    const response = await apiGetAllProduct();
    if (response.success) {
      setTotalProducts(response.products.length);
    }
  };

  const fetchAccount = async () => {
    const response = await apiGetUsers();
    if (response.success) {
      setTotalAccounts(response.users.length);
    }
  };

  const fetchOrder = async () => {
    const response = await apiGetOrdersByAdmin();
    if (response.success) {
      setTotalOrders(response.orders.length);
    }
  };

  const fetchBlog = async () => {
    const response = await apigetBlogs();
    if (response.success) {
      setTotalNews(response.blogs.length);
    }
  };

  const fetchLatestProductsRatings = async () => {
    const response = await apiGetLatestRatings();
    if (response.success) {
      setLatestProductsRatings(response.products);
    }
  };

  const handleDeleteRating = async (productId, ratingId) => {
    if (!productId || !ratingId) {
      toast.error("ID sản phẩm hoặc ID đánh giá không hợp lệ.");
      return;
    }
    try {
      // Gọi API xóa đánh giá
      const response = await apiDeleteRating(productId, ratingId);

      if (response.success) {
        // Cập nhật lại danh sách đánh giá sau khi xóa
        setLatestProductsRatings(
          (prevRatings) =>
            prevRatings
              .map((product) => {
                if (product._id === productId) {
                  // Xóa rating khỏi sản phẩm
                  product.ratings = product.ratings.filter(
                    (rating) => rating._id !== ratingId
                  );
                }
                return product;
              })
              .filter((product) => product.ratings.length > 0) // Lọc sản phẩm có ratings trống
        );
        toast.success("Đánh giá đã được xóa thành công.");
      } else {
        toast.error("Không thể xóa đánh giá.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa đánh giá:", error);
      toast.error("Đã xảy ra lỗi khi xóa đánh giá.");
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchAccount();
    fetchOrder();
    fetchBlog();
    fetchLatestProductsRatings();
  }, []);

  return (
    <div className="w-full">
      <HeaderPageAdmin title={"Thống kê"} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <div className="bg-blue-600 border border-gray-300 p-6 rounded-lg shadow-md flex flex-col items-start">
          <div className="flex items-center mb-3">
            <MdProductionQuantityLimits className="text-white text-3xl mr-2" />
            <h2 className="text-white font-medium text-lg">Tổng số sản phẩm</h2>
          </div>
          <p className="text-3xl font-bold text-white">{totalProducts}</p>
        </div>

        <div className="bg-green-600 border border-gray-300 p-6 rounded-lg shadow-md flex flex-col items-start">
          <div className="flex items-center mb-3">
            <MdGroups className="text-white text-3xl mr-2" />
            <h2 className="text-white font-medium text-lg">
              Tổng số tài khoản
            </h2>
          </div>
          <p className="text-3xl font-bold text-white">{totalAccounts}</p>
        </div>

        <div className="bg-yellow-600 border border-gray-300 p-6 rounded-lg shadow-md flex flex-col items-start">
          <div className="flex items-center mb-3">
            <RiBillLine className="text-white text-3xl mr-2" />
            <h2 className="text-white font-medium text-lg">Tổng số đơn hàng</h2>
          </div>
          <p className="text-3xl font-bold text-white">{totalOrders}</p>
        </div>

        <div className="bg-red-600 border border-gray-300 p-6 rounded-lg shadow-md flex flex-col items-start">
          <div className="flex items-center mb-3">
            <PiNewspaperClippingLight className="text-white text-3xl mr-2" />
            <h2 className="text-white font-medium text-lg">Tổng số tin tức</h2>
          </div>
          <p className="text-3xl font-bold text-white">{totalNews}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        <div className="lg:col-span-2">
          <ChartOrder />
        </div>
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium mb-4">Đánh giá mới nhất</h3>
          <div className="space-y-4">
            {latestProductsRating?.map((product) => (
              <div
                key={product?._id}
                className="border-b pb-4 flex items-center justify-between"
              >
                {/* Cột 1/3: Tên sản phẩm và số sao */}
                <div className="flex flex-col">
                  <h4 className="font-medium text-lg">{product?.title}</h4>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-600">
                      Đánh giá:{" "}
                      {product.ratings && product.ratings.length > 0 ? (
                        <span className="font-bold">
                          {product?.ratings[0]?.star}⭐
                        </span>
                      ) : (
                        "Chưa có đánh giá"
                      )}
                    </p>
                  </div>
                </div>

                {/* Cột 1/3: Comment và email người dùng */}
                <div className="flex flex-col items-center">
                  <p className="text-sm text-gray-600">
                    Comment: {product?.ratings[0]?.comment}
                  </p>
                  <p className="text-sm text-gray-600">
                    Email: {product?.ratings[0]?.user?.email}
                  </p>
                </div>

                {/* Cột 1/3: Icon thùng rác để xóa đánh giá */}
                <div className="flex items-center">
                  <MdDelete
                    className="text-red-600 cursor-pointer"
                    onClick={() =>
                      handleDeleteRating(product?._id, product?.ratings[0]._id)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
