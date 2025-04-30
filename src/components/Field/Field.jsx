import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";

const Field = ({ name, type = "text", onChange, onBlur, value }) => {
  return (
    <FormControl position="start" fullWidth variant="outlined" sx={{ p: 1 }}>
      <InputLabel>{name}</InputLabel>
      <OutlinedInput
        sx={{ height: 40 }}
        id={name}
        name={name}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        label="name"
      />
    </FormControl>
  );
};

export default Field;
