import { Box, Grid, Stack, styled, Typography, Card } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { categories } from "../data";
import { getAllCategory } from "../redux/categoryRedux/callCategoryApi";
import CategoryItem from "./CategoryItem";

const Container = styled(Stack)(({ theme }) => ({}));

const Categories = ({ categories, errcat }) => {
  const dispatch = useDispatch();

  // const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    // getAllCategory(dispatch);
  }, []);

  return (
    // <Container>
    //   {categories.map((item) => (
    //     <CategoryItem item={item} key={item.id} />
    //   ))}
    // </Container>
    //     <Stack direction={{ xs: 'column', sm: 'row' }}
    //   spacing={{ xs: 1, sm: 2, md: 4 }}
    // >
    //  {categories.map((item) => (
    //         <CategoryItem item={item} key={item.id} />
    //       ))}
    // </Stack>
    <Card
      variant="outlined"
      sx={{
        height: "70%",
        margin: "40px 0px",
        padding: "15px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography
          variant="h5"
          gutterBottom={true}
          //  sx={{ textAlign: "center" }}
          sx={{ borderBottom: 2, borderBottomColor: "teal" }}
        >
          Nos Collections{" "}
        </Typography>
      </Box>
      <Grid container spacing={{ xs: 2, sm: 6 }} columns={{ xs: 4, sm: 12 }}>
        {!categories && !errcat && (
          <h1
            style={{
              color: "teal",
              textAlign: "center",
              width: "100vw",
              margin: "auto",
            }}
          >
            CHARGEMENT ...
          </h1>
        )}
        {categories?.map((item, index) => {
          return (
            item.type === "normal" && (
              <Grid item xs={4} sm={4} key={index}>
                <CategoryItem item={item} key={item.id} />
              </Grid>
            )
          );
        })}
      </Grid>
    </Card>
  );
};

export default Categories;
