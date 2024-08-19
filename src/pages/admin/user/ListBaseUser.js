import React, { useCallback, useEffect, useState } from "react";
import { apiDeleteUser, apiGetUsers } from "apis/user";
import { Table, Space } from "antd";

import noImg from "../../../assets/no-image.png";
import { block, roles } from "utils/contants";
import moment from "moment";

import { InputField, Pagination, InputForm, SelectField } from "components";
import useDebounce from "hooks/useDebounce";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import icons from "utils/icons";
import Swal from "sweetalert2";
import UpdateUser from "./UpdateUser";
import { toast } from "react-toastify";
import withBase from "hocs/withBase";
const { BiEdit, AiFillDelete } = icons;

const ListBaseUser = ({ navigate, location }) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    email: "",
    firstname: "",
    lastname: "",
    role: "",
    phone: "",
    status: "",
  });
  const [valueEdit, setValueEdit] = useState(null);
  const [update, setUpdate] = useState(false);
  const [counts, setCounts] = useState(0);

  const render = useCallback(() => {
    setUpdate(!update);
  });

  const columns = [
    {
      title: "STT",
      dataIndex: "",
      width: 10,
      render: (item, record, index) => <>{index + 1}</>,
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      width: 15,
      render: (item, record, index) => (
        <img
          className="w-10 h-10"
          src={record.avatar ? record.avatar : noImg}
        />
      ),
    },
    {
      title: "Họ",
      dataIndex: "firstname",
      render: (item, record, index) => <div>{record.firstname}</div>,
    },
    {
      title: "Tên",
      dataIndex: "lastname",
      render: (item, record, index) => <div>{record.lastname}</div>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (item, record, index) => <div>{record.email}</div>,
    },
    {
      title: "SDT",
      dataIndex: "mobile",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      render: (item, record, index) => (
        <div>{roles.find((r) => r.code === +item)?.value}</div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "isBlocked",
      render: (item, record, index) => (
        <div>{block.find((r) => r.code === +item)?.value}</div>
      ),
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
      render: (item, record, index) => (
        <Space size="middle">
          <span
            onClick={() => setValueEdit(record)}
            className=" cursor-pointer"
          >
            <BiEdit color="orange" size={20} />
          </span>
          <span
            onClick={() => handleDeleteUser(record._id)}
            className="cursor-pointer "
          >
            <AiFillDelete color="red" size={20} />
          </span>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState([]);

  const [params] = useSearchParams();
  const fetchUsers = async (params) => {
    const response = await apiGetUsers({
      ...params,
      limit: +process.env.REACT_APP_LIMIT || 2,
    });
    if (response.success) {
      setData(response.users);
      setCounts(response.counts);
    }
  };

  const handleDeleteUser = (uid) => {
    Swal.fire({
      title: "Xóa tài khoản",
      text: "Bạn có muốn xóa tài khoản này?",
      icon: "warning",
      showCancelButton: true,
    }).then((rs) => {
      if (rs.isConfirmed) {
        const response = apiDeleteUser(uid);
        if (response.success) toast.success(response.message);
        else toast.error(response.message);
        setData(data.filter((el) => el._id !== uid));
      }
    });
  };

  // const [queries, setQueries] = useState({
  //   q: "",
  // });
  // const queriesDebounce = useDebounce(queries.q, 800);
  // useEffect(() => {
  //   const queries = Object.fromEntries([...params]);

  //   if (queriesDebounce) {
  //     queries.q = queriesDebounce;
  //   }
  //   fetchUsers(queries);
  // }, [queriesDebounce, params, update]);

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

    fetchUsers(queries);
  }, [params, update]);

  return (
    <div className="w-full flex flex-col gap-4 relative">
      {valueEdit && (
        <div className="absolute inset-0 min-h-screen z-20 bg-white">
          <UpdateUser
            valueEdit={valueEdit}
            render={render}
            setValueEdit={setValueEdit}
          />
        </div>
      )}
      <h1 className="h-[75px] flex justify-between items-center text-xl px-4 border-b">
        <span>Quản lý người dùng</span>
      </h1>
      <div className="px-4 mt-4">
        <div className="flex w-full justify-end items-center py-4">
          <form className="w-[30%]">
            <InputForm
              id="q"
              register={register}
              errors={errors}
              fullwidth
              italic
              placeholder="Tìm theo tên hoặc email"
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

export default withBase(ListBaseUser);
