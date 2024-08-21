import React, { useCallback, useEffect, useState } from "react";
import { CustomSelect, Pagination } from "components";
import withBase from "hocs/withBase";
import useDebounce from "hooks/useDebounce";
import moment from "moment";
import { formatMoney } from "utils/helpers";
import { statusOrder } from "utils/contants";
import { useForm } from "react-hook-form";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { Table, Space } from "antd";
import { apiGetOrdersByAdmin } from "apis";
import icons from "utils/icons";
import UpdateOrder from "./UpdateOrder";
import { Tag } from "antd";

const { BiEdit, AiFillDelete } = icons;

const ListBaseOrder = ({ navigate, location }) => {
  const [data, setdata] = useState(null);
  const [counts, setCounts] = useState(0);
  const [valueEdit, setValueEdit] = useState(null);
  const [update, setUpdate] = useState(false);
  const [newOrder, setNewOrder] = useState(0); // State để lưu số đơn hàng mới trong 24h
  const [hasNewOrderToday, setHasNewOrderToday] = useState(false);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
    setValue,
  } = useForm();
  const [params] = useSearchParams();
  const queriesDebounce = useDebounce(watch("q"), 800);
  const status = watch("status");

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

  const render = useCallback(() => {
    setUpdate(!update);
  });

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
      title: "Sản phẩm",
      dataIndex: "products",
      render: (item, record, index) => {
        return record?.products?.map((el) => (
          <span key={el?._id} className="flex flex-col mb-1">
            <span>{`${el?.title} - ${el?.color?.title}`}</span>
            <span>
              {el?.discount > 0 ? (
                <>
                  <span>{formatMoney(el?.discount) + "đ"}</span>
                  <span className="line-through ml-2">
                    {formatMoney(el?.price) + "đ"}
                  </span>
                </>
              ) : (
                <span>{formatMoney(el?.price) + "đ"}</span>
              )}
            </span>
            <span>{`x${el?.quantity}`}</span>
          </span>
        ));
      },
    },
    {
      title: "Người đặt",
      dataIndex: "",
      render: (item, record, index) => (
        <span className="flex flex-col gap-1" key={item.orderBy._id}>
          <span className="flex gap-2">
            <span>{item.orderBy.lastname}</span>
            <span>{item.orderBy.firstname} </span>
          </span>
          <span className="flex gap-2">
            <span>{item.orderBy.email}</span>
            <span>{item.orderBy.mobile} </span>
          </span>
          <span>{item.orderBy.address} </span>
          <span>
            Tỉnh thành: <u>{item?.ship?.province}</u>{" "}
          </span>
        </span>
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      render: (item, record, index) => (
        <span className="flex flex-col gap-1">
          {hasNewOrderToday &&
          moment().startOf("day").isSame(moment(item).startOf("day"), "day") ? (
            <span>
              {moment(item).format("DD/MM/YYYY")}
              <Tag className="ml-2" color="success">
                Mới
              </Tag>
            </span>
          ) : (
            <span>{moment(item).format("DD/MM/YYYY")}</span>
          )}

          <span>
            Vận chuyển: {record.deliveryMethod}{" "}
            <span className="text-sm text-medium text-green-500">
              (
              {"+" +
                formatMoney(
                  record?.ship && record?.ship?.price
                    ? record?.ship?.price
                    : 25000
                ) +
                "đ"}
              )
            </span>
          </span>
          <span>Phương thức: {record.methodPayment} </span>

          {record?.coupon ? (
            <span>
              Mã giảm giá:
              {record?.coupon?.name} -{" "}
              {formatMoney(record?.coupon?.discount) + "đ"}
            </span>
          ) : null}
        </span>
      ),
    },
    {
      title: "Tổng",
      dataIndex: "total",
      render: (item, record, index) => (
        <span className="font-medium">{`${formatMoney(
          item +
            (record?.ship && record?.ship?.price ? record?.ship?.price : 25000)
        )}đ`}</span>
      ),
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (item) => (
        <Tag color={statusOrder.find((e) => e.label === item)?.color}>
          {statusOrder.find((e) => e.label === item)?.value}
        </Tag>
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
          {/* <span
            onClick={() => handleDeleteProduct(record._id)}
            className="cursor-pointer "
          >
            <AiFillDelete color="red" size={20} />
          </span> */}
        </Space>
      ),
    },
  ];

  const fetchOrder = async (params) => {
    const response = await apiGetOrdersByAdmin({
      ...params,
      limit: +process.env.REACT_APP_LIMIT,
    });

    if (response.success) {
      const newOrdersInLast24h = response.orders.filter((order) =>
        moment(order.createdAt).isSame(moment(), "day")
      );
      // Cập nhật số đơn hàng mới trong 24h
      setNewOrder(newOrdersInLast24h.length);
      setHasNewOrderToday(newOrdersInLast24h.length > 0);
      setdata(response.orders);
      setCounts(response.counts);
    }
  };
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    fetchOrder(queries);
  }, [params, update]);

  const handleSearchStatus = ({ value }) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ status: value }).toString(),
    });
  };

  const handleReset = () => {
    // Xóa tham số tìm kiếm
    navigate({
      pathname: location.pathname,
      search: createSearchParams({}).toString(),
    });
  };

  return (
    <div className="w-full flex flex-col gap-4 relative">
      {valueEdit && (
        <div className="absolute inset-0 min-h-screen z-20 bg-white">
          <UpdateOrder
            valueEdit={valueEdit}
            render={render}
            setValueEdit={setValueEdit}
          />
        </div>
      )}
      <h1 className="h-[75px] flex justify-between items-center text-xl px-4 border-b ">
        <span>Quản lý đơn hàng</span>
      </h1>
      <div className=" p-2 bg-white rounded-md shadow-sm">
        {hasNewOrderToday ? (
          <span>
            Có <span className="text-red-600">{newOrder}</span> đơn hàng mới
            trong hôm nay
          </span>
        ) : (
          <span>Không có đơn hàng mới trong hôm nay</span>
        )}
      </div>
      <div className="">
        <div className="flex justify-end items-center p-4">
          <form className="w-[30%] flex gap-4">
            <div className=" ">
              <button
                onClick={() => handleReset}
                className="border border-blue-400 px-2 py-1 w-fit h-full"
              >
                Reset
              </button>
            </div>
            <div className=" flex items-center w-full">
              <CustomSelect
                options={statusOrder}
                value={status}
                onChange={(val) => handleSearchStatus(val)}
                wrapClassName="w-full"
              />
            </div>
          </form>
        </div>
        <Table dataSource={data} columns={columns} pagination={false} />
        <div>
          <Pagination totalCount={counts} />
        </div>
      </div>
    </div>
  );
};

export default withBase(ListBaseOrder);
