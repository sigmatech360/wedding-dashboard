// src/components/MultiSelect.jsx
import React from "react";
import Select from "react-select";

const MultiSelect = ({
  options,
  placeholder,
  onChange,
  defaultValue,
  isMulti = false,
  value,
  required,
  className,
  style
}) => {
  return (
    <Select
      options={options}
      isMulti={isMulti}
      onChange={onChange}
      placeholder={placeholder || "Select..."}
      defaultValue={defaultValue}
      value={value}
      required='true'
      className={className || ""}
      styles={{
        option: (provided) => ({
          ...provided,
          whiteSpace: "normal", // allow wrapping
        }),
        menu: (provided) => ({
          ...provided,
          zIndex: 9999, // prevent overlap issues
            backgroundColor: '#fff',
            color: '#000'
        }),
      }}
    />
  );
};

export default MultiSelect;
