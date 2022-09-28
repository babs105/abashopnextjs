import React, { useEffect, useRef, useState } from "react";
import Controls from "../../../components/controls/Controls";
import { updateCategory } from "../../../redux/categoryRedux/callCategoryApi";
import {
  Box,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

import { useForm, Form } from "../../../hooks/useFormAddCat";
import axios from "axios";
import useSWR from "swr";
import { categoryService } from "../../../service/categoryService";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
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

const ImageCategory = styled("img")(({ theme }) => ({
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
function EditCategory({ categoryInit }) {
  const [imgCategory, setImgCategory] = useState(null);
  const [imgPreview, setImgPreview] = useState("");
  const [keyword, setKeyword] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const hasMounted = useRef(false);
  const initialFValues = {
    id: 0,
    categoryName: "",
    description: "",
    type: "",
    title: "",
  };

  const { data: category, error } = useSWR(
    keyword ? `${BASEURL}/category/getCategoryById/${keyword}` : null,
    fetcherFunc,
    {
      // revalidateOnFocus: false,
      // fallbackData: hasMounted.current ? undefined : userInit,
      // fallbackData: key === initialKey ? userInit : null,
      // revalidateOnMount: true,
      fallbackData: hasMounted.current ? undefined : categoryInit,
    }
  );
  useEffect(() => {
    console.log("mounted");
    hasMounted.current = true;
  }, []);
  useEffect(() => {
    setKeyword(router.query.id);
    setValues({ ...category });
  }, [router.isReady]);

  useEffect(() => {
    if (imgCategory) {
      imgCategory?.name && /\.(jpe?g|png|gif|bmp)$/i.test(imgCategory?.name)
        ? setErrors({ ...errors, imgCategory: "" })
        : setErrors({ ...errors, imgCategory: "Required" });
    } else {
      setErrors({ ...errors, imgCategory: "" });
    }
  }, [imgCategory]);
  const handleFile = (e) => {
    setImgPreview(URL.createObjectURL(e.target.files[0]));
    setImgCategory(e.target.files[0]);
  };

  const validate = (fieldValues = values) => {
    console.log("img", fieldValues.imgCategory);

    let temp = { ...errors };

    if ("categoryName" in fieldValues)
      temp.categoryName = fieldValues.categoryName ? "" : "Champ obligation";
    if ("description" in fieldValues)
      temp.description = fieldValues.description ? "" : "Champ obligation";
    if ("type" in fieldValues)
      temp.type = fieldValues.type ? "" : "Champ obligation";
    if ("title" in fieldValues)
      temp.title = fieldValues.title ? "" : "Champ obligation";

    //  temp.caract = fieldValues.caract.length != 0 ? "" : "This field is required."

    setErrors({ ...temp });
    console.log("temp", temp);
    console.log("errors", errors);
    if (fieldValues == values)
      return Object.values(temp).every((item) => item == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const updateCategories = () => {
    console.log("VALUES", values);
    const formData = new FormData();
    formData.append("imgCategory", imgCategory);
    formData.append("category", JSON.stringify(values));
    console.log("data", formData.get("category"));
    console.log("image", formData.get("imgCategory"));
    updateCategory(dispatch, formData);
    // console.log("values",values)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("passer test");
      updateCategories();
    }
  };
  if (!category) return <div>Loading... </div>;
  if (error) return <div>Erreur </div>;

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h4">Editer Categorie</Typography>
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
                    <ImageCategory
                      src={
                        imgPreview
                          ? imgPreview
                          : `data:image/*;base64,${category.categoryImg}`
                        //   : `data:image/*;base64,${product.img}`
                      }
                    />
                  </Grid>
                  <Grid item xs={4} sm={6}>
                    {/* <Button component="label"> <PhotoCamera fontSize="medium"/> <Typography>{selectedFile ? selectedFile.name : "Selectionnner Image"}</Typography>. . . */}

                    <Controls.Input
                      label="Image"
                      name="imgCategory"
                      defaultValue={imgCategory}
                      accept="image/*"
                      // value={""}
                      onChange={handleFile}
                      // handleInputChange(e)
                      // }}
                      // error={( /\.(jpe?g|png|gif|bmp)$/i).test(imgCategory?.name) ? setErrors({...errors,imgCategory:""}) : setErrors({...errors,imgCategory:"Champ obligation ou image non supporte"})}
                      error={imgCategory && errors.imgCategory}
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
                      name="categoryName"
                      label="Nom Categorie"
                      value={values.categoryName}
                      onChange={handleInputChange}
                      error={errors.categoryName}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4} sm={6}>
                    <Controls.Input
                      name="description"
                      label="Description"
                      value={values.description}
                      onChange={handleInputChange}
                      error={errors.description}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4} sm={6}>
                    <Controls.Input
                      name="title"
                      label="Titre"
                      value={values.title}
                      onChange={handleInputChange}
                      error={errors.title}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4} sm={6}>
                    <Controls.Input
                      name="type"
                      label="Type"
                      value={values.type}
                      onChange={handleInputChange}
                      error={errors.type}
                      fullWidth
                      size="small"
                    />
                  </Grid>

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

EditCategory.auth = true;
EditCategory.layout = "profile";
export default EditCategory;
export async function getServerSideProps(context) {
  //req res query IN CONTEXT
  // const { token } = cookies(context);
  const id = context.query.id;

  // console.log("TOKEN", token);

  try {
    // const response = await axios.get(`${BASEURL}/category/getCategoryById/${id}`);
    const data = await categoryService.getCategoryById(id);

    // console.log("get product data", resp.data);
    // const initialKey = buildKey(id);
    return { props: { categoryInit: data } };
  } catch (err) {
    return { props: { error: "Something went wrong." } };
  }
}
