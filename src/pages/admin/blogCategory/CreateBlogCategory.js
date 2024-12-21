import React from "react";
import { InputForm, ButtonField, Loading } from "components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { showModal } from "store/app/appSlice";
import { apiCreateBlogCategory } from "apis/blogCategory";
import withBase from "hocs/withBase";

const CreateBlogCategory = ({ dispatch }) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const handleCreateBlogCategory = async (data) => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiCreateBlogCategory(data);
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
        <span>Tạo danh mục tin tức</span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateBlogCategory)}>
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Tên"}
              register={register}
              errors={errors}
              id="title"
              validate={{
                required: "Vui lòng nhập tên danh mục tin tức",
              }}
              fullwidth
              placeholder="Vui lòng nhập tên danh mục tin tức"
              style="flex-auto"
            />
          </div>
          <div className="mt-8">
            <ButtonField type="submit">Tạo danh mục</ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withBase(CreateBlogCategory);
