import React, { useCallback, useEffect, useState } from "react";
import { InputForm, Pagination } from "components";
import { useForm } from "react-hook-form";
import { Table, Space, Tag, Button } from "antd";
import moment from "moment";
import icons from "utils/icons";
import { formatMoney } from "utils/helpers";
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import useDebounce from "hooks/useDebounce";

import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { apiDeletePermission, apigetPermissions } from "apis/permission"; // Sử dụng API Permission
import UpdatePermission from "./UpdatePermission"; // Cập nhật component UpdatePermission
import path from "utils/path";
import HeaderPageAdmin from "components/admin/HeaderPageAdmin";

const { BiEdit, AiFillDelete } = icons;

const ListBasePermission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();

  const [params] = useSearchParams();
  const [data, setData] = useState(null);
  const [counts, setCounts] = useState(0);
  const [valueEdit, setValueEdit] = useState(null);
  const [update, setUpdate] = useState(false);

  const render = useCallback(() => {
    setUpdate(!update);
  });

  const handleDeletePermission = (pid) => {
    Swal.fire({
      title: "Xóa quyền này",
      text: "Bạn có muốn xóa quyền này?",
      icon: "warning",
      showCancelButton: true,
    }).then((rs) => {
      if (rs.isConfirmed) {
        const response = apiDeletePermission(pid);
        if (response.success) toast.success(response.message);
        else toast.error(response.message);
        setData(data.filter((el) => el._id !== pid));
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
      title: "Tên quyền",
      dataIndex: "name", // Thay vì 'province'
    },
    {
      title: "Link",
      dataIndex: "link", // Thay vì 'price'
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
          <span onClick={() => setValueEdit(record)} className="cursor-pointer">
            <BiEdit color="orange" size={20} />
          </span>
          <span
            onClick={() => handleDeletePermission(record._id)}
            className="cursor-pointer"
          >
            <AiFillDelete color="red" size={20} />
          </span>
        </Space>
      ),
    },
  ];

  const fetchPermissions = async (params) => {
    const response = await apigetPermissions({
      ...params,
      limit: +process.env.REACT_APP_LIMIT,
    });
    if (response.success) {
      setData(response.permissions);
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

    fetchPermissions(queries);
  }, [params, update]);

  return (
    <div className="w-full flex flex-col gap-4 relative">
      {valueEdit && (
        <div className="absolute inset-0 min-h-screen z-20 bg-white">
          <UpdatePermission
            valueEdit={valueEdit}
            render={render}
            setValueEdit={setValueEdit}
          />
        </div>
      )}

      <HeaderPageAdmin title={"Danh sách quyền"} />
      <div className="">
        <div className="flex w-full justify-between items-center py-4">
          <form className="w-[30%]">
            <InputForm
              id="q"
              register={register}
              errors={errors}
              fullwidth
              placeholder="Tìm kiếm quyền"
            />
          </form>
          <Button
            type="primary"
            className="ml-auto flex items-center"
            onClick={() => {
              navigate(`/${path.ADMIN}/${path.CREATE_PERMISSION}`); // Điều hướng đến trang tạo quyền
            }}
          >
            Thêm mới
          </Button>
        </div>
        <Table dataSource={data} columns={columns} pagination={false} />
        <div className="">
          <Pagination totalCount={counts} />
        </div>
      </div>
    </div>
  );
};

export default ListBasePermission;
