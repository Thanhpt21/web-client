import React, { useEffect } from "react";

const RadioField = ({
  name,
  selectedOption,
  option1,
  option2,
  onOptionChange,
}) => {
  useEffect(() => {
    // Update selected option when props change
    if (selectedOption !== option1.value && selectedOption !== option2.value) {
      onOptionChange(option1.value); // Default to option1 if selectedOption is invalid
    }
  }, [selectedOption, option1.value, option2.value, onOptionChange]);

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    onOptionChange(selectedOption);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="inline-flex items-center">
        <input
          type="radio"
          className="form-radio text-blue-600 border-gray-300 focus:ring-blue-500"
          name={name}
          value={option1.value}
          checked={selectedOption === option1.value}
          onChange={handleOptionChange}
        />
        <span className="ml-2">{option1.label}</span>
      </label>
      <label className="inline-flex items-center">
        <input
          type="radio"
          className="form-radio text-blue-600 border-gray-300 focus:ring-blue-500"
          name={name}
          value={option2.value}
          checked={selectedOption === option2.value}
          onChange={handleOptionChange}
        />
        <span className="ml-2">{option2.label}</span>
      </label>
    </div>
  );
};

export default RadioField;
