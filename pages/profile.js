import React, { useEffect, useState } from "react";
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
// import Page from "../components/Page";
import { Form, useFormRegister } from "../hooks/useFormRegister";
import Controls from "../components/controls/Controls";
import { updateProfile } from "../redux/userRedux/callUserApi";
import Espace from "./espace";
// import Page from "../../../../components/Page";
const Container = styled("div")({
  width: "100%",
  // backgroundColor:"red"
});
const Wrapper = styled(Box)(({ theme }) => ({
  // margin:"20px 0px",
  // width:"100%",
  padding: "30px",
  display: "flex",
  flex: "wrap",
  gap: "10px",
  [theme.breakpoints.down("sm")]: {
    // width:"100%",
    flexDirection: "column",
    // padding: "10px",
  },
}));

const Title = styled("h2")({
  // backgroundColor:"red"
});
function Profile() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  // const cart = useSelector((state) => state.cart.mycart);
  // const [error, setError] = useState(false);
  const [changerPwd, setChangerPwd] = useState(false);
  // const [roleName, setRoleName] = useState([]);
  const [temp1, setTemp1] = useState({ roles: "" });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  // let temp1 = {};
  const ROLES = [
    { id: "61c8a786852e5cef8f75f4b8", name: "ROLE_USER" },
    { id: "61c8a7da852e5cef8f75f4b9", name: "ROLE_ADMIN" },
    { id: "61c8a824852e5cef8f75f4ba", name: "ROLE_MODERATOR" },
  ];

  const initialFValues = {
    id: 0,
    firstName: "",
    lastName: "",
    password: "",
    username: "",
    confirmPassword: "",
    address: "",
    telephone: "",
  };

  useEffect(() => {
    setValues({
      ...user,
      firstName: user.firstName,
      lastName: user.lastName,
      // password: user.password,
      username: user.username,
      // confirmPassword: user.password,
      address: user.address,
      telephone: user.telephone,
      roles: user.roles,
    });
    // setRoleName(user.roles.map((role) => role.name));
  }, []);
  // useEffect(() => {
  //   console.log("change role");
  //   if (values.roles.length !== 0) {
  //     setTemp1({ roles: "" });
  //   } else {
  //     setTemp1({ roles: "Champs Obligatoire" });
  //   }
  // }, [roleName]);

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
    if (changerPwd) {
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
    }
    setErrors({
      ...temp,
    });

    if (fieldValues == values) {
      // if (
      // Object.values(temp).every((item) => item == "");
      // &&
      // Object.values(temp1).every((item) => item == "")
      // ) {
      //   console.log("test ok");

      return Object.values(temp).every((item) => item == "");
      // } else return false;
    }
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useFormRegister(initialFValues, true, validate);

  const updateUserInfo = () => {
    console.log("VALUES", values);
    updateProfile(dispatch, {
      ...values,
      password: changerPwd ? values.password : null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateUserInfo();
    }
  };
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ padding: { xs: "8px", sm: "10px" } }}
        mb={2}
      >
        <Typography variant="h4">Mon Profile</Typography>
      </Stack>
      <Card>
        <Form onSubmit={handleSubmit}>
          <Wrapper>
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
                      disabled
                      size="small"
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
                  {/* <Grid item xs={4} sm={6}>
                      <FormControl
                        sx={{ m: 1, width: 300 }}
                        // error={errors.roles}
                        {...(temp1.roles && { error: true })}
                      >
                        <InputLabel id="demo-multiple-chip-label">
                          Roles
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          multiple
                          value={roleName}
                          onChange={handleChange}
                          // error={errors.roles}
                          input={
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Chip"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {ROLES.map((role, index) => (
                            <MenuItem
                              key={role.id}
                              value={role.name}
                              //   style={getStyles(name, personName, theme)}
                            >
                              {role.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {temp1.roles && (
                          <FormHelperText>{temp1.roles}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid> */}
                  {
                    <Grid item xs={4} sm={12}>
                      <Controls.Checkbox
                        name="changerPwd"
                        label="Changer Mot de Passe ?"
                        value={changerPwd}
                        onChange={(e) => {
                          setChangerPwd(e.target.value);
                          if (e.target.value === true)
                            setValues({
                              ...values,
                              password: "",
                              confirmPassword: "",
                            });
                          if (e.target.value === false)
                            setValues({
                              ...values,
                              password: user.password,
                              confirmPassword: user.password,
                            });
                          setErrors({
                            ...errors,
                            password: "",
                            confirmPassword: "",
                          });
                        }}
                      />
                    </Grid>
                  }
                  {changerPwd && (
                    <>
                      <Grid item xs={4} sm={6}>
                        <Controls.Input
                          name="password"
                          label="Nouveau Mot de Passe"
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
                    </>
                  )}

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
                        text="MODIFIER"
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
          </Wrapper>
        </Form>
      </Card>
    </Container>
  );
}
Profile.layout = "profile";
Profile.auth = true;
export default Profile;
