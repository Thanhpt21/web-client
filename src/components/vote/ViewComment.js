import React from "react";
import avatarImg from "../../assets/avatar.jpg";
import moment from "moment";
import { renderStarFromNumber } from "../../utils/helpers";

const ViewComment = ({
  avatar = avatarImg,
  name = "Ẩn danh",
  comment,
  star,
  updatedAt,
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex-none">
        <img
          src={avatar}
          alt="avatar"
          className="w-[25px] h-[25px] object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col flex-auto ">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{name}</h3>
          <span className="text-xs italic">
            {moment(updatedAt).format("DD/MM/YYYY HH:mm:ss")}
          </span>
        </div>
        <div className="flex flex-col gap-2 pl-4 text-sm mt-2 border border-gray-300 py-2 bg-gray-100">
          <span className="flex items-center gap-1">
            <span className="text-medium">Đánh giá:</span>
            <span className="flex items-center gap-1">
              {renderStarFromNumber(star)?.map((el, i) => (
                <span key={i}>{el}</span>
              ))}
            </span>
          </span>
          <span className="flex  gap-1">
            <span className="text-medium">Nội dung:</span>
            <span className="">{comment}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewComment;
