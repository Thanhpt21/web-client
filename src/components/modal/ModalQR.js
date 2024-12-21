import React from "react";
import QRCode from "react-qr-code";

const ModalQR = ({ isOpen, onClose, children, value }) => {
  // Xử lý đóng modal khi nhấn nút đóng
  const handleClose = () => {
    onClose();
  };

  // Nếu không mở modal, không render gì cả
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        {/* Phần nội dung modal */}
        <div className="relative bg-white rounded-lg w-96 shadow-lg">
          {/* Nút đóng modal */}
          <button
            onClick={handleClose}
            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {/* Phần nội dung trong modal */}
          <div className="p-6">
            <QRCode value={value} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalQR;
