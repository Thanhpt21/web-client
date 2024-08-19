import React, { useCallback, useEffect, useState } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import {
  Breadcrumbs,
  SearchItem,
  ProductFrame,
  InputSelect,
  Pagination,
  SearchBar,
  InputForm,
} from "../../components";
import { getCategories, getProducts } from "../../apis";

import { sortby } from "../../utils/contants";
import { useDispatch, useSelector } from "react-redux";
import { getColor } from "store/product/productActions";
import { convertToSlug } from "../../utils/helpers";
import withBase from "hocs/withBase";
import useDebounce from "hooks/useDebounce";
import { apigetBrands } from "apis/brand";
import FilterSidebar from "components/products/FilterSidebar";
import { IoMdClose } from "react-icons/io";
import { FaFilter } from "react-icons/fa";

const Product = ({ dispatch, location, navigate }) => {
  const { colors } = useSelector((state) => state?.product);
  const { categories } = useSelector((state) => state?.app);
  let arrayColors = colors?.map((obj) => ({
    title: obj.title,
    _id: obj._id,
    code: obj.code,
  }));

  const { category } = useParams();

  const [product, setproduct] = useState(null);

  const [activeClick, setactiveClick] = useState(null);
  const [sort, setsort] = useState("");

  const [price, setprice] = useState({
    from: "",
    to: "",
  });

  const [selected, setselected] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [bestPrice, setbestPrice] = useState(null);

  const [params] = useSearchParams();

  useEffect(() => {
    dispatch(getColor());
  }, [dispatch]);

  const fetchProductsByCategory = async (queries) => {
    if (!categories) {
      console.error("Categories are not available");
      return;
    }

    const result = categories.find(
      (el) => convertToSlug(el.title) === category
    );

    if (category && result) {
      queries.category = result._id;
    }

    // Loại bỏ giá trị không hợp lệ
    if (queries.brand === "") {
      delete queries.brand;
    }

    try {
      const response = await getProducts({
        ...queries,
        limit: +process.env.REACT_APP_LIMIT,
      });

      if (response.success) {
        setproduct(response);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (!categories) return;
    const queries = Object.fromEntries([...params]);

    let priceQueries = {};
    if (queries.to && queries.from) {
      priceQueries = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } },
        ],
      };
    } else {
      if (queries.from) {
        queries.price = { gte: queries.from };
      }

      if (queries.to) {
        queries.price = { lte: queries.to };
      }
    }

    delete queries.from;
    delete queries.to;
    delete queries.price;
    const q = { ...priceQueries, ...queries };
    fetchProductsByCategory(q);
    window.scrollTo(0, 0);
  }, [params, category, categories]);

  const changeActiveFilter = useCallback(
    (name) => {
      if (activeClick === name) setactiveClick(null);
      else setactiveClick(name);
    },
    [activeClick]
  );

  const changeValue = useCallback(
    (value) => {
      setsort(value);
    },
    [sort]
  );

  useEffect(() => {
    if (sort) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          sort,
        }).toString(),
      });
    }
  }, [sort]);

  // mau sac

  const handleSelect = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value);
    if (alreadyEl) {
      setselected((prev) => prev.filter((el) => el !== e.target.value));
    } else {
      setselected((prev) => [...prev, e.target.value]);
    }
    //changeActiveFilter(null);
  };

  const handleSelectBrand = (e) => {
    const value = e.target.value;

    // Kiểm tra giá trị hợp lệ trước khi cập nhật state
    if (!value.trim()) return;

    setSelectedBrands((prev) =>
      prev.includes(value)
        ? prev.filter((el) => el !== value)
        : [...prev, value]
    );
  };

  const handleBrandClick = (brandId) => {
    const newSelectedBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter((id) => id !== brandId)
      : [...selectedBrands, brandId];

    setSelectedBrands(newSelectedBrands);

    navigate({
      pathname: `/${category}`,
      search: createSearchParams({
        ...Object.fromEntries(params),
        brand: newSelectedBrands.join(","),
        page: 1,
      }).toString(),
    });
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

    if (selectedBrands.length > 0) {
      queries.brand = selectedBrands.join(",");
      queries.page = 1;
    } else {
      delete queries.brand;
    }

    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [selected, selectedBrands]);

  useEffect(() => {
    fetchBrandByCategory();
  }, [category]);

  // Find the category

  const [brandData, setBrandData] = useState([]);
  const fetchBrandByCategory = async () => {
    const cate = categories?.find(
      (el) =>
        el.title.toLowerCase().replace(/\s+/g, "-") ===
        category.toLowerCase().replace(/\s+/g, "-")
    );
    const response = await apigetBrands({ category: cate?._id });
    if (response.success) {
      setBrandData(response.brands);
    }
  };

  useEffect(() => {
    // Lấy tham số 'brand' từ URL
    const brandIdFromParams = params.get("brand");

    // Nếu có tham số 'brand', cập nhật selectedBrands
    if (brandIdFromParams) {
      const newBrands = brandIdFromParams.split(",");
      setSelectedBrands(newBrands);
    } else {
      // Nếu không có tham số 'brand', đặt selectedBrands thành mảng rỗng
      setSelectedBrands([]);
    }
  }, [params]);

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

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="w-full">
      <div className="py-4 flex justify-center items-center">
        <div className="w-full">
          <Breadcrumbs category={category} />
        </div>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 my-4 ">
        <div className="md:grid-cols-1 pb-4 md:pb-0">
          <span className="font-medium text-sm">Lọc theo</span>
          <div className="flex items-center gap-4 text-sm">
            <SearchItem
              name="Giá"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
              type="input"
            />
            <SearchItem
              arrayColors={arrayColors}
              name="màu sắc"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
            />
          </div>
        </div>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 bg-white p-4">
        {isSidebarOpen && (
          <div className="absolute inset-0 z-50 flex justify-end">
            <div className="w-[350px] h-screen bg-white text-black p-6 grid grid-rows-10 fixed shadow-lg">
              <header className="border-b border-gray-100 flex items-center justify-between">
                <span>Lọc sản phẩm</span>
                <span
                  onClick={() => toggleSidebar()}
                  className="cursor-pointer p-2"
                >
                  <IoMdClose size={24} />
                </span>
              </header>
              <section>
                <div className=" flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center uppercase text-sm font-bold">
                      Chọn khoảng giá
                    </div>
                    <div className="flex  w-full">
                      <input
                        value={price.from}
                        onChange={(e) =>
                          setprice((prev) => ({
                            ...prev,
                            from: e.target.value,
                          }))
                        }
                        className="w-1/2 py-0 input-no-spinner text-xs"
                        type="number"
                        id="from"
                        placeholder="0"
                      />
                      <span className="flex items-center px-1">-</span>
                      <input
                        value={price.to}
                        onChange={(e) =>
                          setprice((prev) => ({
                            ...prev,
                            to: e.target.value,
                          }))
                        }
                        className="w-1/2 py-0 input-no-spinner text-xs"
                        type="number"
                        id="to"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <button
                        onClick={() => setprice({ from: "", to: "" })}
                        className="px-2 py-1 border bg-transparent"
                      >
                        Chọn giá khác
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center uppercase text-sm font-bold">
                      Màu sắc
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {arrayColors?.map((el, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <input
                            style={{ backgroundColor: el.code }}
                            type="checkbox"
                            className="w-7 h-7 accent-gray-900"
                            value={el._id}
                            onChange={(e) => handleSelect(e)}
                            id={el._id}
                            checked={selected.some((s) => s === el._id)} // Kiểm tra xem giá trị có nằm trong selected không
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center uppercase text-sm font-bold">
                      Thương hiệu
                    </div>
                    <div className="flex flex-wrap md:flex-col gap-4">
                      {brandData?.map((el) => (
                        <div key={el._id} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            value={el._id}
                            onChange={handleSelectBrand}
                            id={el._id}
                            checked={selectedBrands.includes(el._id)}
                          />
                          <label htmlFor={el._id} className="text-sm">
                            {el.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* Phần 1: Chiếm 1 cột */}
        <div className="md:col-span-1 hidden md:block">
          <div className=" flex flex-col gap-8 ">
            <div className="flex flex-col gap-4">
              <div className="flex items-center uppercase text-sm font-bold">
                Chọn khoảng giá
              </div>
              <div className="flex  w-full">
                <input
                  value={price.from}
                  onChange={(e) =>
                    setprice((prev) => ({ ...prev, from: e.target.value }))
                  }
                  className="w-1/2 py-0 input-no-spinner text-xs"
                  type="number"
                  id="from"
                  placeholder="0"
                />
                <span className="flex items-center px-1">-</span>
                <input
                  value={price.to}
                  onChange={(e) =>
                    setprice((prev) => ({ ...prev, to: e.target.value }))
                  }
                  className="w-1/2 py-0 input-no-spinner text-xs"
                  type="number"
                  id="to"
                  placeholder="0"
                />
              </div>
              <div>
                <button
                  onClick={() => setprice({ from: "", to: "" })}
                  className="px-2 py-1 border bg-transparent"
                >
                  Chọn giá khác
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center uppercase text-sm font-bold">
                Màu sắc
              </div>
              <div className="flex flex-wrap gap-4">
                {arrayColors?.map((el, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      style={{ backgroundColor: el.code }}
                      type="checkbox"
                      className="w-7 h-7 accent-gray-900"
                      value={el._id}
                      onChange={(e) => handleSelect(e)}
                      id={el._id}
                      checked={selected.some((s) => s === el._id)} // Kiểm tra xem giá trị có nằm trong selected không
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center uppercase text-sm font-bold">
                Thương hiệu
              </div>
              <div className="flex flex-wrap md:flex-col gap-4">
                {brandData?.map((el) => (
                  <div key={el._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      value={el._id}
                      onChange={handleSelectBrand}
                      id={el._id}
                      checked={selectedBrands.includes(el._id)}
                    />
                    <label htmlFor={el._id} className="text-sm">
                      {el.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Phần 2: Chiếm 3 cột còn lại */}

        <div className="md:col-span-4">
          <div className="grid grid-cols-1 md:grid-cols-2 mb-2">
            <div className="flex justify-between items-center h-full">
              <div className="uppercase font-bold">Tai nghe</div>
              <button
                onClick={toggleSidebar}
                className="px-2 py-1 flex items-center gap-1 border bg-transparent rounded-sm md:hidden"
              >
                <FaFilter /> Lọc
              </button>
            </div>

            <div className="md:grid-cols-1 text-start md:text-end">
              <span className="font-medium text-sm">Sắp xếp theo</span>
              <div className="w-full">
                <InputSelect
                  changeValue={changeValue}
                  value={sort}
                  options={sortby}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {product?.products?.map((el) => (
              <ProductFrame key={el._id} pid={el._id} data={el} normal={true} />
            ))}
          </div>
          <div className="mt-2">
            <Pagination
              productLength={product?.products?.length}
              totalCount={product?.counts}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withBase(Product);
