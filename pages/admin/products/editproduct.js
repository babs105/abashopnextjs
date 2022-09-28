import React, { useEffect, useRef, useState } from "react";
import Controls from "../../../components/controls/Controls";
import { productActions } from "../../../redux/productRedux/productActions";
import {
  Box,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  styled,
  Typography,
  Tooltip,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";

import Iconify from "../../../components/Iconify";
import InputCaract from "../../../components/controls/InputCaract";
import faker from "@faker-js/faker";
import { useForm2, Form } from "../../../hooks/useForm2";
import useSWR from "swr";
import { useRouter } from "next/router";
import { userService } from "../../../service/userService";
import { productService } from "../../../service/productService";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { BASEURL } from "../../../utils/baseUrl";

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

const DetailsCommandeContainer = styled("div")({
  flex: 2,
  // minWidth:"50%"
  /* ${mobile({ padding: "10px" })} */
});

const ImageProduct = styled("img")(({ theme }) => ({
  width: "200px",
  height: "180px",
  border: "4px solid teal",
  borderRadius: "20px",

  // [theme.breakpoints.down("sm")]: {

  // },
}));

const fetcherFunc = (url) => {
  console.log("CALL SWR");
  return axios.get(url).then((res) => res.data);
};

function EditProduct({ productInit }) {
  const router = useRouter();
  // const { id } = router.query;
  const [keyword, setKeyword] = useState(null);
  const hasMounted = useRef(false);
  const dispatch = useDispatch();
  const [imgPreview, setImgPreview] = useState("");
  const [imgProduct, setImgProduct] = useState(null);

  const initialFValues = {
    id: 0,
    name: "",
    desc: "",
    categories: [],
    caract: [
      {
        id: faker.datatype.uuid(),
        color: "",
        size: "",
        quantity: "",
        price: "",
      },
    ],
  };
  const { data: product, error } = useSWR(
    keyword ? `${BASEURL}/product/getProductById/${keyword}` : null,
    fetcherFunc,
    {
      // revalidateOnFocus: false,
      // fallbackData: hasMounted.current ? undefined : userInit,
      // fallbackData: key === initialKey ? userInit : null,
      // revalidateOnMount: true,
      fallbackData: hasMounted.current ? undefined : productInit,
    }
  );

  useEffect(() => {
    console.log("mounted");
    hasMounted.current = true;
  }, []);
  useEffect(() => {
    setKeyword(router.query.id);
    setValues({ ...product });
  }, [router.isReady]);

  useEffect(() => {
    console.log("Values", values);
    if (imgProduct) {
      imgProduct.name && /\.(jpe?g|png|gif|bmp)$/i.test(imgProduct?.name)
        ? setErrors({ ...errors, imgProduct: "" })
        : setErrors({ ...errors, imgProduct: "Required" });
    } else {
      setErrors({ ...errors, imgProduct: "" });
    }
  }, [imgProduct]);
  const handleFile = (e) => {
    setImgPreview(URL.createObjectURL(e.target.files[0]));
    setImgProduct(e.target.files[0]);
  };

  const validate = (fieldValues = values, inputCart = {}) => {
    let iscaract = Object.keys(inputCart).length === 0;
    console.log("iscaract", iscaract);
    console.log("img", fieldValues.imgProduct);
    let temp = [];
    let temp2 = {};
    if ("name" in fieldValues)
      temp2.name = fieldValues.name ? "" : "Champ obligation";
    if ("desc" in fieldValues)
      temp2.desc = fieldValues.desc ? "" : "Champ obligation";
    if ("categories" in fieldValues)
      temp2.categories =
        fieldValues.categories.length != 0 ? "" : "Champ obligation";
    if ("caract" in fieldValues) {
      if (fieldValues.caract.length != 0) {
        temp = values.caract?.map((ct) => {
          if (ct.color === "") return { color: "Champ obligation", id: ct.id };
          if (ct.size === "") return { size: "Champ obligation", id: ct.id };
          if (ct.quantity === "")
            return { quantity: "Champ obligation", id: ct.id };
          if (ct.price === "") return { price: "Champ obligation", id: ct.id };
        });
      }
    }
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
        });
      }
      if ("color" in fieldValues) {
        temp = values.caract?.map((ct) => {
          if (ct.id === inputCart?.id) {
            if (fieldValues.color) {
              console.log("no error");
              return { color: "", id: ct.id };
            } else {
              return { color: "Champ obligation", id: ct.id };
            }
          }
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
        });
      }
      if ("quantity" in fieldValues) {
        temp = values.caract?.map((ct) => {
          if (ct.id === inputCart?.id) {
            if (fieldValues.quantity) {
              console.log("no error");
              return { quantity: "", id: ct.id };
            } else {
              return { quantity: "Champ obligation", id: ct.id };
            }
          }
        });
      }
    }
    setErrors({
      ...temp,
      ...temp2,
    });
    console.log("temp2", temp2);
    console.log("temp", temp);
    console.log("errors", errors);
    if (fieldValues == values)
      if (temp[0] === undefined) {
        console.log("validations");
        return Object.values(temp2).every((item) => item == "");
      } else {
        return (
          Object.values(temp2).every((item) => item == "") &&
          Object.values(temp).every((item) => item == "")
        );
      }
  };

  const addCaract = () => {
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

  const editerProduct = () => {
    const formData = new FormData();
    formData.append("imgProduct", imgProduct);
    formData.append("product", JSON.stringify(values));
    productActions.updateProduct(dispatch, formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      editerProduct();
    }
  };

  if (!product) return <div>Loading... </div>;
  if (error) return <div>Erreur </div>;
  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4">Editer Produit</Typography>
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
                  <Grid item xs={4} sm={12}>
                    <ImageProduct
                      src={
                        imgPreview
                          ? imgPreview
                          : `data:image/*;base64,${product.img}`
                      }
                    />
                  </Grid>
                  <Grid item xs={4} sm={6}>
                    {/* <Button component="label"> <PhotoCamera fontSize="medium"/> <Typography>{selectedFile ? selectedFile.name : "Selectionnner Image"}</Typography>. . . */}

                    <Controls.Input
                      label="Image"
                      name="imgProduct"
                      defaultValue={imgProduct}
                      accept="image/*"
                      onChange={handleFile}
                      error={imgProduct && errors.imgProduct}
                      size="small"
                      fullWidth
                      // sx={{
                      //   //  display:"none"
                      //  }}
                      type="file"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhotoCamera fontSize="medium" />
                          </InputAdornment>
                        ),
                      }}
                    />
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
                    <Controls.Input
                      name="categories"
                      label="Categories"
                      value={values.categories}
                      onChange={handleInputChange}
                      error={errors.categories}
                      fullWidth
                      size="small"
                    />
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
                          sx={{ color: "blue" }}
                        >
                          <Iconify icon="eva:plus-fill" />
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
                          values={values}
                          errors={errors}
                          onChange={(ev) => handleInputChange(ev, ct)}
                        />
                        <Grid item xs={4} sm={3}>
                          <IconButton
                            onClick={() => removeCaract(ct.id)}
                            disabled={values.caract.length <= 1}
                            sx={{ color: "red" }}
                            // size='small'
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
                        text="Modifier"
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
        <ToastContainer />
      </Container>
    </>
  );
}

EditProduct.auth = true;
EditProduct.layout = "profile";
export default EditProduct;
export async function getServerSideProps(context) {
  //req res query IN CONTEXT
  // const { token } = cookies(context);
  const id = context.query.id;

  console.log("Id", id);

  try {
    const data = await productService.getProductById(id);
    console.log("get product data");
    // const initialKey = buildKey(id);
    return { props: { productInit: data } };
  } catch (err) {
    return { props: { error: "Something went wrong." } };
  }
}
