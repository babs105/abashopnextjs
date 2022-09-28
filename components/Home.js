import React, { useEffect, useState } from "react";
import Announcement from "./Announcement";
import Categories from "./Categories";
import Footer from "./Footer";
import Navbar from "./Navbar";

import Newsletter from "./Newsletter";
import ProductCartWidget from "./ProductCartWidget";
import Products from "./Products";
import ServiceVente from "./ServiceVente";
import Slider from "./Slider";

const Home = ({ searchName, setSearchName, products, error }) => {
  // useEffect(() => {
  //   console.log("query", searchName);
  // }, [searchName]);

  return (
    <div>
      <Announcement />
      <Navbar searchName={searchName} setSearchName={setSearchName} />
      <ProductCartWidget />
      <Slider />
      <Categories />

      {!products && <div> Loading.....</div>}
      {error && <div> Erreur...</div>}
      <Products searchName={searchName} products={products} sort="newest" />

      <ServiceVente />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
