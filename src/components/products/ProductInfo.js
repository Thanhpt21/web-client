import React, { memo, useState } from "react";
import { productInfo } from "../../utils/contants";
import { ButtonField, ViewComment, VoteBar, VoteOption } from "..";
import { renderStarFromNumber } from "../../utils/helpers";
import { apiRatings } from "../../apis";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../store/app/appSlice";
import Swal from "sweetalert2";
import path from "../../utils/path";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { toast } from "react-toastify";

const ProductInfo = ({
  totalratings,
  ratings,
  nameProduct,
  pid,
  reRender,
  description,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);

  const [activedTab, setactivedTab] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmitVote = async ({ comment, star }) => {
    if (!isLoggedIn) {
      Swal.fire({
        text: "Đăng nhập để đánh giá",
        cancelButtonText: "Hủy bỏ",
        confirmButtonText: "Đăng nhập",
        title: "Opps",
        showCancelButton: true,
      }).then((rs) => {
        if (rs.isConfirmed) {
          navigate(`/${path.LOGIN}`);
        }
      });
    } else {
      if (!comment || !pid || !star) {
        toast.warning("Vui lòng chọn sao và nhập đánh giá");
        return;
      }
      await apiRatings({
        star: star,
        comment: comment,
        pid,
        updatedAt: Date.now(),
      });

      reRender();
    }
  };

  const toggleVisibility = () => {
    if (!isLoggedIn) {
      Swal.fire({
        text: "Đăng nhập để đánh giá",
        cancelButtonText: "Hủy bỏ",
        confirmButtonText: "Đăng nhập",
        title: "Opps",
        showCancelButton: true,
      }).then((rs) => {
        if (rs.isConfirmed) {
          navigate(`/${path.LOGIN}`);
        }
      });
    } else {
      setIsVisible(!isVisible);
    }
  };

  const handleVote = () => {
    if (!isLoggedIn) {
      Swal.fire({
        text: "Đăng nhập để đánh giá",
        cancelButtonText: "Hủy bỏ",
        confirmButtonText: "Đăng nhập",
        title: "Opps",
        showCancelButton: true,
      }).then((rs) => {
        if (rs.isConfirmed) {
          navigate(`/${path.LOGIN}`);
        }
      });
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOption
              handleSubmitVote={handleSubmitVote}
              nameProduct={nameProduct}
            />
          ),
        })
      );
    }
  };

  return (
    <div id="desc">
      <div className="flex items-center gap-2 relative bottom-[-1px]">
        <span
          onClick={() => setactivedTab(1)}
          className={`py-2 px-4 cursor-pointer ${
            activedTab === 1 ? "bg-white border border-b-0" : "bg-gray-300"
          }`}
          key={1}
        >
          Mô tả
        </span>
        {productInfo.map((el) => (
          <span
            onClick={() => setactivedTab(el.id)}
            className={`py-2 px-4 cursor-pointer ${
              activedTab === +el.id
                ? "bg-white border border-b-0"
                : "bg-gray-300"
            }`}
            key={el.id}
          >
            {el.title}
          </span>
        ))}
      </div>
      <div className="w-full border p-4">
        {productInfo.some((el) => el.id === activedTab) &&
          productInfo[activedTab - 1]?.content}
        {activedTab === 1 && (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          ></div>
        )}
      </div>

      <div className="grid grid-cols-1 py-2">
        <div className="py-2 px-4 cursor-pointer bg-white border border-b-0">
          Đánh giá từ khách hàng
        </div>
        <div className="flex">
          <div className="flex-4 border flex flex-col items-center justify-center">
            <span className="font-semibold text-xl">{`${totalratings}/5`}</span>
            <span className="flex items-center gap-1">
              {renderStarFromNumber(totalratings)?.map((el, i) => (
                <span key={i}>{el}</span>
              ))}
            </span>
            <span className="text-sm">{`${ratings?.length} lượt`}</span>
          </div>
          <div className="flex-6 border flex flex-col-reverse gap-2 p-4">
            {Array.from(Array(5).keys()).map((el) => (
              <VoteBar
                key={el}
                number={el + 1}
                ratingTotal={ratings?.length}
                ratingCount={ratings?.filter((i) => i.star === el + 1)?.length}
              />
            ))}
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2 items-center justify-center text-sm">
          <span>Bạn muốn đánh giá sản phẩm này?</span>
          <ButtonField handleOnClick={toggleVisibility}>
            {isVisible ? (
              <div className="flex items-center gap-2">
                <span>Ẩn đánh giá</span>
                <AiOutlineArrowUp />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Đánh giá ngay</span>
                <AiOutlineArrowDown />
              </div>
            )}
          </ButtonField>
        </div>
        {isVisible && (
          <VoteOption
            handleSubmitVote={handleSubmitVote}
            nameProduct={nameProduct}
          />
        )}
        <div className="flex flex-col gap-4">
          {ratings?.map((el) => (
            <ViewComment
              key={el._id}
              star={el.star}
              updatedAt={el.updatedAt}
              comment={el.comment}
              name={`${el.postedby?.lastname} ${el.postedby?.firstname}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(ProductInfo);
