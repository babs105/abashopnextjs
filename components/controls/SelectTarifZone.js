import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";

export default function SelectTarifZone(props) {
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
        {options.map((item) => (
          <MenuItem key={item.id} value={item.tarifs[0].zone}>
            {item.tarifs[0].zone}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
