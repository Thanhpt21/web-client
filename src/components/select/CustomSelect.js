import clsx from "clsx";
import React from "react";
import Select from "react-select";

const CustomSelect = ({
  label,
  placeholder,
  onChange,
  options = [],
  value,
  className,
  wrapClassName,
}) => {
  return (
    <div className={clsx(wrapClassName)}>
      {label && <h3>{label}</h3>}
      <Select
        placeholder={placeholder}
        options={options}
        value={value}
        isSearchable={false}
        onChange={(val) => onChange(val)}
        formatOptionLabel={(options) => (
          <div className="flex text-black items-center gap-2">
            <span>{options.label}</span>
          </div>
        )}
        className={{ control: () => clsx("border-2 py-[2px]", className) }}
      />
    </div>
  );
};

export default CustomSelect;
