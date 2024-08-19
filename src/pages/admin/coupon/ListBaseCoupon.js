import React, { useCallback, useEffect, useState } from "react";
import { InputForm, Modal, ModalQR, Pagination, Qrcode } from "components";
import { useForm } from "react-hook-form";
import { apiDeleteProduct } from "apis";
import { Table, Space, Tag } from "antd";
import moment from "moment";
import icons from "utils/icons";
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import useDebounce from "hooks/useDebounce";

import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { apiDeleteColor, apigetColors } from "apis/color";
import UpdateCoupon from "./UpdateCoupon";
import { apiDeleteCoupon, apigetCoupons } from "apis/coupon";
import withBase from "hocs/withBase";
import { showModal } from "store/app/appSlice";
import { IoQrCodeOutline } from "react-icons/io5";
import { formatMoney } from "utils/helpers";

const { BiEdit, AiFillDelete, LuPackagePlus } = icons;

const ListBaseCoupon = ({ dispatch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const [params] = useSearchParams();
  const [data, setdata] = useState(null);
  const [counts, setCounts] = useState(0);
  const [valueEdit, setValueEdit] = useState(null);
  const [update, setUpdate] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hàm mở modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const render = useCallback(() => {
    setUpdate(!update);
  });

  const handleDeleteCoupon = (cid) => {
    Swal.fire({
      title: "Xóa mã giảm giá",
      text: "Bạn có muốn xóa mã giảm giá này?",
      icon: "warning",
      showCancelButton: true,
    }).then((rs) => {
      if (rs.isConfirmed) {
        const response = apiDeleteCoupon(cid);
        if (response.success) toast.success(response.message);
        else toast.error(response.message);
        setdata(data.filter((el) => el._id !== cid));
      }
    });
    fetchCoupon();
    render();
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
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Giới hạn",
      dataIndex: "usageLimit",
    },
    {
      title: "Đã sử dụng",
      dataIndex: "usedCount",
    },
    {
      title: "Giá tối thiểu",
      dataIndex: "minPrice",
      render: (item) => {
        return <span>{formatMoney(item) + "đ"}</span>;
      },
    },
    {
      title: "Giá giảm",
      dataIndex: "discount",
      render: (item) => {
        return <Tag color="success">{formatMoney(item) + "đ"}</Tag>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (item) => {
        return moment(item).format("DD/MM/YYYY");
      },
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expiry",
      render: (item) => {
        return moment(item).format("DD/MM/YYYY");
      },
    },
    {
      title: "Hành động",
      align: "center",
      width: 150,
      render: (item, record, index) => (
        <Space size="middle">
          <span
            onClick={() => setValueEdit(record)}
            className=" cursor-pointer"
          >
            <BiEdit color="orange" size={20} />
          </span>
          <span
            onClick={() => handleDeleteCoupon(record._id)}
            className="cursor-pointer "
          >
            <AiFillDelete color="red" size={20} />
          </span>
          <span onClick={handleOpenModal} className="cursor-pointer ">
            <IoQrCodeOutline size={20} />
          </span>
          <ModalQR
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            value={record?.name}
          ></ModalQR>
        </Space>
      ),
    },
  ];

  const fetchCoupon = async (params) => {
    const response = await apigetCoupons({
      ...params,
      limit: +process.env.REACT_APP_LIMIT,
    });
    if (response.success) {
      setdata(response.coupons);
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

    fetchCoupon(queries);
  }, [params, update]);

  return (
    <div className="w-full flex flex-col gap-4 relative">
      {valueEdit && (
        <div className="absolute inset-0 min-h-screen z-20 bg-white">
          <UpdateCoupon
            valueEdit={valueEdit}
            render={render}
            setValueEdit={setValueEdit}
          />
        </div>
      )}

      <h1 className="h-[75px] flex justify-between items-center text-xl px-4 border-b ">
        <span>Quản lý mã giảm giá</span>
      </h1>
      <div className="">
        <div className="flex w-full justify-end items-center py-4">
          <form className="w-[40%]">
            <InputForm
              id="q"
              register={register}
              errors={errors}
              fullwidth
              placeholder="Tìm kiếm"
            />
          </form>
        </div>
        <Table dataSource={data} columns={columns} pagination={false} />

        <div className="">
          <Pagination totalCount={counts} />
        </div>
      </div>
    </div>
  );
};

export default withBase(ListBaseCoupon);
