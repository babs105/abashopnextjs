// import { Add, Remove } from "@material-ui/icons";
// import {
//   Add,
//   Remove,
//   Mail,
//   Notifications,
//   Pets,
//   Search,
//   ShoppingCartOutlined,
//   ExpandCircleDown,
//   ExpandMore,
//   AddShoppingCart,
//   Check,
//   ConstructionOutlined,
// } from "@mui/icons-material";
import {
  Box,
  Button,
  // CircularProgress,
  // FormControl,
  // IconButton,
  // InputLabel,
  // MenuItem,
  // Select,
  styled,
  // Typography,
} from "@mui/material";
// import styled from "styled-components";
import Announcement from "../../../components/Announcement";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import useSWR, { SWRConfig, unstable_serialize } from "swr";
import { useState } from "react";
import ProductCartWidget from "../../../components/ProductCartWidget";
import { useRouter } from "next/router";
import ProductView from "../../../components/ProductView";
import { BASEURL } from "../../../utils/baseUrl";

const Container = styled("div")({
  width: "100%",
  backgroundColor: "#f5f8fc",
  // position:"relative",
});

async function fetcherFunc(url) {
  const res = await fetch(url);
  return res.json();
}
const Product = ({ fallback }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <SWRConfig value={{ fallback }}>
      <GetProduct />
    </SWRConfig>
  );
};

export default Product;

function GetProduct() {
  const router = useRouter();
  const { productId } = router.query;
  const [searchName, setSearchName] = useState("");

  const { data, error } = useSWR(
    productId ? `${BASEURL}/product/getProductById/${productId}` : null,
    productId ? fetcherFunc : null
    // , {
    // initialData: products,
    // revalidateOnMount: true,
    // }
  );

  if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  return (
    <Container>
      <Navbar searchName={searchName} setSearchName={setSearchName} />
      <Announcement />
      <ProductCartWidget />
      {data ? <ProductView product={data} /> : <div>loading...</div>}
      <Footer />
    </Container>
  );
}

export async function getStaticPaths() {
  const response = await fetch(`${BASEURL}/product/getAllProduct`);
  const data = await response.json();
  const paths = data.map((product) => ({
    params: { productId: product.id.toString() },
  }));
  return {
    paths: paths.slice(0, 1),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  //   // Fetch data from external API params
  const { params } = context;
  const { productId } = params;

  const response = await fetch(
    `${BASEURL}/product/getProductById/${productId}`
  );
  const product = await response.json();
  //   // console.log("Data", data);

  //   // Pass data to the page via props
  //   return { props: { product: data } };

  return {
    props: {
      // productId: productId,
      // fallback: {
      //   "http://localhost:8080/product/getProductById": product,
      // },
      fallback: {
        // unstable_serialize() array style key
        [unstable_serialize([`${BASEURL}/product/getProductById`, productId])]:
          product,
      },
    },
  };
}
