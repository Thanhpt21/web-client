import React, { useState } from "react";
import clsx from "clsx";
import { Input } from "antd";
import "antd/dist/reset.css"; // Nếu chưa import css của Ant Design

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  style,
  fw,
  isHideLabel,
  placeholder,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div className={clsx("flex flex-col relative mb-2", fw && "w-full")}>
      {!isHideLabel && value?.trim() !== "" && (
        <label
          className="text-[10px] animate-slide-top-input absolute top-0 left-[12px] block px-1 bg-white"
          htmlFor={nameKey}
        >
          {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        </label>
      )}
      <Input
        type={type || "text"}
        className={clsx(
          "rounded-sm border w-full my-2 placeholder:text-sm placeholder:italic outline-none",
          style
        )}
        placeholder={
          placeholder || nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)
        }
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </div>
  );
};

export default InputField;
