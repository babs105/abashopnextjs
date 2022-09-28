import { Box } from "@mui/material";
import React, { useState } from "react";
export function useForm2(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e, caract = {}) => {
    console.log("HINPUTANDLE");
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: name === "categories" ? value.split(",") : value,
      caract: [
        ...values.caract?.map((item) =>
          item.id === caract?.id ? { ...caract, [name]: value } : item
        ),
      ],
    });
    if (validateOnChange) validate({ [name]: value }, caract);
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
      sx={{ "& .MuiTextField-root": { width: "100%" }, marginTop: "2px" }}
      // noValidate
      autoComplete="off"
      {...other}
    >
      {props.children}
    </Box>
  );
}
