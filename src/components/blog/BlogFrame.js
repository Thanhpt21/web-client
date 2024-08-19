import React from "react";
import noimg from "../../assets/no-image.png";
import DOMPurify from "dompurify";
import withBase from "hocs/withBase";

const BlogFrame = ({ data, navigate }) => {
  return (
    <div
      onClick={() => navigate(`/tin-tuc/${data?._id}`)}
      className="w-full bg-white flex flex-col gap-1  cursor-pointer"
    >
      <div className="overflow-hidden rounded-2xl mb-2">
        <img
          src={data?.images || noimg}
          className="w-full md:h-[270px] h-[110px] object-cover rounded-2xl hover:scale-105 duration-300"
          alt=""
        />
      </div>
      <div>
        <p className="text-xs">Đăng bởi: {data?.author}</p>
        <p className="font-medium line-clamp-2 hover:text-main">
          {data?.title}
        </p>

        <p
          className="text-xs line-clamp-3 text-gray-600"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data?.description),
          }}
        ></p>
      </div>
    </div>
  );
};

export default withBase(BlogFrame);
