import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCartById, getCartByUserId } from "../redux/cartRedux/callCartApi";

const InitCartUser = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.mycart);

  useEffect(() => {
    console.log("########  App start ############");
    console.log("USER", user);
    // const getVisitorCart = () => {
    //   console.log("visitorCart");
    //   sessionStorage.getItem("idCart") &&
    //     getCartById(dispatch, sessionStorage.getItem("idCart"));
    // };
    // user ? getCartByUserId(dispatch, user.id) : getVisitorCart();
    // console.log("cart", cart);
  }, [user]);

  return <div>{children}</div>;
};
export default InitCartUser;
