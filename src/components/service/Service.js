import React from "react";
import obj1 from "../../assets/service/car.png";
import obj2 from "../../assets/service/checked.png";
import obj3 from "../../assets/service/wallet.png";
import obj4 from "../../assets/service/headphone.png";
import { UpdateFollower } from "react-mouse-follower";

const data = [
  {
    id: 1,
    title: "Vận chuyển nhanh chóng",
    icon: obj1,
    description: "Đảm bảo giao hàng nhanh chóng và đúng hẹn",
    delay: 0.5,
  },
  {
    id: 2,
    title: "Đảm bảo chất lượng",
    icon: obj2,
    description: "Chúng tôi cam kết cung cấp sản phẩm chất lượng cao",
    delay: 0.8,
  },
  {
    id: 3,
    title: "Thanh toán tiện lợi",
    icon: obj3,
    description:
      "Thanh toán dễ dàng và an toàn với các phương thức thanh toán đa dạng",
    delay: 1.1,
  },
  {
    id: 4,
    title: "Hỗ trợ khách hàng 24/7",
    icon: obj4,
    description: "Chúng tôi luôn sẵn sàng hỗ trợ bạn mọi lúc mọi nơi",
    delay: 1.1,
  },
];

const Service = () => {
  return (
    <div data-aos="fade-in" className="py-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 gap-y-8">
        {data?.map((el) => (
          <div
            key={el.id}
            className="flex flex-col items-start sm:flex-row gap-4 "
          >
            <img src={el.icon} className="w-10" alt="" />
            <div>
              <div className=" text-base font-bold">{el.title}</div>
              <div className="text-gray-400 text-sm">{el.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
