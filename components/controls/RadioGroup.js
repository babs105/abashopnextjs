import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export default function RadioGroup(props) {
  const { name, label, value, onChange, items } = props;

  return (
    <FormControl sx={{ color: "black" }}>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange}>
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={
              <Radio
                sx={{
                  color: "teal",
                  "&.Mui-checked": {
                    color: "teal",
                  },
                }}
                size="small"
              />
            }
            label={item.title}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
}
