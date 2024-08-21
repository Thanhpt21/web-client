import React, { useEffect } from "react";
import { InputForm, ButtonField, Loading } from "components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { showModal } from "store/app/appSlice";
import { apiUpdateCoupon } from "apis/coupon";
import moment from "moment";

const UpdateCoupon = ({ valueEdit, render, setValueEdit }) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  useEffect(() => {
    reset({
      name: valueEdit?.name || "",
      usageLimit: valueEdit?.usageLimit || "",
      discount: valueEdit?.discount || "",
      minPrice: valueEdit?.minPrice || "",
      expiry: moment(valueEdit?.expiry).format("YYYY-MM-DD") || "",
    });
  }, []);

  const handleUpdateCoupon = async (data) => {
    // Sử dụng Moment.js để định dạng lại ngày hết hạn
    let formattedDate = moment(data.expiry).format("YYYY-MM-DD");

    // Cập nhật lại ngày hết hạn trong đối tượng data
    data.expiry = formattedDate;

    // Hiển thị modal loading
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));

    try {
      // Gọi API để cập nhật coupon
      const response = await apiUpdateCoupon(data, valueEdit?._id);

      // Ẩn modal loading sau khi gọi API thành công hoặc thất bại
      dispatch(showModal({ isShowModal: false, modalChildren: null }));

      // Xử lý kết quả từ phản hồi API
      if (response.success) {
        toast.success(response.message);
        render(); // Cập nhật giao diện sau khi cập nhật thành công
        setValueEdit(null); // Đặt lại giá trị chỉnh sửa về null
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error updating coupon:", error);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      toast.error("Failed to update coupon. Please try again.");
    }
  };

  return (
    <div className="w-full ">
      <h1 className="h-[75px] flex justify-between items-center text-xl px-4 border-b">
        <span>Cập nhật mã giảm giá</span>
        <span
          className="text-main hover:underline cursor-pointer"
          onClick={() => setValueEdit(null)}
        >
          Hủy
        </span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateCoupon)}>
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Tên"}
              register={register}
              errors={errors}
              id="name"
              validate={{
                required: "Vui lòng nhập tên",
              }}
              fullwidth
              placeholder="Vui lòng nhập tên"
              style="flex-auto"
            />
            <InputForm
              label={"Giá tiền"}
              register={register}
              errors={errors}
              id="discount"
              validate={{
                required: "Vui lòng nhập Giá tiền",
              }}
              fullwidth
              placeholder="Vui lòng nhập Giá tiền"
              style="flex-auto"
              type="number"
            />
          </div>
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Ngày hết hạn"}
              register={register}
              errors={errors}
              id="expiry"
              validate={{
                required: "Vui lòng nhập Ngày hết hạn",
              }}
              placeholder="Vui lòng nhập Ngày hết hạn"
              style="flex-1"
              type="date"
            />
            <InputForm
              label={"Giá tối thiểu sử dụng"}
              register={register}
              errors={errors}
              id="minPrice"
              validate={{
                required: "Vui lòng nhập Giá tối thiểu",
              }}
              fullwidth
              placeholder="Vui lòng nhập Giá tối thiểu"
              style="flex-1"
              type="number"
            />
            <InputForm
              label={"Giới hạn lượt sử dụng"}
              register={register}
              errors={errors}
              id="usageLimit"
              validate={{
                required: "Vui lòng nhập số lượng sử dụng",
                min: {
                  value: 0,
                  message: "Số lượng sử dụng phải lớn hơn hoặc bằng 0",
                },
              }}
              placeholder="Vui lòng nhập số lượng sử dụng"
              style="flex-1"
              type="number"
            />
          </div>

          <div className="mt-8">
            <ButtonField type="submit">Cập nhật</ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCoupon;
