import React, { memo, useState, useEffect, useCallback } from "react";
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

import { showModal } from "store/app/appSlice";
import {
  apigetAllCategories,
  apigetAllSizes,
  apigetCategories,
  apiUpdateProduct,
} from "apis";
import { getColor } from "store/product/productActions";
import { statusProduct } from "utils/contants";
import { BiEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { apigetAllBrands } from "apis/brand";
import HeaderWithCancelButton from "components/admin/HeaderWithCancelButton";

const UpdateProduct = ({ valueEdit, render, setValueEdit }) => {
  const { colors } = useSelector((state) => state?.product);
  const [dataCate, setDataCate] = useState(null);
  const [dataBrand, setDataBrand] = useState([]);
  const [dataSize, setDataSize] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [watchcat, setWatchcat] = useState(null);

  const fetchSize = async () => {
    const response = await apigetAllSizes();
    if (response.success) {
      setDataSize(response.sizes);
    }
  };

  const fetchCategory = async () => {
    const response = await apigetAllCategories();
    if (response.success) {
      setDataCate(response.categoryData);
    }
  };

  let arrayColors = colors?.map((obj) => ({
    title: obj.title,
    _id: obj._id,
  }));

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
      discount: 0, // Thiết lập giá trị mặc định cho form
      size: valueEdit?.size || [],
    },
  });

  useEffect(() => {
    dispatch(getColor());
    fetchCategory();
    fetchSize();
  }, []);

  useEffect(() => {
    if (watchcat) {
      fetchBrandsByCategory(watchcat); // Khi categoryId thay đổi, gọi API lấy thương hiệu
    }
  }, [watchcat]);

  const handleChangeCat = (e) => {
    // setDisabled(false);
    setWatchcat(e.target.value);
  };

  const fetchBrandsByCategory = async (categoryId) => {
    // Gọi API để lấy danh sách thương hiệu của categoryId
    const response = await apigetAllBrands({ categoryId });
    if (response.success) {
      const filteredBrands = response.brandData.filter((brand) => {
        return brand.category === categoryId; // So sánh category với categoryId
      });

      setDataBrand(filteredBrands); // Cập nhật danh sách thương hiệu đã lọc
    }
  };
  useEffect(() => {
    if (valueEdit) {
      setValue("category", valueEdit?.category?._id || "");
      setWatchcat(valueEdit?.category?._id || ""); // Lưu id của category đang được chọn
      fetchBrandsByCategory(valueEdit?.category?._id);
      reset({
        category: valueEdit?.category?._id || "",
        title: valueEdit.title || "",
        code: valueEdit.code || "",
        price: valueEdit.price || 0,
        discount: valueEdit.discount || 0,
        color: valueEdit?.color?._id || "",
        status: valueEdit.status || "",
        tags: valueEdit.tags || [],
      });

      setTimeout(() => {
        reset({
          brand: valueEdit?.brand?._id || "",
        });
      }, 100);

      setpayload({
        description: valueEdit.description || "",
      });
      setPreview({
        thumb: valueEdit.thumb || "",
        images: valueEdit.images || [],
      });
      setTags(valueEdit.tags || []);
      setSelectedSizes(valueEdit.size || []);
    }
  }, [valueEdit, reset, setValue]);

  const [invalidField, setinvalidField] = useState([]);
  const [payload, setpayload] = useState({
    description: "",
  });
  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });
  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };

  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0)
      handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

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
      imagesPreview.push(base64);
    }

    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0) {
      handlePreviewImages(watch("images"));
    }
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

  const handleUpdateProduct = async (data) => {
    const invalid = validate(payload, setinvalidField);
    if (invalid === 0) {
      // Khai báo finalPayload trước khi sử dụng nó
      const finalPayload = { ...data, ...payload, tags };

      // Tạo FormData và append dữ liệu vào theo thứ tự mong muốn
      let formData = new FormData();

      // Duyệt qua các entry của finalPayload để thêm dữ liệu vào FormData
      for (let [key, value] of Object.entries(finalPayload)) {
        // Kiểm tra các trường đặc biệt và xử lý riêng
        switch (key) {
          case "category":
            formData.append("category", value);
            break;
          case "thumb":
            if (value && value.length > 0) {
              formData.append("thumb", value[0]);
            } else {
              formData.append("thumb", preview.thumb);
            }
            break;
          case "images":
            if (value && value.length > 0) {
              for (let image of value) {
                formData.append("images", image);
              }
            } else {
              // Nếu không có giá trị mới, sử dụng giá trị cũ từ preview
              preview.images.forEach((image) =>
                formData.append("images", image)
              );
            }
            break;
          case "tags":
            formData.append("tags", value.join(",")); // Join tags with comma
            break;
          case "size":
            if (selectedSizes.length > 0) {
              selectedSizes.forEach((size) => formData.append("size", size));
            }
            break;
          default:
            formData.append(key, value);
            break;
        }
      }

      // Gọi API để cập nhật sản phẩm
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiUpdateProduct(formData, valueEdit._id);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));

      // Xử lý kết quả từ API
      if (response.success) {
        toast.success(response.message);
        render();
        setValueEdit(null);
      } else {
        toast.error(response.message);
      }
    }
  };

  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTag, setEditedTag] = useState("");

  const handleAddTag = (e) => {
    e.preventDefault();
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
    e.preventDefault();
    setEditingIndex(index);
    setEditedTag(tags[index]);
  };

  const handleUpdateTag = (e) => {
    e.preventDefault();
    if (editedTag.trim()) {
      const newTags = tags.map((tag, i) =>
        i === editingIndex ? editedTag.trim() : tag
      );
      setTags(newTags);
      setEditingIndex(null);
      setEditedTag("");
    }
  };

  const handleSizeChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    setSelectedSizes((prevSelectedSizes) => {
      if (checked) {
        // Nếu checkbox được chọn, thêm giá trị vào mảng
        return [...prevSelectedSizes, value];
      } else {
        // Nếu checkbox bị bỏ chọn, loại bỏ giá trị khỏi mảng
        return prevSelectedSizes.filter((size) => size !== value);
      }
    });
  };

  useEffect(() => {
    // Cập nhật giá trị `size` trong form mỗi khi `selectedSizes` thay đổi
    setValue("size", selectedSizes);
  }, [selectedSizes, setValue]);

  return (
    <div className="w-full ">
      <HeaderWithCancelButton
        title={"Cập nhật sản phẩm"}
        setValueEdit={setValueEdit}
      />

      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <div className="flex flex-col gap-2 ">
            <label className="" htmlFor="thumb">
              Upload ảnh sản phẩm chính
            </label>
            <input
              className="w-fit"
              type="file"
              id="thumb"
              {...register("thumb")}
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
              {...register("images")}
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
                    src={el}
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
              placeholder="Vui lòng nhập giá"
              type="number"
            />
            <InputForm
              label={"Giá giảm"}
              register={register}
              errors={errors}
              id="discount"
              defaultValue={0}
              style="flex-auto"
              fullwidth
              placeholder="Vui lòng nhập giá giảm"
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
              style="flex-auto"
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
              style="flex-auto"
              id="color"
              validate={{ required: "Vui lòng chọn màu" }}
              errors={errors}
              fullwidth
            />
          </div>
          <div className="w-full my-6 flex gap-4">
            <SelectField
              label="Danh mục"
              options={dataCate?.map((el) => ({
                code: el._id,
                value: el.title,
              }))}
              register={register}
              style="flex-1"
              id="category"
              validate={{ required: "Vui lòng chọn danh mục" }}
              errors={errors}
              fullwidth
              value={watch("category")}
              handleChange={(e) => {
                handleChangeCat(e);
                setValue("category", e.target.value);
              }}
            />
            <SelectField
              label="Thương hiệu"
              options={dataBrand?.map((el) => ({
                code: el._id,
                value: el.title,
              }))}
              register={register}
              style="flex-1"
              id="brand"
              validate={{ required: "Vui lòng chọn thương hiệu" }}
              errors={errors}
              fullwidth
            />
          </div>
          <div className="my-4">
            <label>Kích cỡ</label>
            <div className="mt-2 flex flex-wrap gap-4">
              {dataSize?.map((size) => (
                <div key={size._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`size-${size._id}`}
                    value={size._id}
                    {...register("size")}
                    checked={selectedSizes.includes(size._id)} // Kiểm tra nếu giá trị có trong selectedSizes
                    onChange={handleSizeChange} // Xử lý sự thay đổi của checkbox
                  />
                  <label
                    htmlFor={`size-${size._id}`}
                    className="text-sm text-gray-600"
                  >
                    {size.title}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label>Tag</label>
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
            value={payload.description || ""}
          />

          <div className="mt-8">
            <ButtonField type="submit">Cập nhật sản phẩm</ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(UpdateProduct);
