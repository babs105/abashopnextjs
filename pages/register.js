import React, { useEffect, useState } from "react";
import Controls from "../components/controls/Controls";
import { register } from "../redux/userRedux/callUserApi";
import { ToastContainer } from "react-toastify";
import {
  Box,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  styled,
  Typography,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";

import { Form, useFormRegister } from "../hooks/useFormRegister";
import Link from "next/link";
// url(https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)
const Container = styled("div")(({ theme }) => ({
  background: "url(/image/register.jpg),center",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",

  [theme.breakpoints.down("sm")]: {
    background: "none",
  },
  //
  // backgroundColor:"red"
}));
const Wrapper = styled(Card)(({ theme }) => ({
  // margin:"20px 0px",
  width: "35%",
  // backgroundColor: "white",
  padding: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  minWidth: "500px",
  gap: "20px",
  [theme.breakpoints.down("sm")]: {
    minWidth: "100%",
    width: "100%",
    gap: "5px",

    // padding: "10px",
  },
}));
const Title = styled("h2")({
  // backgroundColor:"red"
});
function Register() {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const redirect = location?.state?.redirect;
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const cart = useSelector((state) => state.cart.mycart);

  const user = useSelector((state) => state.user.currentUser);
  const [error, setError] = useState(false);

  const initialFValues = {
    id: 0,
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    address: "",
    telephone: "",
  };

  // useEffect(() => {
  //   if (user) {
  //     navigate(redirect || "/");
  //   }
  //   console.log("redirect", redirect);
  // }, [user]);

  const validate = (fieldValues = values) => {
    // let iscaract = Object.keys(inputCart).length === 0;
    let temp = { ...errors };

    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "Champ Obligatoire.";
    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "Champ Obligatoire.";
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "Champ Obligatoire.";
    if ("telephone" in fieldValues)
      temp.telephone =
        fieldValues.telephone.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("username" in fieldValues)
      temp.username = /$^|.+@.+..+/.test(fieldValues.username)
        ? ""
        : "Email invalide.";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "Champ Obligatoire.";
    if ("confirmPassword" in fieldValues) {
      if (fieldValues.confirmPassword) {
        temp.confirmPassword = "";
      } else {
        temp.confirmPassword = "Champ Obligatoire.";
      }
      if (fieldValues.confirmPassword === values.password) {
        temp.confirmPassword = "";
      } else {
        temp.confirmPassword = "Mot de passe non identique";
      }
    }
    setErrors({
      ...temp,
    });

    if (fieldValues == values)
      return Object.values(temp).every((item) => item == "");
    //Object.values return un array des values de temp
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useFormRegister(initialFValues, true, validate);

  const newRegister = () => {
    console.log("VALUES", values);
    register(dispatch, {
      ...values,
      // idCart: cart ? cart.id : null,
    });

    // console.log("values",values)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      newRegister();
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f8fc",
      }}
    >
      <Container>
        <Wrapper variant="outlined">
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { sm: "row", xs: "column" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title>Ouvrir un compte</Title>
            <Link
              href="/login"
              // state={{ redirect }}
            >
              <Typography
                sx={{
                  textDecoration: "underline",
                  color: "blue",
                  cursor: "pointer",
                }}
              >
                Se Connecter
              </Typography>
            </Link>
          </Box>
          <Form onSubmit={handleSubmit}>
            <Box>
              <Box>
                <Grid
                  container
                  spacing={{ xs: 2, sm: 2 }}
                  columns={{ xs: 4, sm: 12 }}
                >
                  <Grid item xs={4} sm={6}>
                    <Controls.Input
                      name="firstName"
                      label="Prenom"
                      value={values.firstName}
                      onChange={handleInputChange}
                      error={errors.firstName}
                      fullWidth
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4} sm={6}>
                    <Controls.Input
                      name="lastName"
                      label="Nom"
                      value={values.lastName}
                      onChange={handleInputChange}
                      error={errors.lastName}
                      fullWidth
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={4} sm={12}>
                    <Controls.Input
                      name="username"
                      label="Email"
                      value={values.username}
                      onChange={handleInputChange}
                      error={errors.username}
                      fullWidth
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={4} sm={6}>
                    <Controls.Input
                      name="password"
                      label="Mot de Passe"
                      value={values.password}
                      onChange={handleInputChange}
                      error={errors.password}
                      fullWidth
                      size="small"
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              // onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={4} sm={6}>
                    <Controls.Input
                      name="confirmPassword"
                      label="Confirmer Mot de Passe"
                      value={values.confirmPassword}
                      onChange={handleInputChange}
                      error={errors.confirmPassword}
                      fullWidth
                      size="small"
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              // onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={4} sm={6}>
                    <Controls.Input
                      name="address"
                      label="Addresse"
                      value={values.address}
                      onChange={handleInputChange}
                      error={errors.address}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4} sm={6}>
                    <Controls.Input
                      name="telephone"
                      label="Telephone"
                      value={values.telephone}
                      onChange={handleInputChange}
                      error={errors.telephone}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4} sm={12}></Grid>

                  {/* */}
                  <Grid item xs={4} sm={12}>
                    <Stack
                      direction={"row"}
                      justifyContent={"flex-start"}
                      sx={{ width: "100%" }}
                    >
                      <Controls.Button
                        type="submit"
                        text="VALIDER"
                        sx={{
                          backgroundColor: "teal",
                          color: "white",
                          padding: "10px",

                          margin: "30px 0px",
                          "&:hover": {
                            backgroundColor: "black",
                          },
                        }}
                      />
                    </Stack>
                  </Grid>
                  {/*  */}
                </Grid>
              </Box>
            </Box>
          </Form>
          <ToastContainer />
        </Wrapper>
      </Container>
    </Box>
  );
}

export default Register;
