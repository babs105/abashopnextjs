import { Box } from "@mui/material";
import React, { useState } from "react";
export function useFormLogin(
  initialFValues,
  validateOnChange = false,
  validate
) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    console.log("HINPUTANDLE");

    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

export function Form(props) {
  const { children, ...other } = props;
  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { width: "100%" }, marginTop: "30px" }}
      // noValidate
      autoComplete="off"
      {...other}
    >
      {props.children}
    </Box>
  );
}
