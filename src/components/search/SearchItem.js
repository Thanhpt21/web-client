import React, { memo, useEffect, useState } from "react";
import icons from "../../utils/icons";
import { arrColors } from "../../utils/contants";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getProducts } from "../../apis";
import useDebounce from "../../hooks/useDebounce";
const { AiOutlineDown } = icons;

const SearchItem = ({
  arrayColors,
  name,
  activeClick,
  changeActiveFilter,
  type = "checkbox",
}) => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [selected, setselected] = useState([]);
  const [bestPrice, setbestPrice] = useState(null);
  const [params] = useSearchParams();

  const [price, setprice] = useState({
    from: "",
    to: "",
  });

  const handleSelect = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value);
    if (alreadyEl) {
      setselected((prev) => prev.filter((el) => el !== e.target.value));
    } else {
      setselected((prev) => [...prev, e.target.value]);
    }
    //changeActiveFilter(null);
  };

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) {
      param.push(i);
    }
    const queries = {};
    for (let i of param) {
      queries[i[0]] = i[1];
    }

    if (selected.length > 0) {
      queries.color = selected.join(",");
      queries.page = 1;
    } else {
      delete queries.color;
    }
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [selected]);

  const fetchBestPriceProduct = async () => {
    const response = await getProducts({ sort: "-price", limit: 1 });
    if (response.success) {
      setbestPrice(response.products[0].price);
    }
  };

  useEffect(() => {
    if (type === "input") fetchBestPriceProduct();
  }, [type]);

  useEffect(() => {
    if (price.from && price.to && price.from > price.to) {
      alert("no > ");
    }
  }, [price]);

  const debouncePriceFrom = useDebounce(price.from, 500);
  const debouncePriceTo = useDebounce(price.to, 500);
  useEffect(() => {
    let param = [];
    for (let i of params.entries()) {
      param.push(i);
    }
    const queries = {};
    for (let i of param) {
      queries[i[0]] = i[1];
    }

    if (Number(price.from) > 0) queries.from = price.from;
    else delete queries.from;
    if (Number(price.to) > 0) queries.to = price.to;
    else delete queries.to;

    queries.page = 1;

    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [debouncePriceFrom, debouncePriceTo]);

  return (
    <div
      onClick={() => changeActiveFilter(name)}
      className="p-2 cursor-pointer text-gray-500 text-sx gap-6 relative border border-gray-800 flex justify-between items-center"
    >
      <span className="capitalize">{name}</span>
      <AiOutlineDown />
      {activeClick === name && (
        <div className="grid absolute z-10 top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white">
          {type === "checkbox" && (
            <div>
              <div className="p-2 flex items-center justify-between gap-8 border-b">
                <span className="whitespace-nowrap">
                  {`${selected.length}`} chọn
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setselected([]);
                  }}
                  className="underline cursor-pointer hover:text-main"
                >
                  Reset
                </span>
              </div>
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col gap-4 mt-4"
              >
                {arrayColors.map((el, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      className="from-checkbox"
                      value={el._id}
                      onChange={(e) => handleSelect(e)}
                      id={el._id}
                      checked={selected.some((s) => s === el._id)} // Sửa đoạn này nếu cần
                    />
                    <label
                      className="capitalize text-gray-700"
                      htmlFor={el._id} // Sửa từ el.title thành el._id
                    >
                      {el.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {type === "input" && (
            <div onClick={(e) => e.stopPropagation()}>
              <div className="p-2 flex items-center justify-between gap-8 border-b">
                <span className="whitespace-nowrap">{`Giá cao nhất ${Number(
                  bestPrice
                ).toLocaleString()} VNĐ `}</span>
                <span
                  onClick={(e) => {
                    //e.stopPropagation();
                    setprice({ from: "", to: "" });
                  }}
                  className="underline cursor-pointer hover:text-main"
                >
                  Reset
                </span>
              </div>
              <div className="grid p-2 gap-2">
                <div className="grid grid-cols-1 gap-2">
                  <label htmlFor="from">Từ</label>
                  <input
                    value={price.from}
                    onChange={(e) =>
                      setprice((prev) => ({ ...prev, from: e.target.value }))
                    }
                    className="form-input"
                    type="number"
                    id="from"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label htmlFor="to">đến</label>
                  <input
                    value={price.to}
                    onChange={(e) =>
                      setprice((prev) => ({ ...prev, to: e.target.value }))
                    }
                    className="form-input"
                    type="number"
                    id="to"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);
