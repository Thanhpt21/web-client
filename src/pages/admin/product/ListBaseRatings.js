import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Table, Space } from "antd";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { getProductRatings, apiDeleteRating } from "apis"; // Import API client
import moment from "moment";

const ListBaseRatings = ({ rating, setRating, render, pid }) => {
  const [params] = useSearchParams();
  const [data, setData] = useState([]); // Dữ liệu đánh giá
  const [update, setUpdate] = useState(false);

  // Hàm tải dữ liệu đánh giá
  const fetchRatings = async () => {
    try {
      const response = await getProductRatings(rating?._id); // Gọi API lấy đánh giá theo productId
      if (response.success) {
        setData(response.ratings); // Cập nhật dữ liệu đánh giá vào state
      } else {
        toast.error("Không thể tải đánh giá.");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi tải đánh giá.");
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [update]);

  // Hàm xóa đánh giá
  const handleDeleteRating = (pid, ratingId) => {
    Swal.fire({
      title: "Xóa đánh giá",
      text: "Bạn có chắc chắn muốn xóa đánh giá này?",
      icon: "warning",
      showCancelButton: true,
    }).then((rs) => {
      if (rs.isConfirmed) {
        apiDeleteRating(pid, ratingId).then((response) => {
          if (response.success) {
            toast.success(response.message); // Thông báo xóa thành công
            setData(data.filter((rating) => rating._id !== ratingId));
          } else {
            toast.error(response.message);
          }
        });
      }
    });
  };

  // Các cột trong bảng
  const columns = [
    {
      title: "STT", // Cột số thứ tự
      render: (item, record, index) => (
        <span>
          {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
            process.env.REACT_APP_LIMIT +
            index +
            1}
        </span>
      ),
    },
    {
      title: "Email người đánh giá", // Cột email của người đánh giá
      render: (item, record) => <span>{record.postedby?.email}</span>,
    },
    {
      title: "Số sao", // Cột số sao
      render: (item, record) => (
        <span>
          {record.star} <span className="text-yellow-500">★</span>
        </span>
      ),
    },
    {
      title: "Comment", // Cột bình luận
      render: (item, record) => <span>{record.comment}</span>,
    },
    {
      title: "Ngày tạo", // Cột ngày tạo
      render: (item) => moment(item.updatedAt).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Hành động", // Cột hành động (xóa)
      render: (item, record) => (
        <Space size="middle">
          <span
            onClick={() => handleDeleteRating(pid, record._id)} // Gọi hàm xóa đánh giá
            className="cursor-pointer"
          >
            <AiFillDelete color="red" size={20} /> {/* Biểu tượng xóa */}
          </span>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4 relative">
      <h1 className="h-[75px] flex justify-between items-center px-4 border-b">
        <span className="flex gap-2">
          <span>Đánh giá</span>
        </span>
      </h1>
      <div className="px-4">
        {/* Hiển thị bảng đánh giá */}
        <Table
          dataSource={data} // Dữ liệu bảng
          columns={columns} // Các cột của bảng
          pagination={false} // Không phân trang (bạn có thể thay đổi nếu cần)
        />
      </div>
    </div>
  );
};

export default ListBaseRatings;
