import React, { useEffect, useState } from "react";
import { apigetProducts, getProducts } from "../../apis";
import { Product, CustomSlider } from "..";
import { useDispatch, useSelector } from "react-redux";
import { getNewProducts } from "../../store/product/productActions";

const tabs = [
  {
    id: 1,
    value: "Best Seller",
  },
  {
    id: 2,
    value: "New Arrivals",
  },
];

const BestSeller = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(1);
  const [bestSellers, setBestSellers] = useState(null);
  const [products, setProducts] = useState(null);

  const { newProducts } = useSelector((state) => state.product);

  const fetchProducts = async () => {
    const response = await getProducts({ sort: "-sold" });
    if (response?.success) {
      setBestSellers(response?.products);
      setProducts(response?.products);
    }
  };

  useEffect(() => {
    fetchProducts();
    dispatch(getNewProducts());
  }, []);

  useEffect(() => {
    if (activeTab === 1) setProducts(bestSellers);
    if (activeTab === 2) setProducts(newProducts);
  }, [activeTab]);
  return (
    <div>
      <div className="flex text-[16px] gap-8 pb-4 border-b-2 border-main">
        {tabs?.map((el) => (
          <span
            key={el.id}
            className={`${
              activeTab === el.id ? "font-bold" : ""
            } capitalize cursor-pointer `}
            onClick={() => setActiveTab(el.id)}
          >
            {el.value}
          </span>
        ))}
      </div>
      <div className="mt-4 mx-[-10px]">
        <CustomSlider products={products} activeTab={activeTab} />
      </div>
      <div className="w-full flex gap-4 mt-4">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          alt=""
          className="flex-1 object-contain"
        />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          alt=""
          className="flex-1 object-contain"
        />
      </div>
    </div>
  );
};

export default BestSeller;
