import React, { useEffect } from "react";
import { InputForm, ButtonField, Loading } from "components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { showModal } from "store/app/appSlice";
import { apiUpdateSize } from "apis/size"; // Thay ship bằng size
import HeaderWithCancelButton from "components/admin/HeaderWithCancelButton";

const UpdateSize = ({ valueEdit, render, setValueEdit }) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    reset({
      title: valueEdit?.title || "", // Sử dụng title thay vì province
    });
  }, [valueEdit, reset]);

  const handleUpdateSize = async (data) => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUpdateSize(data, valueEdit?._id); // Gọi API cập nhật kích thước
    dispatch(showModal({ isShowModal: false, modalChildren: null }));

    if (response.success) {
      toast.success(response.message);
      render();
      setValueEdit(null);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="w-full">
      <HeaderWithCancelButton
        title={"Cập nhật kích thước"} // Tiêu đề thay đổi cho kích thước
        setValueEdit={setValueEdit}
      />

      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateSize)}>
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Tên kích thước"} // Đổi label thành Tên kích thước
              register={register}
              errors={errors}
              id="title" // Sử dụng id là title cho kích thước
              validate={{
                required: "Vui lòng nhập tên kích thước",
              }}
              fullwidth
              placeholder="Vui lòng nhập tên kích thước"
              style="flex-auto"
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

export default UpdateSize;
