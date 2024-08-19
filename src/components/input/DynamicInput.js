import clsx from "clsx";
import React, { useState } from "react";

const DynamicInput = ({
  value = [],
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  fullwidth,
  placeholder,
  defaultValue,
  style,
  readOnly,
  type = "text",
}) => {
  const [val, setVal] = useState([]);
  const handleAdd = () => {
    const arr = [...val, []];
    setVal(arr);
  };
  const handleChange = (e, i) => {
    const inputData = [...val];
    inputData[i] = e.target.value;
    setVal(inputData);
  };

  const handleDelete = (i) => {
    const deleteVal = [...val];
    deleteVal.splice(i, 1);
    setVal(deleteVal);
  };
  return (
    <>
      <button onClick={() => handleAdd()}>Thêm</button>
      {val.map((el, i) => {
        return (
          <div>
            {label && <label htmlFor={id}>{label}</label>}
            <input
              type={type}
              id={id}
              {...register(id, validate)}
              disabled={disabled}
              placeholder={placeholder}
              className={clsx("form-input my-auto", fullwidth && "w-full")}
              defaultValue={defaultValue}
              readOnly={readOnly}
              onChange={(e) => handleChange(e, i)}
            />
            <button onClick={() => handleDelete(i)}>x</button>
          </div>
        );
      })}
    </>
  );
};

export default DynamicInput;
