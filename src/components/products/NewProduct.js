import CustomSlider from "components/common/CustomSlider";
import withBase from "hocs/withBase";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getNewProducts } from "store/product/productActions";

const NewProduct = ({ dispatch }) => {
  const { newProducts } = useSelector((state) => state?.product);
  useEffect(() => {
    dispatch(getNewProducts());
  }, []);

  return (
    <div className="my-8">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        SẢN PHẨM MỚI
      </h3>
      <div className="mt-4 mx-[-10px] ">
        <CustomSlider products={newProducts} />
      </div>
    </div>
  );
};

export default withBase(NewProduct);
