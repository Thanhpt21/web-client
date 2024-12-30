import React from "react";
import { InputForm, ButtonField, Loading } from "components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
import withBase from "hocs/withBase";
import { apiCreateSize } from "apis/size"; // Import API cho Size
import HeaderWithBackButton from "components/admin/HeaderWithBackButton";

const CreateSize = ({ dispatch }) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const handleCreateSize = async (data) => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiCreateSize(data);
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
      <HeaderWithBackButton title={"Thêm mới kích thước"} />
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateSize)}>
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Tiêu đề kích thước"}
              register={register}
              errors={errors}
              id="title"
              validate={{
                required: "Vui lòng nhập tiêu đề kích thước",
              }}
              fullwidth
              placeholder="Vui lòng nhập tiêu đề kích thước"
              style="flex-auto"
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

export default withBase(CreateSize);
