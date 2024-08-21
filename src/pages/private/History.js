import { CustomSelect, InputForm, Pagination } from "components";
import withBase from "hocs/withBase";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { Table, Tag } from "antd";
import useDebounce from "hooks/useDebounce";
import moment from "moment";
import { formatMoney } from "utils/helpers";
import { statusOrder } from "utils/contants";
import { apiGetUserOrders } from "apis";

const History = ({ navigate, location }) => {
  const [data, setData] = useState(null);
  const [counts, setCounts] = useState(0);
  const {
    register,
    formState: { errors },
    watch,
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
            <span>{`${el?.title} -  ${el?.color}`}</span>
            <span>{`x${el?.quantity} - ${formatMoney(el?.price) + "đ"}`}</span>
          </span>
        ));
      },
    },
    {
      title: "Tổng",
      dataIndex: "total",
      render: (item, record, index) => (
        <span className="flex flex-col gap-1">
          <span>
            Phí ship:
            {formatMoney(
              record?.ship && record?.ship?.price ? record?.ship?.price : 25000
            ) + "đ"}
          </span>
          <span className="font-medium">{`${formatMoney(
            item +
              (record?.ship && record?.ship?.price
                ? record?.ship?.price
                : 25000)
          )} đ`}</span>
        </span>
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
      title: "Ngày đặt",
      dataIndex: "createdAt",
      render: (item) => {
        return moment(item).format("DD/MM/YYYY");
      },
    },
  ];

  const fetchOrder = async (params) => {
    const response = await apiGetUserOrders({
      ...params,
      limit: +process.env.REACT_APP_LIMIT,
    });

    if (response.success) {
      setData(response.orders);
      setCounts(response.counts);
    }
  };

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    fetchOrder(queries);
  }, [params]);

  const handleSearchStatus = ({ value }) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ status: value }).toString(),
    });
  };

  return (
    <div className="w-full px-4">
      <header className="font-medium py-4 border-b md:text-start text-center">
        Lịch sử mua hàng
      </header>
      <div className="md:flex md:justify-end md:items-center p-4 hidden">
        <form className="w-[40%] grid grid-cols-2 gap-4">
          <div className="grid grid-cols-1">
            <InputForm
              id="q"
              register={register}
              errors={errors}
              fullwidth
              placeholder="Tìm kiếm"
            />
          </div>
          <div className="grid-cols-1 flex items-center">
            <CustomSelect
              options={statusOrder}
              value={status}
              onChange={(val) => handleSearchStatus(val)}
              wrapClassName="w-full"
            />
          </div>
        </form>
      </div>
      <div className="overflow-x-auto py-4">
        <Table dataSource={data} columns={columns} pagination={false} />
      </div>
      <div className="mt-4">
        <Pagination totalCount={counts} />
      </div>
    </div>
  );
};

export default withBase(History);
