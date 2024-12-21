import React, { useState } from "react";
import { FiMenu, FiChevronDown, FiChevronUp } from "react-icons/fi";

const SummaryPanel = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Hàm xử lý khi bấm vào một mục tóm tắt
  const scrollToItem = (index) => {
    const element = document.getElementById(`summary-item-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="bg-gray-200 p-4 rounded-lg shadow-md">
        <div
          className="flex items-center justify-between text-lg font-semibold cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center">
            <FiMenu className="mr-2" />
            <div>Tóm tắt bài viết</div>
          </div>
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        {isOpen && (
          <div className="mt-4">
            {content?.map((item, index) => (
              <div
                key={index}
                className="flex items-center mb-2 cursor-pointer"
                onClick={() => scrollToItem(index + 1)}
              >
                <div className="flex items-center justify-center mr-2">
                  {index + 1}.
                </div>
                <div className="text-sm">{item.title}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4">
        {content?.map((item, index) => (
          <div key={index} id={`summary-item-${index + 1}`} className="mb-4">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: item.body }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryPanel;
