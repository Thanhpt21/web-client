import {
  apiDeleteRating,
  apiGetAllProduct,
  apigetBlogs,
  apiGetLatestRatings,
  apiGetOrdersByAdmin,
  apiGetUsers,
} from "apis";
import HeaderPageAdmin from "components/admin/HeaderPageAdmin";
import React, { useEffect, useState } from "react";
import ChartOrder from "./chart/ChartOrder";
import { MdDelete, MdGroups, MdProductionQuantityLimits } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { PiNewspaperClippingLight } from "react-icons/pi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [totalOrders, setTotalOrders] = useState([]);
  const [totalNews, setTotalNews] = useState(0);
  const [ordersData, setOrdersData] = useState([]);
  const [latestProductsRating, setLatestProductsRatings] = useState([]);
  const [orderCounts, setOrderCounts] = useState([]);

  useEffect(() => {
    fetchProduct();
    fetchAccount();
    fetchOrder();
    fetchBlog();
    fetchLatestProductsRatings();
  }, []);

  useEffect(() => {
    if (ordersData.length > 0) {
      const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // Mảng các tháng cần lấy
      const counts = getOrderCountByMonth(ordersData, months);
      setOrderCounts(counts);
    }
  }, [ordersData]);

  const getOrderCountByMonth = (orders, months) => {
    const orderCounts = new Array(12).fill(0);

    orders.forEach((order) => {
      const orderMonth = new Date(order.createdAt).getMonth(); // getMonth() trả về giá trị từ 0 đến 11 (Jan - Dec)
      if (months.includes(orderMonth + 1)) {
        orderCounts[orderMonth] += 1;
      }
    });

    return orderCounts;
  };

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
      setOrdersData(response.orders);
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

  const handleDeleteRating = (productId, ratingId) => {
    if (!productId || !ratingId) {
      toast.error("ID sản phẩm hoặc ID đánh giá không hợp lệ.");
      return;
    }
    Swal.fire({
      title: "Xóa đánh giá",
      text: "Bạn có muốn xóa đánh giá này?",
      icon: "warning",
      showCancelButton: true,
    }).then((rs) => {
      if (rs.isConfirmed) {
        try {
          const response = apiDeleteRating(productId, ratingId);
          if (response.success) {
            setLatestProductsRatings((prevRatings) =>
              prevRatings
                .map((product) => {
                  if (product._id === productId) {
                    product.ratings = product.ratings.filter(
                      (rating) => rating._id !== ratingId
                    );
                  }
                  return product;
                })
                .filter((product) => product.ratings.length > 0)
            );
            toast.success("Đánh giá đã được xóa thành công.");
          } else {
            toast.error("Không thể xóa đánh giá.");
          }
        } catch (error) {
          console.error("Lỗi khi xóa đánh giá:", error);
          toast.error("Đã xảy ra lỗi khi xóa đánh giá.");
        }
      }
    });
  };

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
          <ChartOrder orderCounts={orderCounts} />
        </div>
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium mb-4">Đánh giá mới nhất</h3>
          <div className="space-y-4">
            {latestProductsRating?.map((product) => (
              <div
                key={product?._id}
                className="border-b pb-4 flex items-center justify-between"
              >
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

                <div className="flex flex-col items-center">
                  <p className="text-sm text-gray-600">
                    Comment: {product?.ratings[0]?.comment}
                  </p>
                  <p className="text-sm text-gray-600">
                    Email: {product?.ratings[0]?.user?.email}
                  </p>
                </div>

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
