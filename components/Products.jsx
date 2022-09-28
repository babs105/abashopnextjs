import { useEffect, useState } from "react";
// import { popularProducts } from "../data";
import Product from "./Product";
// import axios from "axios";
import moment from "moment";
// import { getAllProduct, getAllProductByCat } from "../redux/productRedux/callProductApi";
import { productActions } from "../redux/productRedux/productActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Card, Grid, Skeleton, Typography, Stack, Box } from "@mui/material";
import SearchNotFound from "./SearchNotFound";

// const Container = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
// `;

const Products = ({
  searchName,
  cat,
  filters = { color: "", size: "" },
  sort,
  products,
  title,
}) => {
  const dispatch = useDispatch();
  // const products = useSelector((state) => state.product.products);

  const isFetching = useSelector((state) => state.product.isFetching);

  const [filteredProducts, setFilteredProducts] = useState([]);

  // useEffect(() => {
  //   console.log("categorie", cat);
  console.log("sort", sort);
  //   cat
  //     ? productActions.getAllProductByCat(dispatch, cat)
  //     : productActions.getAllProduct(dispatch);
  // }, [cat]);

  useEffect(() => {
    console.log("searchName", searchName);
    searchName
      ? setFilteredProducts(
          products.filter((product) =>
            product.name.toLowerCase().includes(searchName.toLowerCase())
          )
        )
      : setFilteredProducts(products);
  }, [searchName]);

  useEffect(() => {
    console.log("filters", filters);
    const getFilteredProducts = () => {
      const foundPro = [];
      products.map((product, index) => {
        product.caract.filter((item) => {
          let isFound = Object.entries(filters).every(
            ([key, value]) => item[key] === value
          );
          console.log("foundpro", foundPro);
          isFound &&
            foundPro.length !== 0 &&
            foundPro?.caract?.map(
              (ct) =>
                ct.color !== product.caract[index].color &&
                foundPro.push(product)
            );

          if (isFound && foundPro.length === 0) foundPro.push(product);
        });
      });
      console.log("filtrProduct", foundPro);
      setFilteredProducts(foundPro);
    };

    // filters
    // Object.values(filters).length !== 0 ? getFilteredProducts():setFilteredProducts(products);
    filters.color !== "" && filters.size !== ""
      ? getFilteredProducts()
      : setFilteredProducts(products);
  }, [products, cat, filters.color, filters.size]);

  useEffect(() => {
    // console.log('FilterPrduct Critere',filteredProducts)

    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.caract[0].price - b.caract[0].price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.caract[0].price - a.caract[0].price)
      );
    }
  }, [sort]);

  return (
    <Box sx={{ backgroundColor: "#f5f8fc" }}>
      <Card
        variant="outlined"
        sx={{
          height: "70%",
          margin: "20px 60px",
          padding: "15px",
        }}
      >
        {console.log(" products filter", filteredProducts)}
        <Typography
          variant="h5"
          gutterBottom={true}
          //  sx={{ textAlign: "center" }}
        >
          {title}
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 6 }} columns={{ xs: 4, sm: 12 }}>
          {isFetching ? (
            // <Stack spacing={1}>
            //   <Skeleton variant="text" height={100} />
            //   <Skeleton variant="text" height={20} />
            //   <Skeleton variant="text" height={20} />
            //   <Skeleton variant="rectangular" height={300} />
            // </Stack>
            <>
              <Grid item xs={4} sm={3}>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} />
              </Grid>
              <Grid item xs={4} sm={3}>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} />
              </Grid>
              <Grid item xs={4} sm={3}>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} />
              </Grid>
              <Grid item xs={4} sm={3}>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} />
              </Grid>
            </>
          ) : // filters ?
          filteredProducts.length !== 0 ? (
            filteredProducts?.map((item, index) => (
              <Grid item xs={4} sm={3} key={index}>
                <Product item={item} key={item.id} />
              </Grid>
            ))
          ) : (
            <Grid item xs={4} sm={12}>
              {/* <Product item={item} key={item.id} /> */}
              <SearchNotFound searchQuery={searchName} />
            </Grid>
          )}
        </Grid>
      </Card>
    </Box>
  );
};
export default Products;
