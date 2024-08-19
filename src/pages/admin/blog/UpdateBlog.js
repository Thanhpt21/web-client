import React, { useCallback, useEffect, useState } from "react";
import {
  InputForm,
  SelectField,
  ButtonField,
  MarkDownEditer,
  Loading,
  TextAreaForm,
} from "components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { validate, getBase64 } from "utils/helpers";
import { toast } from "react-toastify";

import { showModal } from "store/app/appSlice";
import { apiUpdateBlog } from "apis/blog";

const UpdateBlog = ({ valueEdit, render, setValueEdit }) => {
  const { blogCategories } = useSelector((state) => state?.app);

  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
    setValue, // Thêm setValue vào các hooks của useForm
  } = useForm();

  useEffect(() => {
    reset({
      title: valueEdit?.title || "",
      category: valueEdit?.category?._id || "",
      content: valueEdit?.content,
      description: valueEdit?.description,
    });
    setPreview({
      images: valueEdit?.images || "",
    });
  }, []);

  const [preview, setPreview] = useState({
    images: null,
  });
  const handlePreview = async (file) => {
    const base64 = await getBase64(file);
    setPreview((prev) => ({ ...prev, images: base64 }));
  };

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0)
      handlePreview(watch("images")[0]);
  }, [watch("images")]);

  const handleUpdateBlog = async (data) => {
    // Nếu có thay đổi danh mục, cập nhật lại giá trị
    if (data.category !== valueEdit.category?._id) {
      data.category = blogCategories?.find(
        (el) => el._id === data.category
      )?._id;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("description", data.description);

    // Xử lý trường images
    if (data.images && data.images.length > 0) {
      // Chỉ lấy phần tử đầu tiên trong mảng images để thêm vào formData
      formData.append("images", data.images[0]);
    } else {
      // Nếu không có images trong data, sử dụng preview.images nếu có
      formData.append("images", preview.images);
    }

    if (
      data.content &&
      Array.isArray(data.content) &&
      data.content.length > 0
    ) {
      data.content.forEach((item, index) => {
        formData.append(`content[${index}][title]`, item.title);
        formData.append(`content[${index}][body]`, item.body);
      });
    }

    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUpdateBlog(formData, valueEdit?._id);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));

    if (response.success) {
      toast.success(response.message);
      render();
      setValueEdit(null);
    } else {
      toast.error(response.message);
    }
  };

  const handleContentFormData = (formData, contentData) => {
    contentData.forEach((section, index) => {
      formData.append(`content[${index}][title]`, section.title);
      formData.append(`content[${index}][body]`, section.body);
    });
  };

  const handleContentChange = (index, field, value) => {
    const updatedContent = [...watch("content")];
    updatedContent[index][field] = value;
    setValue("content", updatedContent); // Cập nhật content
  };

  const removeContentSection = (index) => {
    const updatedContent = [...watch("content")];
    updatedContent.splice(index, 1);
    setValue("content", updatedContent); // Xóa phần tử khỏi content
  };

  const addContentSection = () => {
    const updatedContent = [...watch("content"), { title: "", body: "" }];
    setValue("content", updatedContent); // Thêm phần tử mới vào content
  };

  return (
    <div className="w-full ">
      <h1 className="h-[75px] flex justify-between items-center text-xl px-4 border-b">
        <span>Cập nhật tin tức</span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateBlog)}>
          <div className="flex flex-col gap-2 ">
            <label className="" htmlFor="images">
              Upload ảnh tin tức
            </label>
            <input
              className="w-fit"
              type="file"
              id="images"
              {...register("images")}
            />
            {errors["images"] && (
              <small className="text-xs text-red-500">
                {errors["images"]?.message}
              </small>
            )}
          </div>
          {preview.images && (
            <div className="my-4">
              <img
                className="w-[100px] object-contain"
                src={preview.images}
                alt="images"
              />
            </div>
          )}

          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Tên tin tức"}
              register={register}
              errors={errors}
              id="title"
              validate={{
                required: "Vui lòng nhập tên tin tức",
              }}
              fullwidth
              placeholder
              style="flex-auto"
            />
            <SelectField
              label="Danh mục"
              options={blogCategories?.map((el) => ({
                code: el._id,
                value: el.title,
              }))}
              register={register}
              style="flex-auto"
              id="category"
              validate={{ required: "Vui lòng chọn danh mục" }}
              errors={errors}
              fullwidth
            />
          </div>
          <div className="w-full my-6 flex gap-4">
            <TextAreaForm
              label={"Mô tả"}
              register={register}
              errors={errors}
              id="description"
              validate={{
                required: "Vui lòng nhập tên mô tả",
              }}
              fullwidth
              style="flex-auto"
              placeholder="Vui lòng nhập tên mô tả"
            />
          </div>
          <div className="my-6">
            <h3 className="text-lg font-semibold mb-4">Nội dung chi tiết</h3>
            {watch("content")?.map((section, index) => (
              <div key={index} className="mb-4 border p-4 rounded-lg shadow-md">
                <InputForm
                  label="Tiêu đề"
                  id={`content[${index}].title`}
                  register={register}
                  errors={errors}
                  value={section.title}
                  onChange={(e) =>
                    handleContentChange(index, "title", e.target.value)
                  }
                  fullwidth
                  placeholder="Nhập tiêu đề"
                />
                <MarkDownEditer
                  value={section.body}
                  changeValue={(value) =>
                    handleContentChange(index, "body", value)
                  }
                  label="Nội dung"
                />

                <button
                  type="button"
                  className="text-red-500 hover:underline mt-2"
                  onClick={() => removeContentSection(index)}
                >
                  Xóa phần
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-2 text-blue-500 hover:underline"
              onClick={addContentSection}
            >
              Thêm phần nội dung
            </button>
          </div>

          <div className="mt-8">
            <ButtonField type="submit">Cập nhật tin tức</ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
