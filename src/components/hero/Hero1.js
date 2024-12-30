import React from "react";
import banner2 from "../../assets/banner/banner2.png";
import { motion } from "framer-motion";
import { slideRight } from "utils/animation";

const Hero1 = () => {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[550px] relative">
      <div className="flex flex-col justify-center py-14 md:pr-16 xl:pr-40 md:py-0">
        <div className="text-center md:text-left space-y-6">
          <motion.p
            variants={slideRight(0.4)}
            initial="hidden"
            animate="visible"
            className="text-orange-600 uppercase font-semibold"
          >
            Cam kết 100% hài lòng
          </motion.p>
          <motion.h1
            variants={slideRight(0.6)}
            initial="hidden"
            animate="visible"
            className="text-5xl font-semibold lg:text-6xl !leading-tight"
          >
            Chất Lượng Sản Phẩm <span className="text-yellow-500">Tốt</span>
          </motion.h1>
          <motion.p
            variants={slideRight(0.8)}
            initial="hidden"
            animate="visible"
          >
            Chúng tôi sẽ giúp bạn tìm kiếm sản phẩm thích hợp nhất. Nó hoàn toàn
            miễn phí và riêng tư
          </motion.p>
          <motion.button
            variants={slideRight(1.0)}
            initial="hidden"
            animate="visible"
            className="primary-btn"
          >
            Tìm hiểu thêm
          </motion.button>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <motion.img
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          src={banner2}
          alt=""
          className="w-[350px] md:w-[550px] xl:w-[700px]"
        />
      </div>
    </div>
  );
};

export default Hero1;
