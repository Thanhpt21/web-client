import React, { memo } from "react";
import clsx from "clsx";

const TextAreaForm = ({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  fullwidth,
  fullheight,
  italic,
  placeholder,
  defaultValue,
  style,
  readOnly,
}) => {
  return (
    <div className={clsx("flex flex-col gap-1", style)}>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx(
          "form-textarea my-auto",
          fullwidth && "w-full",
          fullheight && "h-full",
          italic && "italic",
          disabled ? "bg-gray-300 cursor-not-allowed" : "bg-white",
          "border",
          "border-gray-300",
          "px-3",
          "py-2",
          "rounded",
          "focus:outline-none",
          "focus:border-gray-500",
          "transition-colors",
          "duration-300"
        )}
        defaultValue={defaultValue}
        readOnly={readOnly}
      />
      {errors[id] && (
        <small className="text-xs text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(TextAreaForm);
