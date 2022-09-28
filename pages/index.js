import { Box, Button } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import ProductCartWidget from "../components/ProductCartWidget";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import ServiceVente from "../components/ServiceVente";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import ProductsHome from "../components/ProductsHome";
import { baseUrl } from "../config";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { categoryRepo } from "../repository/category";

async function fetcherFunc(url) {
  try {
    const response = await fetchWrapper.get(url);
    if (!response.hasError) {
      console.log("success swr", response.body);
      return response.body;
    }
    if (response.hasError) {
      console.log("error swr", response.errorMessage);
      return response.errorMessage;
    }
  } catch (error) {
    console.log("error swr", error);
  }
}
export default function Home({ products, categories }) {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  // const user = useSelector((state) => state.user.currentUser);
  // const cart = useSelector((state) => state.cart.mycart);

  // const url = `${BASEURL}/product/getAllProduct`;
  // const { data: allproducts, error } = useSWR(url, fetcherFunc, {
  //   // fallbackData: products,
  //   revalidateOnMount: true,
  // });
  // const { data: allcategories, error: errcat } = useSWR(
  //   `${BASEURL}/category/getAllCategory`,
  //   fetcherFunc,
  //   {
  //     fallbackData: categories,
  //     revalidateOnMount: true,
  //   }
  // );
  const { data: allcategories, error: errcat } = useSWR(
    `${baseUrl}/category`,
    fetcherFunc,
    {
      fallbackData: categories,
      revalidateOnMount: true,
    }
  );
  // const { data: hommes, error: errorhom } = useSWR(
  //   `${BASEURL}/product/getProductByCat/Collection Homme`,
  //   fetcherFunc,
  //   {
  //     // fallbackData: products,
  //     revalidateOnMount: true,
  //   }
  // );
  // const { data: femmes, error: errorfem } = useSWR(
  //   `${BASEURL}/product/getProductByCat/Collection Femme`,
  //   fetcherFunc,
  //   {
  //     // fallbackData: products,
  //     revalidateOnMount: true,
  //   }
  // );
  // const { data: enfants, error: errorenf } = useSWR(
  //   `${BASEURL}/product/getProductByCat/Collection Enfant`,
  //   fetcherFunc,
  //   {
  //     // fallbackData: products,
  //     revalidateOnMount: true,
  //   }
  // );

  // useEffect(() => {
  //   console.log("categorie", cat);
  //   console.log("sort", sort);
  //   // dispatch(getAllProductByCatSuccess(products));
  // }, [products]);

  useEffect(() => {
    // console.log("data", products);
    // productActions.getAllProduct(dispatch);
    // dispatch(getAllProductSuccess(products));
  }, []);
  if (!allcategories) return <div>Loading... </div>;
  if (errcat) return <div>Erreur </div>;
  return (
    // <div>
    //   <HomePage
    //     searchName={searchName}
    //     products={data}
    //     // error={error}
    //     setSearchName={setSearchName}
    //   />
    // </div>

    <Box sx={{ backgroundColor: "#f5f8fc" }}>
      <Announcement />
      <Navbar searchName={searchName} setSearchName={setSearchName} />
      {console.log("All cat", allcategories)}
      <ProductCartWidget />
      {/* {!allcategories && !errcat && !allproducts && !error && (
        <h1 style={{ textAlign: "center" }}>CHARGEMENT ...</h1>
      )} */}
      <Slider categories={allcategories} errcat={errcat} />
      <Box sx={{ margin: { sm: "0px 50px", xs: "0px 0px" } }}>
        {/* <Categories categories={allcategories} errcat={errcat} /> */}
        {/* {hommes && !errorhom && (
          <ProductsHome
            searchName={searchName}
            products={hommes}
            sort="newest"
            title={"Homme"}
          />
        )}
        {femmes && !errorfem && (
          <ProductsHome
            searchName={searchName}
            products={femmes}
            sort="newest"
            title={"Femme"}
          />
        )}

        {enfants && !errorenf && (
          <ProductsHome
            searchName={searchName}
            products={enfants}
            sort="newest"
            title={"Enfant"}
          />
        )}
        {allproducts && !error && (
          <ProductsHome
            searchName={searchName}
            products={allproducts}
            sort="newest"
            title={"Les Costumes"}
          />
        )} */}
      </Box>
      <ServiceVente />
      <Newsletter />
      <Footer />
    </Box>
  );
}

export async function getStaticProps() {
  // const resCat = await fetch(`${BASEURL}/category/getAllCategory`);
  // const response = await productService.getAllProduct();
  //
  // const categories = await resCat.json();
  // const response = await categoryService.getAll();
  // const categories = response.body;

  const categories = await categoryRepo.getAllCategory();

  if (categories.length !== 0) {
    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
      },
    };
  } else {
    return {
      props: {
        categories: null,
      },
    };
  }
}
