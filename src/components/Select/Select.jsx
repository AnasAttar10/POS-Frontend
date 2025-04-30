import { FormControl } from "@mui/material";
import React from "react";

const Select = ({
  name,
  handleChange,
  handleBlur,
  values,
  options,
  optionValues,
}) => {
  return (
    <FormControl position="start" fullWidth variant="outlined" sx={{ p: 1 }}>
      <label htmlFor={name}>{name}</label>
      <select
        id={name}
        className="form-select form-select-lg mt-1 mb-3 w-100"
        aria-label=".form-select-lg example"
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values}
      >
        <option defaultValue>Select The Value </option>
        {options.map((v, i) => (
          <option value={optionValues[i]} key={optionValues[i]}>
            {v}
          </option>
        ))}
      </select>
    </FormControl>
  );
};

export default Select;
