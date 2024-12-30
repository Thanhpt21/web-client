import clsx from "clsx";
import React, { memo } from "react";

const SelectField = ({
  label,
  options = [],
  register,
  errors,
  id,
  validate,
  style,
  fullwidth,
  defaultValue,
  handleChange,
  disabled,
  value,
  hidden,
}) => {
  return (
    <div className={clsx("flex flex-col gap-1", style)}>
      {label && (
        <label className={hidden ? "hidden" : ""} htmlFor={id}>
          {label}
        </label>
      )}
      <select
        value={value}
        disabled={disabled}
        defaultValue={defaultValue}
        className={clsx(
          "form-select",
          "border",
          "border-gray-300",
          "px-3",
          "py-2",
          "rounded",
          "focus:outline-none",
          "focus:border-gray-500",
          "transition-colors",
          "duration-300",
          fullwidth && "w-full",
          disabled ? "bg-gray-300 cursor-not-allowed" : "bg-white",
          style
        )}
        id={id}
        {...register(id, validate)}
        onChange={handleChange}
        hidden={hidden}
      >
        <option value="">{`---Chọn ${label ? label : ""}---`}</option>
        {options?.map((el) => (
          <option key={el.code} value={el.code}>
            {el.value}
          </option>
        ))}
      </select>
      {errors[id] && (
        <small className="text-xs text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(SelectField);
