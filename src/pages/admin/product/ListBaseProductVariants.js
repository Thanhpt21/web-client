import React, { useCallback, useEffect, useState } from "react";
import { CustomizeVariant, InputForm, Pagination } from "components";
import { useForm } from "react-hook-form";
import {
  apiDeleteProduct,
  apiDeleteProductVariant,
  getProduct,
  getProducts,
} from "apis";
import { Table, Space } from "antd";
import moment from "moment";
import icons from "utils/icons";
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import useDebounce from "hooks/useDebounce";
import UpdateProduct from "./UpdateProduct";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import withBase from "hocs/withBase";
import path from "utils/path";
import { formatMoney } from "utils/helpers";
import UpdateCustomizeVariant from "./UpdateCustomizeVariant";

const { BiEdit, AiFillDelete, LuPackagePlus } = icons;

const ListBaseProductVariants = ({ location, navigate }) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const [params] = useSearchParams();

  const [data, setdata] = useState(null);
  // const [counts, setCounts] = useState(0);
  const [valueEdit, setValueEdit] = useState(null);
  const [update, setUpdate] = useState(false);
  // const [variant, setVariant] = useState(null);

  const render = useCallback(() => {
    setUpdate(!update);
  });

  const handleDeleteProductVariant = (pid, sku) => {
    Swal.fire({
      title: "Xóa sản phẩm biến thể",
      text: "Bạn có muốn xóa biến thể này?",
      icon: "warning",
      showCancelButton: true,
    }).then((rs) => {
      if (rs.isConfirmed) {
        const response = apiDeleteProductVariant(pid, sku);
        if (response.success) toast.success(response.message);
        else toast.error(response.message);
        setdata(data.filter((el) => el.sku !== sku));
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
      title: "Tên",
      dataIndex: "title",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (item, record, index) => (
        <span>{formatMoney(record?.price) + "đ"}</span>
      ),
    },
    {
      title: "Giá giảm",
      dataIndex: "discount",
      render: (item, record, index) => (
        <span>{formatMoney(record?.discount || 0) + "đ"}</span>
      ),
    },

    {
      title: "Màu sắc",
      dataIndex: "color",
      render: (item, record, index) => <span>{record?.color?.title}</span>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (item) => {
        return moment(item).format("DD/MM/YYYY");
      },
    },
    {
      title: "Hành động",
      align: "center",
      render: (item, record, index) => {
        return (
          <Space size="middle">
            <span
              onClick={() => setValueEdit(record, location.state._id)}
              className=" cursor-pointer"
            >
              <BiEdit color="orange" size={20} />
            </span>
            <span
              onClick={() =>
                handleDeleteProductVariant(location.state._id, record.sku)
              }
              className="cursor-pointer "
            >
              <AiFillDelete color="red" size={20} />
            </span>
          </Space>
        );
      },
    },
  ];
  const fetchProduct = async () => {
    const response = await getProduct(location.state._id);
    if (response.success) {
      setdata(response?.productData?.variants);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [update]);

  return (
    <div className="w-full flex flex-col gap-4 relative">
      {valueEdit && (
        <div className="absolute inset-0 min-h-screen z-20 bg-white">
          <UpdateCustomizeVariant
            valueEdit={valueEdit}
            render={render}
            setValueEdit={setValueEdit}
          />
        </div>
      )}
      <h1 className="h-[75px] flex justify-between items-center px-4 border-b ">
        <span className="flex gap-2">
          <button
            className="hover:underline hover:text-blue-500"
            onClick={() => {
              navigate(`/${path.ADMIN}/${path.MANAGE_PRODUCT}`);
            }}
          >
            {location.state.title}
          </button>
          /<span>Biến thể</span>
        </span>
      </h1>
      <div className="px-4">
        <Table dataSource={data} columns={columns} pagination={false} />
      </div>
    </div>
  );
};

export default withBase(ListBaseProductVariants);
