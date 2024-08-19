import React, { useEffect, useState } from "react";
import {
  InputForm,
  SelectField,
  ButtonField,
  MarkDownEditer,
  Loading,
  TextAreaForm,
} from "components";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { apiCreateBlog, apiUpdateBlog } from "apis/blog";
import { showModal } from "store/app/appSlice";
import { getBase64 } from "utils/helpers";

const CreateBlog = ({ valueEdit, isUpdateMode }) => {
  const { blogCategories } = useSelector((state) => state?.app);

  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      images: isUpdateMode ? valueEdit?.images || null : null,
      content: isUpdateMode
        ? valueEdit?.content || [{ title: "", body: "" }]
        : [{ title: "", body: "" }],
    },
  });

  const [preview, setPreview] = useState({
    images: isUpdateMode ? valueEdit?.images || null : null,
  });

  useEffect(() => {
    if (isUpdateMode) {
      reset({
        images: valueEdit?.images || null,
        content: valueEdit?.content || [{ title: "", body: "" }],
      });
      setPreview({ images: valueEdit?.images || null });
    } else {
      reset({
        images: null,
        content: [{ title: "", body: "" }],
      });
      setPreview({ images: null });
    }
  }, [isUpdateMode, valueEdit, reset]);

  const handlePreview = async (file) => {
    const base64 = await getBase64(file);
    setPreview((prev) => ({ ...prev, images: base64 }));
  };

  useEffect(() => {
    const images = watch("images");
    if (images && images.length > 0) {
      handlePreview(images[0]);
    }
  }, [watch("images")]);

  const handleCreateOrUpdateBlog = async (data) => {
    if (data.category) {
      data.category = blogCategories?.find(
        (el) => el._id === data.category
      )?._id;
    }

    const formData = new FormData();

    if (data.images) {
      formData.append("images", data.images[0]);
    }

    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("description", data.description);

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

    let response;
    if (isUpdateMode) {
      response = await apiUpdateBlog(formData, valueEdit?._id);
    } else {
      response = await apiCreateBlog(formData);
    }

    dispatch(showModal({ isShowModal: false, modalChildren: null }));

    if (response.success) {
      toast.success(response.message);
      reset({
        images: null,
        content: [{ title: "", body: "" }],
      });
      setPreview({ images: null });
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
    <div className="w-full bg-white min-h-screen">
      <h1 className="h-[75px] flex justify-between items-center text-xl px-4 border-b">
        <span>{isUpdateMode ? "Chỉnh sửa tin tức" : "Tạo tin tức"}</span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateOrUpdateBlog)}>
          <div className="flex flex-col gap-2">
            <label className="" htmlFor="images">
              Upload ảnh tin tức
            </label>
            <input
              className="w-fit"
              type="file"
              id="images"
              {...register("images", { required: "Vui lòng chọn ảnh" })}
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
              style="flex-auto"
              placeholder="Vui lòng nhập tên tin tức"
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
                  validate={{
                    required: "Vui lòng nhập Tiêu đề",
                  }}
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
            <ButtonField type="submit">
              {isUpdateMode ? "Cập nhật" : "Tạo tin tức"}
            </ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
