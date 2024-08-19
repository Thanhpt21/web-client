import React, { useEffect, useState } from "react";
import icons from "../../utils/icons";
import { getProducts } from "../../apis";
import { renderStarFromNumber, secondsToHms } from "../../utils/helpers";
import { formatMoney } from "../../utils/helpers";
import Countdown from "../common/Countdown";
import moment from "moment";
import noimg from "../../assets/no-image.png";

const { AiFillStar, AiOutlineMenu } = icons;

let idInterval;
const DealDaily = () => {
  const [dealDaily, setDealDaily] = useState(null);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expireTime, setExpireTime] = useState(false);

  const fetchDealDaily = async () => {
    const response = await getProducts({
      limit: 1,
      //totalratings: 5,
    });
    if (response.success) {
      setDealDaily(response.products[0]);
      const today = `${moment().format("MM/DD/YYYY")} 5:00:00`;
      const seconds =
        new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000;
      const num = secondsToHms(seconds);
      setHour(num.h);
      setMinute(num.m);
      setSecond(num.s);
    } else {
      setHour(0);
      setMinute(59);
      setSecond(59);
    }
  };

  useEffect(() => {
    idInterval && clearInterval(idInterval);
    //fetchDealDaily();
  }, []);

  useEffect(() => {
    fetchDealDaily();
  }, []);
  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) setSecond((prev) => prev - 1);
      else {
        if (minute > 0) {
          setMinute((prev) => prev - 1);
          setSecond(59);
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1);
            setMinute(59);
            setSecond(59);
          } else {
            setExpireTime(!expireTime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [second, minute, hour, expireTime]);

  return (
    <div className="w-full border flex-auto">
      <div className="flex items-center justify-between p-4 w-full">
        <span className="flex-1 flex justify-center">
          <AiFillStar size={20} color="#DD1111" />
        </span>
        <span className="flex-8 font-semibold text-gray-700 text-[20px] text-center flex justify-center">
          DEAL DAILY
        </span>
        <span className="flex-1"></span>
      </div>
      <div className="w-full flex flex-col items-center pt-8 px-4 gap-2">
        <img
          src={dealDaily?.thumb ? dealDaily?.thumb : noimg}
          className="w-full object-contain"
          alt=""
        />
        <span className="line-clamp-1 text-center">{dealDaily?.title}</span>
        <span className="flex ">
          {renderStarFromNumber(dealDaily?.totalratings, 20)?.map(
            (el, index) => (
              <span key={index}>{el}</span>
            )
          )}
        </span>
        <span>{`${formatMoney(dealDaily?.price)} VND`}</span>
      </div>
      <div className="px-4 mt-8">
        <div className="flex justify-center gap-2 items-center mb-4">
          <Countdown unit={"Hours"} number={hour} />
          <Countdown unit={"Minutes"} number={minute} />
          <Countdown unit={"Second"} number={second} />
        </div>
        <button
          type="button"
          className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2"
        >
          <AiOutlineMenu />
          <span>Options</span>
        </button>
      </div>
    </div>
  );
};

export default DealDaily;
