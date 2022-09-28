import React, { useEffect, useRef, useState } from "react";
import Controls from "../../../../components/controls/Controls";
import cookies from "next-cookies";

import { ToastContainer, toast } from "react-toastify";
import {
  Box,
  Card,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Stack,
  Select,
  styled,
  Typography,
  FormHelperText,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";

import { Form, useFormRegister } from "../../../../hooks/useFormRegister";
import { useRouter } from "next/router";
import { baseUrl } from "../../../../config";
import User from "../../../../models/user";
import { isAdmin } from "../../../../utils/getRoles";
import dbConnect from "../../../../repository/connectMongo";
import { usersRepo } from "../../../../repository/users";

// url(https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)
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

// async function fetcherFunc(url) {
//   try {
//     const response = await fetchWrapper.get(url);
//     if (!response.hasError) {
//       console.log("success swr", response.body);
//       return response.body;
//     }
//     if (response.hasError) {
//       console.log("error swr", response.errorMessage);
//       return response.errorMessage;
//     }
//   } catch (error) {
//     console.log("error swr", error);
//   }
// }

function EditUser({ user }) {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState(null);
  const hasMounted = useRef(false);
  const [showPassword, setShowPassword] = useState(false);

  const [changerPwd, setChangerPwd] = useState(false);
  const [roleName, setRoleName] = useState([]);
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
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log("value", value);
    setRoleName(typeof value === "string" ? value?.split(",") : value);
    setValues({ ...values, roles: value });
  };
  const initialFValues = {
    id: 0,
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    address: "",
    telephone: "",
    roles: "",
  };

  //   const { data: user, error } = useSWR(
  //     router.query.id ? `${baseUrl}/admin/users/edit/${router.query.id}` : null,
  //     fetcherFunc
  // {
  //   //   // revalidateOnFocus: false,
  //   //   // fallbackData: hasMounted.current ? undefined : userInit,
  //   //   // fallbackData: key === initialKey ? userInit : null,
  //   //   // revalidateOnMount: true,
  //   fallbackData: hasMounted.current && undefined,
  // }
  //   );
  //   useEffect(() => {
  //     console.log("mounted");
  //     hasMounted.current = true;
  //   }, []);
  useEffect(
    () => {
      //   console.log("ready", router.isReady);
      //   // if (router.isReady) {
      //   //   setKeyword(router.query.id);
      //   console.log("USERID", user);
      setValues({
        ...user,
        id: user._id,
        confirmPassword: user?.password,
      });
      setRoleName(user?.roles?.map((role) => role));
      //   // }
    },
    [
      // router.isReady, router.query.id
    ]
  );

  useEffect(() => {
    console.log("change role");
    if (values.roles?.length !== 0) {
      setTemp1({ roles: "" });
    } else {
      setTemp1({ roles: "Champs Obligatoire" });
    }
  }, [roleName]);

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
    // if ("roles" in fieldValues) {
    //   console.log("roles change");
    //   temp.roles = fieldValues.roles.length !== 0 ? "" : "Champ Obligatoire.";
    // }
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
      if (
        Object.values(temp).every((item) => item == "") &&
        Object.values(temp1).every((item) => item == "")
      ) {
        console.log("test ok");

        return true;
      } else return false;
    }
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useFormRegister(initialFValues, true, validate);

  const updateUserInfo = () => {
    console.log("VALUES", values);
    updateUser(dispatch, {
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
  //   if (!router.isReady) return <div>Loading... </div>;
  //   if (!user) return <div>Loading... </div>;
  //   if (error) return <div>Erreur </div>;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4">Editer User</Typography>
          {/* {user.firstName} */}
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
                    <Grid item xs={4} sm={6}>
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
                          defaultValue={[]}
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
                    </Grid>
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
                                password: user?.password,
                                confirmPassword: user?.password,
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
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
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
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
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
            </Wrapper>
          </Form>
        </Card>
        <ToastContainer />
      </Container>
    </>
  );
}
EditUser.auth = true;
EditUser.layout = "profile";
export default EditUser;

// export async function getStaticPaths() {
//   //   const res = await fetchWrapper.get(`${baseUrl}/admin/users`);
//   //   console.log("users", res);
//   //   const paths = res.body.map((user) => ({
//   //     params: { id: user._id.toString() },
//   //   }));
//   //   return {
//   //     paths: paths.slice(0, 1),
//   //     fallback: true,
//   //   };
//   const users = await User.find({});
//   const paths = users.map((user) => ({
//     params: { id: user._id.toString() },
//   }));
//   return {
//     paths: paths,
//     // [
//     //   {
//     //     params: {
//     //       id: "632a16243ba1868271ffe712",
//     //     },
//     //   },
//     // ],
//     fallback: true,
//   };
// }

// export async function getStaticProps(context) {
//   console.log("CONTEXT", context);
//   const { params } = context;
//   const { id } = params;
//   // Fetch data from external API

//   //   const res = await fetchWrapper.get(`${baseUrl}/admin/users/edit/${id}`);
//   //   // const data = await response.json();
//   //   console.log("Data", res);
//   const { token } = cookies(context);
//   console.log("token", token);
//   const response = await fetch(
//     `${baseUrl}/admin/users/edit/632a16243ba1868271ffe712`,
//     {
//       method: "GET",
//       // headers: { Authorization: `Bearer ${token}` },
//     }
//   );
//   //   const response = await axios
//   //     .create({
//   //       // headers: { Authorization: `Bearer ${token}` },
//   //       headers: {
//   //         Authorization: authHeader(`${baseUrl}/admin/users/edit/${id}`),
//   //       },
//   //     })
//   //     .get(`${baseUrl}/admin/users/edit/${id}`);
//   //   const res = await fetchWrapper.get(`${baseUrl}/admin/users/edit/${id}`);

//   const resp = await response.json();
//   //   const res = await response.data;
//   console.log("Data User", resp.body);

//   if (!resp.hasError) {
//     return {
//       props: {
//         user: resp.body,
//       },
//     };
//   } else {
//     return {
//       props: {
//         user: null,
//       },
//     };
//   }
// await dbConnect();
// const user = await User.findOne({ _id: id });
// console.log("User", user);
// // Pass data to the page via props
// return { props: { user: JSON.parse(JSON.stringify(user)) } };
// }

export async function getServerSideProps(context) {
  const { id } = context.query;
  // //   const { id } = context.params;
  // const { token } = cookies(context);
  // //   console.log("token", token);
  // const response = await fetch(`${baseUrl}/admin/users/edit/${id}`, {
  //   method: "GET",
  //   headers: { Authorization: `Bearer ${token}` },
  // });

  if (isAdmin(context.req.cookies.token)) {
    const user = await usersRepo.getUserById(id);
    if (user) {
      return { props: { user: JSON.parse(JSON.stringify(user)) } };
    } else return { props: { user: null } };
    // try {
    //   await dbConnect();
    //   const user = await User.findOne({ _id: id });
    //   return { props: { user: JSON.parse(JSON.stringify(user)) } };
    // } catch (error) {
    //   console.log("Erreur", error);
    //   return { props: { user: null } };
    // }
  } else {
    return { redirect: { destination: "/adminonly", permanent: false } };
  }

  //   const response = await axios
  //     .create({
  //       // headers: { Authorization: `Bearer ${token}` },
  //       headers: {
  //         Authorization: authHeader(`${baseUrl}/admin/users/edit/${id}`),
  //       },
  //     })
  //     .get(`${baseUrl}/admin/users/edit/${id}`);
  //   const res = await fetchWrapper.get(`${baseUrl}/admin/users/edit/${id}`);

  // const res = await response.json();
  // //   const res = await response.data;
  // console.log("Data User", res.body);

  // if (!res.hasError) {
  //   return {
  //     props: {
  //       user: res.body,
  //     },
  //   };
  // } else {
  //   return {
  //     props: {
  //       user: null,
  //     },
  //   };
  // }
  //   return { notFound: true,}
  // return { redirect: { destination: '/post', permanent: false, },}

  //   await dbConnect();
  //   const user = await User.findOne({ _id: id });
  //   console.log("User", user);
  //   //   Pass data to the page via props
  //   return { props: { user: JSON.parse(JSON.stringify(user)) } };
  //   return { props: { user: { ...data.body } } };
}
