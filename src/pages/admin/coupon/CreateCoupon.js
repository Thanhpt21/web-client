import React from "react";
import { InputForm, ButtonField, Loading } from "components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
import withBase from "hocs/withBase";
import { apiCreateCoupon } from "apis/coupon";

const CreateCoupon = ({ dispatch }) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const handleCreateColor = async (data) => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiCreateCoupon(data);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));

    if (response.success) {
      toast.success(response.message);
      reset();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <h1 className="h-[75px] flex justify-between items-center text-xl px-4 border-b">
        <span>Tạo mã giảm giá</span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateColor)}>
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
            <ButtonField type="submit">Tạo</ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withBase(CreateCoupon);
