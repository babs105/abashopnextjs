import React, { useEffect, useState } from "react";
import Controls from "../../../../components/controls/Controls";
import { productActions } from "../../../../redux/productRedux/productActions";
import {
  Backdrop,
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Clear,
  PhotoCamera,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import Iconify from "../../../../components/Iconify";
import InputCaract from "../../../../components/controls/InputCaract";
import faker from "@faker-js/faker";
// import { Tooltip } from "@material-ui/core";
import { Form, useForm2 } from "../../../../hooks/useForm2";
import useSWR from "swr";
import axios from "axios";
import { BASEURL } from "../../../../utils/baseUrl";
// import { getAllCategory } from "../../../../redux/categoryRedux/callCategoryApi";

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
  gap: "30px",
  [theme.breakpoints.down("sm")]: {
    // width:"100%",
    flexDirection: "column",
    // padding: "10px",
  },
}));
const Hr = styled("hr")({
  backgroundColor: "#eee",
  border: "none",
  height: "2px",
});

const DetailsCommandeContainer = styled("div")({
  flex: 2,
  // minWidth:"50%"
  /* ${mobile({ padding: "10px" })} */
});

const fetcherFunc = (url) => axios.get(url).then((res) => res.data);

function AddProduct({}) {
  // const cart = location.state;
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
  const dispatch = useDispatch();
  const [titleCat, setTitleCat] = useState([]);
  const [imgProduct, setImgProduct] = useState(null);
  const isFetching = useSelector((state) => state.order.isFetching);
  // const categories = useSelector((state) => state.category.categories);
  const [temp1, setTemp1] = useState({ categories: "" });
  const [temp3, setTemp3] = useState({ imgProduct: "" });
  // const [selectedFile, setSelectedFile] = React.useState(null);

  const { data: categories, error } = useSWR(
    `${BASEURL}/category/getAllCategory`,
    fetcherFunc
    // {
    //   initialData: products,
    //   revalidateOnMount: true,
    // }
  );

  // const handleCapture = (ev) => {
  //   setSelectedFile(ev.target.files[0]);
  // };
  // const [caract ,setCaract] = useState([{
  //   id: faker.datatype.uuid(),
  //   color:"",
  //   size:"",
  //   quantity:'',
  //   price:""
  // }
  // ])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log("value", value);
    setTitleCat(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setValues({ ...values, categories: value });
  };
  useEffect(() => {
    console.log("change cat");
    titleCat.length !== 0 &&
      values.categories.length !== 0 &&
      setTemp1({ categories: "" });
    titleCat.length !== 0 &&
      values.categories.length === 0 &&
      setTemp1({ categories: "Champs Obligatoire" });
    // titleCat.length === 0 && setTemp1({ categories: "Champs Obligatoire" });
  }, [titleCat]);
  // const [cart, setCart] = useState(location.state);

  const initialFValues = {
    id: 0,
    // imgProduct:null,
    name: "",
    desc: "",
    categories: [],
    caract: [
      {
        id: faker.datatype.uuid(),
        color: "",
        size: "",
        // quantity: "",
        price: "",
      },
    ],
  };

  // useEffect(() => {
  //   getAllCategory(dispatch);
  // }, []);

  useEffect(() => {
    console.log("Values", values);
    imgProduct &&
      imgProduct.name &&
      /\.(jpe?g|png|gif|bmp)$/i.test(imgProduct?.name) &&
      setTemp3({ imgProduct: "" });

    imgProduct &&
      imgProduct.name &&
      /\.(jpe?g|png|gif|bmp)$/i.test(imgProduct?.name) === false &&
      setTemp3({ imgProduct: "Image Obligation" });
  }, [imgProduct]);
  const handleFile = (e) => {
    // setCat(e.target.value.split(","));
    setImgProduct(e.target.files[0]);
  };

  const validate = (fieldValues = values, inputCart = {}) => {
    console.log("input to valid", inputCart);

    // iscaract = inputCart === undefined ? false : true;
    let iscaract = Object.keys(inputCart).length === 0;
    console.log("iscaract", iscaract);
    console.log("img", fieldValues.imgProduct);
    let temp = [];
    let temp2 = {};
    // if ('imgProduct' in fieldValues)
    //    temp2.imgProduct  = ( /\.(jpe?g|png|gif|bmp)$/i).test(fieldValues.imgProduct.name) ? "" : "Champ obligation ou image non supporte"
    if ("name" in fieldValues)
      temp2.name = fieldValues.name ? "" : "Champ obligation";
    if ("desc" in fieldValues)
      temp2.desc = fieldValues.desc ? "" : "Champ obligation";
    // if ("categories" in fieldValues)
    //   temp2.categories =
    //     fieldValues.categories.length != 0 ? "" : "Champ obligation";
    if ("caract" in fieldValues) {
      if (fieldValues.caract.length !== 0) {
        temp = values.caract?.map((ct) => {
          if (ct.color === "") return { color: "Champ obligation", id: ct.id };
          if (ct.size === "") return { size: "Champ obligation", id: ct.id };
          if (ct.quantity === "")
            return { quantity: "Champ obligation", id: ct.id };
          if (ct.price === "") return { price: "Champ obligation", id: ct.id };
        });
      }
    }
    //  temp.caract = fieldValues.caract.length != 0 ? "" : "This field is required."
    if (!iscaract) {
      console.log("undeeifnd true");
      if ("price" in fieldValues) {
        temp = values.caract?.map((ct) => {
          if (ct.id === inputCart?.id) {
            if (fieldValues.price) {
              console.log("no error");
              return { price: "", id: ct.id };
            } else {
              return { price: "Champ obligation", id: ct.id };
            }
          }
          // console.log("cart id",ct.id )
        });
      }
      if ("color" in fieldValues) {
        console.log("carser existe");
        // temp.color = fieldValues.color ? "" : "This field is required."
        temp = values.caract?.map((ct) => {
          if (ct.id === inputCart?.id) {
            if (fieldValues.color) {
              console.log("no error");
              return { color: "", id: ct.id };
            } else {
              return { color: "Champ obligation", id: ct.id };
            }
          }
          // console.log("cart id",ct.id )
        });
        console.log("temp", temp);
      }
      if ("size" in fieldValues) {
        console.log("carser existe");
        temp = values.caract?.map((ct) => {
          if (ct.id === inputCart?.id) {
            if (fieldValues.size) {
              console.log("no error");
              return { size: "", id: ct.id };
            } else {
              return { size: "Champ obligation", id: ct.id };
            }
          }
          // console.log("cart id",ct.id )
        });
      }
      // if ("quantity" in fieldValues) {
      //   temp = values.caract?.map((ct) => {
      //     if (ct.id === inputCart?.id) {
      //       if (fieldValues.quantity) {
      //         console.log("no error");
      //         return { quantity: "", id: ct.id };
      //       } else {
      //         return { quantity: "Champ obligation", id: ct.id };
      //       }
      //     }
      //   });
      // }
    }
    setErrors({
      ...temp,
      ...temp2,
    });
    console.log("temp3", temp3);
    console.log("temp2", temp2);
    console.log("temp1", temp1);
    console.log("temp", temp);
    console.log("errors", errors);
    if (fieldValues == values) {
      imgProduct === null && setTemp3({ imgProduct: "Image Obligation" });
      titleCat.length === 0 && setTemp1({ categories: "Champs Obligatoire" });
      if (temp[0] === undefined) {
        console.log("validations");
        return (
          Object.values(temp2).every((item) => item == "") &&
          Object.values(temp1).every((item) => item == "") &&
          Object.values(temp3).every((item) => item == "")
        );
      } else {
        return (
          Object.values(temp2).every((item) => item == "") &&
          Object.values(temp).every((item) => item == "") &&
          Object.values(temp1).every((item) => item == "")
        );
      }
    }
    //Object.values return un array des values de temp
  };

  const addCaract = () => {
    // setCaract([...caract,{id:faker.datatype.uuid(),color:"",size:"",quantity:"",price:""}])
    setValues({
      ...values,
      caract: [
        ...values.caract,
        {
          id: faker.datatype.uuid(),
          color: "",
          size: "",
          quantity: "",
          price: "",
        },
      ],
    });
  };
  const removeCaract = (key) => {
    const newCaract = values.caract.filter((ct) => ct.id !== key);
    setValues({ ...values, caract: [...newCaract] });
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm2(initialFValues, true, validate);

  const createProduct = () => {
    console.log("VALUES", values);
    const formData = new FormData();
    formData.append("imgProduct", imgProduct);
    formData.append("product", JSON.stringify(values));
    console.log("data", formData.get("product"));
    console.log("image", formData.get("imgProduct"));
    productActions.addProduct(dispatch, formData);
    // console.log("values",values)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      createProduct();
    }
  };
  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h4">Nouveau Produit</Typography>
        </Stack>
        <Card>
          <Form onSubmit={handleSubmit}>
            <Wrapper>
              <DetailsCommandeContainer>
                <Grid
                  container
                  spacing={{ xs: 2, sm: 2 }}
                  columns={{ xs: 4, sm: 12 }}
                >
                  <Grid item xs={4} sm={6}>
                    {/* <Button component="label"> <PhotoCamera fontSize="medium"/> <Typography>{selectedFile ? selectedFile.name : "Selectionnner Image"}</Typography>. . . */}

                    <Controls.Input
                      label="Image"
                      name="imgProduct"
                      defaultValue={imgProduct}
                      accept="image/*"
                      // value={""}
                      onChange={handleFile}
                      // handleInputChange(e)
                      // }}
                      // error={( /\.(jpe?g|png|gif|bmp)$/i).test(imgProduct?.name) ? setErrors({...errors,imgProduct:""}) : setErrors({...errors,imgProduct:"Champ obligation ou image non supporte"})}
                      // imgProduct &&

                      error={temp3.imgProduct}
                      size="small"
                      fullWidth
                      sx={
                        {
                          //  display:"none"
                        }
                      }
                      type="file"
                      // size="small"
                      // variant="contained"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhotoCamera fontSize="medium" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {/* </Button> */}
                  </Grid>
                  <Grid item xs={4} sm={6}>
                    <Controls.Input
                      name="name"
                      label="Nom"
                      value={values.name}
                      onChange={handleInputChange}
                      error={errors.name}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4} sm={6}>
                    <Controls.Input
                      name="desc"
                      label="Description"
                      value={values.desc}
                      onChange={handleInputChange}
                      error={errors.desc}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4} sm={6}>
                    {/* <Controls.Input
                      name="categories"
                      label="Categories"
                      value={values.categories}
                      onChange={handleInputChange}
                      error={errors.categories}
                      fullWidth
                      size="small"
                    /> */}
                    <FormControl
                      sx={{
                        // m: 1,
                        width: "100%",
                      }}
                      //  error={errors.roles}
                      {...(temp1.categories && { error: true })}
                    >
                      <InputLabel id="demo-multiple-chip-label">
                        Collections
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={titleCat}
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
                        {categories?.map((cat, index) => (
                          <MenuItem
                            key={cat.id}
                            value={cat.title}
                            //   style={getStyles(name, personName, theme)}
                          >
                            {cat.title}
                          </MenuItem>
                        ))}
                      </Select>
                      {temp1.categories && (
                        <FormHelperText>{temp1.categories}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} sm={12}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap="10px"
                      // justifyContent="space-between"
                    >
                      <Typography>Caracteristiques</Typography>
                      <Tooltip title="Ajouter ">
                        <IconButton
                          onClick={() => addCaract()}
                          // size='small'
                          sx={{ color: "blue" }}
                        >
                          <Iconify
                            icon="eva:plus-fill"
                            // sx={{color:"blue"}}
                          />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Grid>
                  {values.caract.length !== 0 &&
                    values.caract?.map((ct, index) => (
                      <React.Fragment key={ct.id}>
                        <InputCaract
                          value={ct}
                          index={index}
                          // caract={values.caract}
                          values={values}
                          errors={errors}
                          onChange={(ev) => handleInputChange(ev, ct)}
                        />
                        <Grid item xs={4} sm={3}>
                          <IconButton
                            onClick={() => removeCaract(ct.id)}
                            disabled={values.caract.length <= 1}
                            sx={{ color: "red" }}
                          >
                            <Iconify icon="eva:trash-2-fill" />
                          </IconButton>
                        </Grid>
                      </React.Fragment>
                    ))}

                  <Grid item xs={4} sm={12}></Grid>

                  <Stack
                    direction={"row"}
                    justifyContent={"flex-end"}
                    sx={{ width: "100%" }}
                  >
                    <Grid item xs={4} sm={2}>
                      <Controls.Button
                        type="submit"
                        text="Ajouter"
                        fullWidth
                        sx={{
                          backgroundColor: "primary",
                          color: "white",
                          padding: "10px",
                          margin: "30px 0px",
                          "&:hover": {
                            backgroundColor: "black",
                          },
                        }}
                      />
                    </Grid>
                  </Stack>
                </Grid>
              </DetailsCommandeContainer>
            </Wrapper>
          </Form>
        </Card>
      </Container>
    </>
  );
}

AddProduct.auth = true;
AddProduct.layout = "profile";

export default AddProduct;
