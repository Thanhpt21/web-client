import React from "react";

const HeaderWithCancelButton = ({ title, setValueEdit }) => {
  return (
    <h1 className="h-[60px] flex justify-between items-center text-xl px-4 border-b">
      <span>{title}</span>
      <button
        className="text-white text-[14px] bg-red-500 px-2 py-1 rounded-sm hover:bg-red-600"
        onClick={() => setValueEdit(null)}
      >
        Quay về
      </button>
    </h1>
  );
};

export default HeaderWithCancelButton;
