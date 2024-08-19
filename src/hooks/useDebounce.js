import React, { useState, useEffect } from "react";

const useDebounce = (value, ms) => {
  const [debounceValue, setdebounceValue] = useState("");
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      setdebounceValue(value);
    }, ms);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [value, ms]);

  return debounceValue;
};

export default useDebounce;
