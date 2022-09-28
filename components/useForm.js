import { Box } from "@mui/material";
import React, { useState } from "react";
export function useForm(
  initialFValues,
  validateOnChange = false,
  validate,
  // getPriceShippingPays,
  getPriceZone,
  changeExpediteur = false
  // sonChangeBloc
  // onChange,
  // car,
) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    console.log("HINPUTANDLE");

    // let iscaract = Object.keys(caract).length === 0;

    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: name === "categories" ? value.split(",") : value,
    });
    if (validateOnChange) validate({ [name]: value });

    if (changeExpediteur) {
      console.log("addresse2");
      // if (name === "pays2") getPriceShippingPays(value);
      if (name === "regiondept2") getPriceZone(value);
    } else {
      // if (name === "pays") getPriceShippingPays(value);
      if (name === "regiondept") getPriceZone(value);
    }
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
