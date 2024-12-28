import React from "react";
import { Bar } from "react-chartjs-2"; // Import loại biểu đồ Bar từ react-chartjs-2
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js"; // Import các thành phần cần thiết từ Chart.js

// Đăng ký các thành phần Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const ChartOrder = ({ orderCounts }) => {
  // Dữ liệu biểu đồ
  const data = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ], // Các nhãn cho biểu đồ
    datasets: [
      {
        label: "Đơn hàng", // Tên của dataset
        data: orderCounts, // Dữ liệu của biểu đồ
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Màu nền của các cột
        borderColor: "rgba(75, 192, 192, 1)", // Màu viền của các cột
        borderWidth: 1, // Độ rộng viền
      },
    ],
  };

  // Tùy chỉnh cho biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Đơn: ${tooltipItem.raw}`, // Hiển thị label tùy chỉnh
        },
      },
    },
  };

  return (
    <div>
      <h2>Thống kê đơn hàng</h2>
      <Bar data={data} options={options} /> {/* Vẽ biểu đồ */}
    </div>
  );
};

export default ChartOrder;
