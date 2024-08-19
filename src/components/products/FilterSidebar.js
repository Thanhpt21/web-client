import React, { useState } from "react";

const FilterSidebar = ({
  arrayColors,
  brandData,
  handleSelect,
  selected,
  handleSelectBrand,
  selectedBrands,
  price,
  setprice,
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleSidebar}
        className="px-4 py-2 border bg-blue-500 text-white rounded-md fixed bottom-4 right-4 z-50"
      >
        Lọc sản phẩm
      </button>
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40">
          <div
            className={`fixed top-0 right-0 w-7/12 md:w-1/3 bg-white h-full transition-transform ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            } z-50`}
          >
            <button
              onClick={toggleSidebar}
              className="absolute top-4 right-4 text-xl"
            >
              &times;
            </button>
            <div className="flex flex-col gap-8 p-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center uppercase text-sm font-bold">
                  Chọn khoảng giá
                </div>
                <div className="flex w-full">
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
                        checked={selected.some((s) => s === el._id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center uppercase text-sm font-bold">
                  Thương hiệu
                </div>
                <div className="flex flex-wrap gap-4">
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
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;
