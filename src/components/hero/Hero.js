import React, { useState } from "react";
import headphone from "../../assets/headphone.png";
import headphone2 from "../../assets/headphone2.png";
import headphone3 from "../../assets/headphone3.png";
import { FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { UpdateFollower } from "react-mouse-follower";

const fadeUp = (delay) => {
  return {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.5,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: easeInOut,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.5,
      transition: {
        duration: 0.2,
        ease: easeInOut,
      },
    },
  };
};

const data = [
  {
    id: 1,
    image: headphone,
    title: "Tai nghe Audio-technica ATH-M40X",
    price: "2.500.000",
    descriptiom:
      "Tai nghe Audio-technica ATH-M40X: Giàu bass, Mid phẳng và sạch sẽ, Treble có kết cấu, Âm trường rộng, có độ sâu.",
    brand: "abc",
    bgColor: "#2F1713",
  },
  {
    id: 2,
    image: headphone2,
    title: "Tai nghe Audio-technica ATH-M40X",
    price: "2.500.000",
    descriptiom:
      "Tai nghe Audio-technica ATH-M40X: Giàu bass, Mid phẳng và sạch sẽ, Treble có kết cấu, Âm trường rộng, có độ sâu.",
    brand: "abc",
    bgColor: "#5B754A",
  },
  {
    id: 3,
    image: headphone3,
    title: "Tai nghe Audio-technica ATH-M40X",
    price: "2.500.000",
    descriptiom:
      "Tai nghe Audio-technica ATH-M40X: Giàu bass, Mid phẳng và sạch sẽ, Treble có kết cấu, Âm trường rộng, có độ sâu.",
    brand: "abc",
    bgColor: "#2D4E54",
  },
];

const Hero = () => {
  const [active, setActive] = useState(data[0]);

  const handleActive = (value) => {
    setActive(value);
  };
  return (
    <div className="w-full bg-black text-white">
      <div className=" container">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
          <div className="flex flex-col justify-center py-14 md:py-0 xl:max-w-[500px]">
            <div className="space-y-5 text-center md:text-left">
              <AnimatePresence mode="wait">
                <UpdateFollower
                  mouseOptions={{
                    backgroundColor: "white",
                    zIndex: 9999,
                    followSpeed: 0.5,
                    rotate: -720,
                    scale: 10,
                    mixBlendMode: "difference",
                  }}
                >
                  <motion.h1
                    key={active.id}
                    variants={fadeUp(0.2)}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="text-3xl font-bold"
                  >
                    {active.title}
                  </motion.h1>
                </UpdateFollower>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.p
                  key={active.id}
                  variants={fadeUp(0.3)}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="text-sm leading-tight text-white/80"
                >
                  {active.descriptiom}
                </motion.p>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <UpdateFollower
                  mouseOptions={{
                    backgroundColor: active.bgColor,
                    zIndex: 9999,
                    followSpeed: 0.5,
                    rotate: -720,
                    scale: 6,
                    mixBlendMode: "difference",
                    backgroundElement: (
                      <div>
                        <img src={active.image} />
                      </div>
                    ),
                  }}
                >
                  <motion.button
                    key={active.id}
                    variants={fadeUp(0.3)}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    style={{ backgroundColor: active.bgColor }}
                    className="px-4 py-2 inline-block font-normal rounded-sm"
                  >
                    Mua ngay
                  </motion.button>
                </UpdateFollower>
              </AnimatePresence>

              <div className="flex items-center justify-center md:justify-start gap-4 !mt-24">
                <div className="w-20 h-[1px] bg-white"></div>
                <p className="uppercase text-[12px]">Tai nghe dành cho bạn</p>
                <div className="w-20 h-[1px] bg-white"></div>
              </div>
              <div className="grid grid-cols-3 gap-10">
                {data.map((el) => {
                  return (
                    <UpdateFollower
                      mouseOptions={{
                        backgroundColor: el.bgColor,
                        zIndex: 9999,
                        followSpeed: 0.5,
                        scale: 5,
                        text: "Xem chi tiết",
                        textFontSize: "3px",
                      }}
                    >
                      <div
                        key={el.id}
                        onClick={() => handleActive(el)}
                        className="grid grid-cols-2 place-items-center cursor-pointer"
                      >
                        <div>
                          <img className="w-[200px]" src={el.image} alt="" />
                        </div>
                        <div className="space-y-2">
                          <p className="md:text-sm text-[10px] font-semibold">
                            {el.price}
                          </p>
                          <p className="text-xs font-normal text-nowrap">
                            {el.modal}
                          </p>
                        </div>
                      </div>
                    </UpdateFollower>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end items-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                variants={fadeUp(0.4)}
                initial={{ opacity: 0, scale: 0.9, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: easeInOut }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  y: 100,

                  transition: {
                    duration: 0.2,
                  },
                }}
                className="w-[300px] md:w-[400px] xl:w-[500px]"
                src={active.image}
                alt=""
              />
            </AnimatePresence>
          </div>
          {/* <div className="text-3xl text-[#6CDC2D] fixed bottom-10 right-10 hover:rotate-[360deg] duration-500 z-[99999] mix-blend-difference">
            <a href="">
              <FaWhatsapp />
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
