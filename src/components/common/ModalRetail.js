import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/app/appSlice";
import { IoMdClose } from "react-icons/io";

const ModalRetail = ({ children, isOpen, onClose }) => {
  const dispatch = useDispatch();
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
      className="inset-0 fixed flex items-center justify-center z-50"
    >
      <div class="fixed inset-0 flex items-center justify-center z-60">
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
          <button
            class="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            onClick={() => onClose()}
          >
            <IoMdClose size={24} />
          </button>
          <h2 class="text-lg font-semibold mb-4">Hệ thống cửa hàng</h2>
          <p class="mb-4">
            <div className="flex flex-col gap-2">
              {Array.isArray(children) ? (
                children.map((el, i) => (
                  <a
                    href={el.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-2 p-4 bg-white text-black rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-gray-100 hover:text-red-500"
                    key={i}
                  >
                    <span>{el.name}</span>
                    <span>{el.address}</span>
                    <span>{el.mobile}</span>
                  </a>
                ))
              ) : (
                <span>Không có dữ liệu</span>
              )}
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(ModalRetail);
