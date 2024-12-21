import React from "react";
import { FaFacebook, FaPhone } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useSelector } from "react-redux";

const SocialButtons = () => {
  const { configs } = useSelector((state) => state?.app);
  return (
    <div className="fixed bottom-12 right-4 flex flex-col">
      <div className="bg-black p-[2px] rounded-0 flex items-center justify-center transition-colors duration-300 hover:bg-red-600">
        {/* Nút Facebook */}
        <button
          onClick={() =>
            window.open(configs?.facebook, "_blank", "noopener,noreferrer")
          }
          className="p-2 bg-transparent text-white "
        >
          <FaFacebook size={16} />
        </button>
      </div>

      <div className="bg-black p-[2px] rounded-0 flex items-center justify-center transition-colors duration-300 hover:bg-red-600">
        {/* Nút Phone */}
        <a
          href={`tel:${configs?.mobile}`}
          className="p-2 bg-transparent text-white "
        >
          <FaPhone size={16} />
        </a>
      </div>

      <div className="bg-black p-[2px] rounded-0 flex items-center justify-center transition-colors duration-300 hover:bg-red-600">
        {/* Nút Email */}
        <a
          href={`mailto:${configs?.email}`}
          className="p-2 bg-transparent text-white "
        >
          <HiOutlineMail size={16} />
        </a>
      </div>
    </div>
  );
};

export default SocialButtons;
