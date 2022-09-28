import { useEffect, useState } from "react";
// import { popularProducts } from "../data";
import Product from "./Product";
// import axios from "axios";
import moment from "moment";
// import { getAllProduct, getAllProductByCat } from "../redux/productRedux/callProductApi";
import { productActions } from "../redux/productRedux/productActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Box,
  Grid,
  Skeleton,
  Typography,
  Stack,
  Card,
  Button,
} from "@mui/material";
import SearchNotFound from "./SearchNotFound";
import Link from "next/link";
import Image from "next/image";

// const Container = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
// `;

const ProductsHome = ({
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
    // <Container>
    //   {cat
    //     ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
    // : products
    //     .slice(0, 8)
    //     .map((item) => <Product item={item} key={item.id} />)}
    // </Container>

    <Card
      variant="outlined"
      sx={{
        height: "70%",
        margin: { sm: "20px 20px", xs: "20px 0px" },
        padding: "30px",
        // backgroundColor: "#D3D3D3",
      }}
    >
      {" "}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom={true}
          sx={{ borderBottom: 2, borderBottomColor: "teal" }}
        >
          {title}
        </Typography>
        <Link href={`/products/categories/Collection ${title}`}>
          <Button variant="contained" style={{ backgroundColor: "teal" }}>
            Voir Plus
          </Button>
        </Link>
      </Box>
      <Grid container spacing={{ xs: 2, sm: 6 }} columns={{ xs: 4, sm: 12 }}>
        {/* <Grid item xs={6} sm={12}>
          <Box
            sx={{ backgroundColor: "teal", height: "300px", width: "100%" }}
          ></Box> 
        </Grid>  */}
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
          filteredProducts?.slice(0, 6).map((item, index) => (
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
  );
};
export default ProductsHome;
