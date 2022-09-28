import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Controls from "../components/controls/Controls";
import { login } from "../redux/userRedux/callUserApi";
import {
  Box,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Form, useFormLogin } from "../hooks/useFormLogin";
import Link from "next/link";
// import Layout from "../components/InitCartUser";
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
  margin: "0px 10px",
  padding: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  minWidth: "400px",
  gap: "20px",
  [theme.breakpoints.down("sm")]: {
    // minWidth: "100%",
    width: "100%",
    gap: "5px",

    // padding: "10px",
  },
}));
const Title = styled("h2")({
  // backgroundColor:"red"
});
function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const cart = useSelector((state) => state.cart.mycart);
  const user = useSelector((state) => state.user.currentUser);
  const [authorized, setAuthorized] = useState(false);

  const initialFValues = {
    id: 0,
    username: "",
    password: "",
  };

  useEffect(() => {
    // redirect to home if already logged in
    const path = router.asPath;
    console.log("PATH IN LOGIN", path);
    const returnUrl = router.query.returnUrl;
    console.log("QUERY IN LOGIN", returnUrl);
    user && router.push(returnUrl || "/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  // useEffect(() => {
  //   // on initial load - run auth check
  //   authCheck(router.asPath);
  //   // on route change start - hide page content by setting authorized to false
  //   const hideContent = () => setAuthorized(false);
  //   router.events.on("routeChangeStart", hideContent);
  //   // on route change complete - run auth check
  //   router.events.on("routeChangeComplete", authCheck);
  //   // unsubscribe from events in useEffect return function
  //   return () => {
  //     router.events.off("routeChangeStart", hideContent);
  //     router.events.off("routeChangeComplete", authCheck);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // function authCheck(url) {
  //   // redirect to login page if accessing a private page and not logged in
  //   // setUser(userService.userValue);

  //   const publicPaths = ["/login", "/register"];
  //   const path = url.split("?")[0];
  //   console.log("URL", url);
  //   console.log("PATH", path);
  //   if (user && publicPaths.includes(path)) {
  //     setAuthorized(false);
  //     router.push("/");
  //   } else {
  //     setAuthorized(true);
  //   }
  // }

  //   useEffect(() => {
  //     user && router.push("/");
  //   }, []);

  //   useEffect(() => {
  //      console.log("Values",values)
  //      imgProduct?.name && ( /\.(jpe?g|png|gif|bmp)$/i).test(imgProduct?.name)?setErrors({...errors,imgProduct:""}):setErrors({...errors,imgProduct:"Required"})
  //     }, [imgProduct]);

  const validate = (fieldValues = values) => {
    // let iscaract = Object.keys(inputCart).length === 0;
    let temp = { ...errors };

    if ("username" in fieldValues)
      temp.username = /$^|.+@.+..+/.test(fieldValues.username)
        ? ""
        : "Email invalide.";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "Champ Obligatoire.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values)
      return Object.values(temp).every((item) => item == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useFormLogin(initialFValues, true, validate);

  const loginUser = () => {
    console.log("VALUES", { values, idCart: cart?.id });
    login(dispatch, {
      ...values,
      // idCart: cart ? cart.id : null,
    });
    // router.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      loginUser();
    }
  };
  return (
    // authorized && (

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
            <Title>Connexion</Title>
            <Link href="/register">
              <Typography
                sx={{
                  textDecoration: "underline",
                  color: "blue",
                  cursor: "pointer",
                }}
              >
                {" "}
                Ouvrir un compte
              </Typography>
            </Link>
          </Box>
          <Form onSubmit={handleSubmit}>
            <Box>
              <Box>
                <Grid
                  container
                  spacing={{ xs: 2, sm: 2 }}
                  columns={{ xs: 4, sm: 8 }}
                >
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

                  <Grid item xs={4} sm={8}>
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
    // )
  );
}

export default Login;
