import React, { useEffect, useState } from "react";
import Controls from "../../../../components/controls/Controls";
import { addCategory } from "../../../../redux/categoryRedux/callCategoryApi";
import {
  Backdrop,
  Box,
  Button,
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

import { useForm, Form } from "../../../../hooks/useFormAddCat";
import { categoryService } from "../../../../service/categoryService";
import { baseUrl } from "../../../../config";
import authHeader from "../../../../utils/authheader";
import { toast, ToastContainer } from "react-toastify";

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
const ResumeCommandeContainer = styled("div")({
  flex: 1,

  /* ${mobile({ padding: "10px" })} */
});
const ResumeCommande = styled("div")({
  backgroundColor: "#eee",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  // alignItems:"start",
  gap: "15px",
});
const CommandeTitle = styled("h4")({
  color: "teal",
});
const HeadTable = styled(Box)({
  display: "flex",
  // width:"280px",
  justifyContent: "space-between",
  alignItems: "center",
  color: "teal",
  fontWeight: "bold",
});

const ProductContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});
const ProductItem = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  // width:"280px",
});
const ProductDescQty = styled("div")({
  fontSize: "14px",
  // width:"60%",
});
const TotalProduct = styled("div")({
  fontSize: "15px",
  // width:"40%"
});
const SousTotalContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});
const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "30%",
  top: 0,
  right: "30%",
  // bottom:0,
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "white",
  boxShadow: 24,
  // border:0,
  outline: 0,
  height: "100%",
  overflowY: "auto",
  px: 8,
  py: 2,
  [theme.breakpoints.down("sm")]: {
    left: 0,
    top: "30%",
    right: 0,
    bottom: "30%",
    margin: "auto",
  },
}));
const CloseModalContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",

  [theme.breakpoints.down("sm")]: {},
}));
const CloseModalButton = styled(IconButton)(({ theme }) => ({
  padding: "10px",
  margin: "10px",
  [theme.breakpoints.down("sm")]: {},
}));
const WrapperButtonPaid = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "90%",
  padding: "10px",

  [theme.breakpoints.down("sm")]: {},
}));
const LabelInputFile = styled("label")(({ theme }) => ({
  border: " 1px solid black",
  bordeRadius: "3px",
  padding: "3px",

  // [theme.breakpoints.down("sm")]: {

  // },
}));

function AddCategory({}) {
  // const cart = location.state;
  //   const dispatch = useDispatch();
  //   const isFetching = useSelector((state) => state.order.isFetching);

  const [imgCategory, setImgCategory] = useState(null);
  // const [cart, setCart] = useState(location.state);

  const initialFValues = {
    id: 0,
    categoryName: "",
    description: "",
    type: "",
    title: "",
  };

  useEffect(() => {
    console.log("Values", values);

    imgCategory?.name && /\.(jpe?g|png|gif|bmp)$/i.test(imgCategory?.name)
      ? setErrors({ ...errors, imgCategory: "" })
      : setErrors({ ...errors, imgCategory: "Required" });
  }, [imgCategory]);
  const handleFile = (e) => {
    // setCat(e.target.value.split(","));
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

  const uploadToServer = () => {
    console.log("VALUES", values);
    const formData = new FormData();
    formData.append("imgCategory", imgCategory);
    formData.append("category", JSON.stringify(values));
    // console.log("data", formData.get("category"));
    console.log("image", formData.get("imgCategory"));
    // addCategory(dispatch, formData);
    // console.log("values",values)
  };

  const createCategory = async () => {
    let formData = new FormData();
    formData.append("imgCategory", imgCategory);
    // formData.append("category", values);
    formData.append("categoryName", values.categoryName);
    formData.append("description", values.description);
    formData.append("type", values.type);
    formData.append("title", values.title);

    // console.log("image", formData.get("imgCategory"));
    // console.log("categoryName", formData.get("categoryName"));
    // console.log("description", formData.get("description"));
    // console.log("type", formData.get("type"));
    // console.log("title", formData.get("title"));

    try {
      // const response = await fetch(`${baseUrl}/admin/category/create`, options);
      const res = await categoryService.create(formData);
      if (!res.hasError) {
        toast.success("Categorie Ajoutee avec Succes");
      }
    } catch (error) {
      console.log("ADD CATEGORIE ERROR ", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("passer test");
      createCategory();
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
          <Typography variant="h4">Nouvelle Categorie</Typography>
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
              <ToastContainer />
            </Wrapper>
          </Form>
        </Card>
      </Container>
    </>
  );
}
AddCategory.auth = true;
AddCategory.layout = "profile";
export default AddCategory;
