import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/app/appSlice";

const Modal = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() =>
        dispatch(showModal({ isShowModal: false, modalChildren: null }))
      }
      style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
      className="inset-0 fixed flex items-center justify-center z-50"
    >
      {children}
    </div>
  );
};

export default memo(Modal);
