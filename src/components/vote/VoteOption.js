import React, { memo, useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { votes } from "../../utils/contants";
import icons from "../../utils/icons";
import ButtonField from "../button/ButtonField";

const { AiFillStar } = icons;

const VoteOption = ({ nameProduct, handleSubmitVote }) => {
  const modalRef = useRef();
  const [chooseStar, setChooseStar] = useState(null);
  const [comment, setcomment] = useState("");

  useEffect(() => {
    modalRef?.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      className="bg-white w-full max-w-[500px] mx-auto border p-4 flex flex-col gap-4 items-center justify-center z-50"
    >
      <h2 className="text-center text-medium text-lg">{`Đánh giá cho sản phẩm ${nameProduct}`}</h2>
      <textarea
        rows={3}
        value={comment}
        onChange={(e) => setcomment(e.target.value)}
        placeholder="Nhập đánh giá của bạn vào đây"
        className="form-textarea w-full placeholder:text-xs placeholder:italic placeholder:text-gray-500 text-sm"
      ></textarea>
      <div className="w-full grid grid-cols-5 gap-2">
        {votes.map((el) => (
          <div
            className="w-[60px] h-[60px] rounded-md hover:bg-gray-400 bg-white flex items-center justify-center flex-col gap-2 cursor-pointer"
            key={el.id}
            onClick={() => setChooseStar(el.id)}
          >
            {Number(chooseStar) && chooseStar >= el.id ? (
              <AiFillStar color="orange" />
            ) : (
              <AiFillStar color="gray" />
            )}
            <span className="text-xs">{el.text}</span>
          </div>
        ))}
      </div>
      <ButtonField
        handleOnClick={() =>
          handleSubmitVote({ comment: comment, star: chooseStar })
        }
        fw
      >
        Gửi đi
      </ButtonField>
    </div>
  );
};

export default memo(VoteOption);
