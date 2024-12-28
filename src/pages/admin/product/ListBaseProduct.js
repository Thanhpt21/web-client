import React, { useCallback, useEffect, useState } from "react";
import { InputForm, Pagination } from "components";
import { useForm } from "react-hook-form";
import { apiDeleteProduct, getProducts } from "apis";
import { Table, Space, Button } from "antd";
import icons from "utils/icons";
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import useDebounce from "hooks/useDebounce";
import UpdateProduct from "./UpdateProduct";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import path from "utils/path";
import { formatMoney } from "utils/helpers";
import { useSelector } from "react-redux";

import CreateCustomizeVariant from "./CreateCustomizeVariant";
import HeaderPageAdmin from "components/admin/HeaderPageAdmin";
import ListBaseRatings from "./ListBaseRatings";

const { BiEdit, AiFillDelete, LuPackagePlus } = icons;

const ListBaseProduct = () => {
  const { categories } = useSelector((state) => state?.app);

  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();

  const [params] = useSearchParams();
  const [data, setdata] = useState(null);
  const [counts, setCounts] = useState(0);
  const [valueEdit, setValueEdit] = useState(null);
  const [update, setUpdate] = useState(false);
  const [variant, setVariant] = useState(null);
  const [rating, setRating] = useState(null);

  console.log("data", data);

  const render = useCallback(() => {
    setUpdate(!update);
  });

  const handleDeleteProduct = (pid) => {
    Swal.fire({
      title: "Xóa sản phẩm",
      text: "Bạn có muốn xóa sản phẩm này?",
      icon: "warning",
      showCancelButton: true,
    }).then((rs) => {
      if (rs.isConfirmed) {
        const response = apiDeleteProduct(pid);
        if (response.success) toast.success(response.message);
        else toast.error(response.message);
        setdata(data.filter((el) => el._id !== pid));
      }
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "",
      width: 10,
      render: (item, record, index) => (
        <span>
          {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
            process.env.REACT_APP_LIMIT +
            index +
            1}
        </span>
      ),
    },
    {
      title: "ảnh",
      dataIndex: "thumb",
      render: (item, record, index) => (
        <img className="object-contain w-10" src={item} />
      ),
    },
    {
      title: "Tên/Mã sản phẩm",
      render: (item, record, index) => (
        <span className="flex flex-col gap-1">
          <span>{record?.title} / </span>
          <span>{record?.code}</span>
        </span>
      ),
    },
    {
      title: "Danh mục/Thương hiệu",
      render: (item, record, index) => (
        <span className="flex flex-col gap-1">
          <span>{record?.category?.title} / </span>
          <span>{record?.brand?.title}</span>
        </span>
      ),
    },

    {
      title: "Giá / Giá giảm",
      render: (item, record, index) => (
        <span className="flex flex-col gap-1">
          <span>{formatMoney(record?.price)}/</span>
          <span>{formatMoney(record?.discount || 0)}</span>
        </span>
      ),
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      render: (item, record) => <span>{record?.color?.title}</span>,
    },
    {
      title: "Đánh giá",
      dataIndex: "totalratings",
      render: (item, record) => (
        <button
          className="cursor-pointer hover:text-yellow-500 px-2 border border-yellow-500"
          onClick={() => setRating(record)} // Gọi hàm setRating khi click vào nút
        >
          {item} <span className="text-yellow-500">★</span>{" "}
          {/* Hiển thị sao màu vàng */}
        </button>
      ),
    },
    {
      title: "Biến thể",
      dataIndex: "variants",
      render: (item, record) => (
        <button
          className="cursor-pointer hover:text-blue-500 px-2  border border-blue-500"
          onClick={() => {
            navigate(`/${path.ADMIN}/${path.MANAGE_PRODUCT_VARIANTS}`, {
              replace: true,
              state: { ...record },
            });
          }}
        >
          {`${record?.variants?.length || 0}`}
        </button>
      ),
    },

    {
      title: "Hành động",
      align: "center",
      render: (item, record, index) => (
        <Space size="middle">
          <span
            onClick={() => setValueEdit(record)}
            className=" cursor-pointer"
          >
            <BiEdit color="orange" size={20} />
          </span>
          <span
            onClick={() => handleDeleteProduct(record._id)}
            className="cursor-pointer "
          >
            <AiFillDelete color="red" size={20} />
          </span>
          <span onClick={() => setVariant(record)} className="cursor-pointer ">
            <LuPackagePlus color="blue" size={20} />
          </span>
        </Space>
      ),
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const handleOnChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const cateId = categories?.find(
    (item) => item.title === selectedCategory
  )?._id;

  const fetchProduct = async (params) => {
    const response = await getProducts({
      category: cateId,
      ...params,
      limit: +process.env.REACT_APP_LIMIT,
    });

    if (response.success) {
      setdata(response.products);
      setCounts(response.counts);
    }
  };

  const queriesDebounce = useDebounce(watch("q"), 800);
  useEffect(() => {
    if (queriesDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queriesDebounce }).toString(),
      });
    } else {
      navigate({
        pathname: location.pathname,
      });
    }
  }, [queriesDebounce]);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);

    fetchProduct(queries);
  }, [params, update, cateId]);

  // const newData = data.map((product) => {
  //   if (product.ratings.length === 0) {
  //     // Nếu ratings là mảng rỗng, gán totalratings = 0
  //     product.totalratings = 0;
  //   } else {
  //     // Nếu ratings có giá trị, tính trung bình sao (star)
  //     let totalStars = 0;
  //     // Cộng dồn giá trị sao của mỗi đánh giá trong ratings
  //     for (let i = 0; i < product.ratings.length; i++) {
  //       totalStars += product.ratings[i].star;
  //     }
  //     // Tính trung bình sao
  //     product.totalratings = totalStars / product.ratings.length;
  //   }
  // });

  // In ra kết quả để kiểm tra
  //console.log("newData", newData);

  return (
    <div className="w-full flex flex-col gap-4 relative">
      {valueEdit && (
        <div className="absolute inset-0 min-h-screen z-20 bg-white">
          <UpdateProduct
            valueEdit={valueEdit}
            render={render}
            setValueEdit={setValueEdit}
          />
        </div>
      )}
      {variant && (
        <div className="absolute inset-0 min-h-screen z-20 bg-white">
          <CreateCustomizeVariant
            variant={variant}
            render={render}
            setVariant={setVariant}
          />
        </div>
      )}

      {rating && (
        <div className="absolute inset-0 min-h-screen z-20 bg-white">
          <ListBaseRatings
            pid={rating._id}
            rating={rating}
            render={render}
            setRating={setRating}
          />
        </div>
      )}
      <HeaderPageAdmin title={"Danh sách"} />
      <div className="">
        <div className="flex w-full justify-between items-center py-4">
          {/* Phần bên trái chứa select và input tìm kiếm */}
          <div className="flex w-[70%] gap-4">
            {/* Input tìm kiếm */}
            <form className="w-full">
              <InputForm
                id="q"
                register={register}
                errors={errors}
                fullwidth
                italic
                placeholder="Tìm sản phẩm"
              />
            </form>
            {/* Dropdown Select */}
            <div className="w-full">
              <select
                value={selectedCategory}
                onChange={(e) => handleOnChange(e)}
                className="form-select text-sm"
              >
                <option value="">Tất cả</option>
                {categories?.map((el) => (
                  <option key={el._id} value={el.title}>
                    {el.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Nút Thêm mới nằm bên phải */}
          <Button
            type="primary"
            className="ml-auto flex items-center" // Sử dụng ml-auto để đẩy nút ra ngoài bên phải
            onClick={() => {
              navigate(`/${path.ADMIN}/${path.CREATE_PRODUCT}`);
            }}
          >
            Thêm mới
          </Button>
        </div>
        <Table dataSource={data} columns={columns} pagination={false} />
        <div>
          <Pagination totalCount={counts} />
        </div>
      </div>
    </div>
  );
};

export default ListBaseProduct;
