import BreadcrumbsDefault from "components/common/BreadcrumbsDefault";
import React from "react";
import path from "utils/path";

const AboutUs = () => {
  return (
    <div className="w-full">
      <BreadcrumbsDefault path1={path.HOME} path2={path.ABOUT_US} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col justify-center p-4">
          <h1 className="text-3xl font-bold mb-4">Giới Thiệu</h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            Chào mừng đến với trang giới thiệu của chúng tôi. Đây là nơi chúng
            tôi chia sẻ thông tin về công ty, sứ mệnh, và các giá trị cốt lõi
            của mình. Chúng tôi cam kết mang đến cho khách hàng những sản phẩm
            và dịch vụ tốt nhất.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Với đội ngũ nhân viên tận tâm và chuyên nghiệp, chúng tôi luôn nỗ
            lực không ngừng để đáp ứng nhu cầu của khách hàng và tạo ra những
            trải nghiệm tuyệt vời nhất. Hãy cùng khám phá thêm về chúng tôi và
            những gì chúng tôi có thể cung cấp.
          </p>
        </div>

        <div className="flex justify-center items-center p-4">
          <img
            src="https://anhuygroupluxury.vn/storage/category-product/2/nv1.jpg"
            alt="Giới Thiệu"
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
