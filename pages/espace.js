import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import LayoutSiderBar from "../components/LayoutAdmin2";
import { getloggedUser } from "../redux/userRedux/callUserApi";
import { cartService } from "../service/cartService";
import { userService } from "../service/userService";

export default function Espace() {
  return <>MAY ESPACE :</>;
}
Espace.layout = "profile";
// export async function getServerSideProps() {
//   // Fetch data from external API

//   const response = await fetch(
//     "http://localhost:8080/cart/getCartByUserId/61f841d565d8ed3a7a89485b"
//   );
//   const data = await response.json();
//   // console.log("Data", data);

//   // Pass data to the page via props
//   return { props: { data } };
// }
