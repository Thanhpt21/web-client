import React, { useCallback, useEffect, useState } from "react";
import { InputForm, Pagination } from "components";
import { useForm } from "react-hook-form";
import { Table, Space } from "antd";
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
import UpdateShip from "./UpdateRetail";
import { apiDeleteRetail, apigetRetails } from "apis";

const { BiEdit, AiFillDelete } = icons;

const ListBaseRetail = () => {
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

  const render = useCallback(() => {
    setUpdate(!update);
  });

  const handleDeleteRetail = (rid) => {
    Swal.fire({
      title: "Xóa chi nhánh này",
      text: "Bạn có muốn xóa chi nhánh này?",
      icon: "warning",
      showCancelButton: true,
    }).then((rs) => {
      if (rs.isConfirmed) {
        const response = apiDeleteRetail(rid);
        if (response.success) toast.success(response.message);
        else toast.error(response.message);
        setdata(data.filter((el) => el._id !== rid));
      }
    });
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
      title: "Tên chi nhánh",
      dataIndex: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "mobile",
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
            onClick={() => handleDeleteRetail(record._id)}
            className="cursor-pointer "
          >
            <AiFillDelete color="red" size={20} />
          </span>
        </Space>
      ),
    },
  ];

  const fetchRetail = async (params) => {
    const response = await apigetRetails({
      ...params,
      limit: +process.env.REACT_APP_LIMIT,
    });
    if (response.success) {
      setdata(response.retails);
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

    fetchRetail(queries);
  }, [params, update]);

  return (
    <div className="w-full flex flex-col gap-4 relative">
      {valueEdit && (
        <div className="absolute inset-0 min-h-screen z-20 bg-white">
          <UpdateShip
            valueEdit={valueEdit}
            render={render}
            setValueEdit={setValueEdit}
          />
        </div>
      )}

      <h1 className="h-[75px] flex justify-between items-center text-xl px-4 border-b ">
        <span>Quản lý chi nhánh</span>
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

export default ListBaseRetail;
