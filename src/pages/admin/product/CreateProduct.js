import React, { useCallback, useEffect, useState } from "react";
import {
  InputForm,
  SelectField,
  ButtonField,
  MarkDownEditer,
  Loading,
} from "components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { validate, getBase64 } from "utils/helpers";
import { toast } from "react-toastify";
import { FaRegTrashCan } from "react-icons/fa6";
import { apiCreateProduct, apigetCategories } from "apis";
import { showModal } from "store/app/appSlice";
import { getColor } from "store/product/productActions";
import withBase from "hocs/withBase";
import { statusProduct } from "utils/contants";
import { FaTrash } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";

const CreateProduct = ({ dispatch }) => {
  const { categories } = useSelector((state) => state?.app);

  const { colors } = useSelector((state) => state?.product);
  let arrayColors = colors?.map((obj) => ({
    title: obj.title,
    _id: obj._id,
  }));

  useEffect(() => {
    dispatch(getColor());
    fetchCategory();
  }, []);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      discount: 0, // Thiết lập giá trị mặc định cho form
    },
  });

  const [dataCate, setDataCate] = useState(null);
  const [payload, setpayload] = useState({
    description: "",
  });
  const [invalidField, setinvalidField] = useState([]);

  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });
  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };
  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg"
      ) {
        toast.warning("File không đúng định dạng");
        return;
      }
      const base64 = await getBase64(file);
      imagesPreview.push({ name: file.name, path: base64 });
    }
    if (imagesPreview.length > 0) {
      setPreview((prev) => ({ ...prev, images: imagesPreview }));
    }
  };
  useEffect(() => {
    handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    handlePreviewImages(watch("images"));
  }, [watch("images")]);

  const changeValue = useCallback((newDescription) => {
    // Chuyển đổi mảng ký tự thành chuỗi
    const descriptionString = Array.isArray(newDescription)
      ? newDescription.join("")
      : newDescription;
    setpayload((prev) => ({
      ...prev,
      description: descriptionString,
    }));
  }, []);

  const handleCreateProduct = async (data) => {
    const invalid = validate(payload, setinvalidField);
    if (invalid === 0) {
      const tagsString = tags.join(",");
      // Khai báo finalPayload trước khi sử dụng nó
      const finalPayload = { ...data, ...payload, tags: tagsString };

      // Tạo FormData và append dữ liệu vào
      const formData = new FormData();

      // Duyệt qua các entry của finalPayload để thêm dữ liệu vào FormData
      for (let [key, value] of Object.entries(finalPayload)) {
        // Kiểm tra các trường đặc biệt và xử lý riêng
        switch (key) {
          case "thumb":
            if (
              watch("thumb") instanceof FileList &&
              watch("thumb").length > 0
            ) {
              formData.append("thumb", watch("thumb")[0]);
            } else if (
              typeof value === "string" &&
              value.startsWith("data:image")
            ) {
              // Nếu thumb là một base64 image (dùng cho trường hợp có xử lý trước đó)
              formData.append("thumb", value);
            }
            break;
          case "images":
            if (value && value.length > 0) {
              for (let image of value) {
                formData.append("images", image);
              }
            }
            break;
          case "tags":
            formData.append("tags", value); // tags đã là chuỗi ngăn cách bởi dấu phẩy
            break;
          default:
            formData.append(key, value);
            break;
        }
      }

      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiCreateProduct(formData);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));

      // Xử lý kết quả từ API
      if (response.success) {
        toast.success(response.message);
        reset();
        setpayload({
          description: "",
        });
        setPreview({
          thumb: null,
          images: [],
        });
        setTags([]);
      } else {
        toast.error(response.message);
      }
    }
  };

  const [disabled, setDisabled] = useState(true);
  const [watchcat, setWatchcat] = useState(null);

  const handleChangeCat = (e) => {
    setDisabled(false);
    setWatchcat(e.target.value);
  };

  const fetchCategory = async () => {
    const response = await apigetCategories();
    if (response.success) {
      setDataCate(response.categorys);
    }
  };

  //tags
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTag, setEditedTag] = useState("");

  const handleAddTag = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của nút bấm
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleDeleteTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const handleEditTag = (index, e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của nút bấm
    setEditingIndex(index);
    setEditedTag(tags[index]);
  };

  const handleUpdateTag = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của nút bấm
    if (editedTag.trim()) {
      const newTags = tags.map((tag, i) =>
        i === editingIndex ? editedTag.trim() : tag
      );
      setTags(newTags);
      setEditingIndex(null);
      setEditedTag("");
    }
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <h1 className="h-[75px] flex justify-between items-center text-xl px-4 border-b">
        <span>Tạo sản phẩm</span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateProduct)}>
          <div className="flex flex-col gap-2 ">
            <label className="" htmlFor="thumb">
              Upload ảnh sản phẩm chính
            </label>
            <input
              className="w-fit"
              type="file"
              id="thumb"
              {...register("thumb", { required: "Vui lòng chọn ảnh chính" })}
            />
            {errors["thumb"] && (
              <small className="text-xs text-red-500">
                {errors["thumb"]?.message}
              </small>
            )}
          </div>
          {preview.thumb && (
            <div className="my-4">
              <img
                className="w-[100px] object-contain"
                src={preview.thumb}
                alt="thumb"
              />
            </div>
          )}

          <div className="flex flex-col gap-2 mt-8">
            <label className="" htmlFor="images">
              Upload các ảnh sản phẩm phụ
            </label>
            <input
              className="w-fit"
              type="file"
              id="images"
              multiple
              {...register("images", {
                required: "Vui lòng chọn các ảnh phụ khác",
              })}
            />
            {errors["images"] && (
              <small className="text-xs text-red-500">
                {errors["images"]?.message}
              </small>
            )}
          </div>
          {preview.images.length > 0 && (
            <div className="my-4 flex w-full gap-3 flex-wrap">
              {preview.images.map((el, index) => (
                <div key={index} className="w-fit relative group">
                  <img
                    className="w-[100px] object-contain"
                    src={el.path}
                    alt="images"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Tên sản phẩm"}
              register={register}
              errors={errors}
              id="title"
              style="flex-auto"
              validate={{
                required: "Vui lòng nhập tên sản phẩm",
              }}
              fullwidth
              placeholder="Nhập tên sản phẩm"
            />
            <InputForm
              label={"Mã sản phẩm"}
              register={register}
              errors={errors}
              id="code"
              style="flex-auto"
              validate={{
                required: "Vui lòng nhập mã sản phẩm",
              }}
              fullwidth
              placeholder="Nhập mã sản phẩm"
            />
          </div>
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Giá"}
              register={register}
              errors={errors}
              id="price"
              validate={{
                required: "Vui lòng nhập giá",
              }}
              style="flex-auto"
              fullwidth
              placeholder="Nhập giá"
              type="number"
            />
            <InputForm
              label={"Giá giảm"}
              register={register}
              errors={errors}
              id="discount"
              style="flex-auto"
              fullwidth
              placeholder="Nhập giá giảm"
              type="number"
            />
          </div>
          <div className="w-full my-6 flex gap-4">
            <SelectField
              label={"Tình trạng"}
              register={register}
              errors={errors}
              options={statusProduct?.map((el) => ({
                code: el.code,
                value: el.value,
              }))}
              id="status"
              validate={{
                required: "Vui lòng chọn tình trạng",
              }}
              style="flex-1"
              placeholder="Vui lòng chọn tình trạng"
              fullwidth
            />
            <SelectField
              label="Màu"
              options={arrayColors?.map((el) => ({
                code: el._id,
                value: el.title,
              }))}
              register={register}
              style="flex-1"
              id="color"
              validate={{ required: "Vui lòng chọn màu" }}
              errors={errors}
              fullwidth
            />
          </div>
          <div className="w-full my-6 flex gap-4">
            <SelectField
              handleChange={(e) => handleChangeCat(e)}
              label="Danh mục"
              options={categories?.map((el) => ({
                code: el._id,
                value: el.title,
              }))}
              register={register}
              style="flex-1"
              id="category"
              validate={{ required: "Vui lòng chọn danh mục" }}
              errors={errors}
              fullwidth
            />
            <SelectField
              label="Thương hiệu"
              options={
                dataCate
                  ?.find((el) => el._id === watchcat)
                  ?.brands?.map((b) => ({
                    code: b._id,
                    value: b.title,
                  })) || []
              } // Cung cấp mảng trống nếu không có thương hiệu
              register={register}
              style="flex-1"
              id="brand"
              validate={{ required: "Vui lòng chọn thương hiệu" }}
              errors={errors}
              fullwidth
              disabled={disabled}
            />
          </div>

          <div className="flex items-center mb-4 w-fit">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border border-gray-300 p-2 rounded-md flex-1"
              placeholder="Nhập tag..."
            />
            <button
              onClick={handleAddTag}
              className="bg-blue-500 text-white p-2 rounded-sm ml-2"
            >
              Thêm
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 px-2 py-1 rounded-md"
              >
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedTag}
                    onChange={(e) => setEditedTag(e.target.value)}
                    className="border border-gray-300 bg-transparent w-32 text-center rounded-md"
                  />
                ) : (
                  <span className="text-center w-32">{tag}</span>
                )}
                <button
                  onClick={(e) =>
                    editingIndex === index
                      ? handleUpdateTag(e)
                      : handleEditTag(index, e)
                  }
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  {editingIndex === index ? "Lưu" : <BiEdit size={20} />}
                </button>
                <button
                  onClick={() => handleDeleteTag(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          <MarkDownEditer
            name="description"
            changeValue={changeValue}
            label="Mô tả"
            invalidField={invalidField}
            setInvalidField={setinvalidField}
          />

          <div className="mt-8">
            <ButtonField type="submit">Tạo sản phẩm</ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withBase(CreateProduct);
