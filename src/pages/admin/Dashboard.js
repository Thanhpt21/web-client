import {
  apiGetAllProduct,
  apigetBlogs,
  apiGetOrdersByAdmin,
  apiGetUsers,
  getProducts,
} from "apis";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalNews, setTotalNews] = useState(0);

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

  useEffect(() => {
    fetchProduct();
    fetchAccount();
    fetchOrder();
    fetchBlog();
  }, []);

  return (
    <div className="w-full">
      <h1 className="h-[75px] flex justify-between items-center text-xl px-4 border-b ">
        <span>Quản lý mã giảm giá</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <div className="bg-white border border-gray-300 p-3 rounded-lg shadow-md">
          <h2 className="text-nd font-medium mb-2">Tổng số sản phẩm</h2>
          <p className="text-2xl font-bold text-center text-blue-600">
            {totalProducts}
          </p>
        </div>
        <div className="bg-white border border-gray-300 p-3 rounded-lg shadow-md">
          <h2 className="text-nd font-medium mb-2">Tổng số tài khoản</h2>
          <p className="text-2xl font-bold text-center text-green-600">
            {totalAccounts}
          </p>
        </div>
        <div className="bg-white border border-gray-300 p-3 rounded-lg shadow-md">
          <h2 className="text-nd font-medium mb-2">Tổng số đơn hàng</h2>
          <p className="text-2xl font-bold text-center text-yellow-600">
            {totalOrders}
          </p>
        </div>
        <div className="bg-white border border-gray-300 p-3 rounded-lg shadow-md">
          <h2 className="text-nd font-medium mb-2">Tổng số tin tức</h2>
          <p className="text-2xl font-bold text-center text-red-600">
            {totalNews}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
