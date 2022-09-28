import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";

export default function SelectPays(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    options,
    ...other
  } = props;

  return (
    <FormControl
      // variant="outlined"
      size="small"
      {...other}
      {...(error && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        // defaultValue="Selectionner"
      >
        <MenuItem value={""}>None</MenuItem>
        {options.map((pays) => (
          <MenuItem key={pays} value={pays}>
            {pays}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
