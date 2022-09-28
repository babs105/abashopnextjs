import {
  addProductToCartSuccess,
  getCartByIdSuccess,
  getCartByUserIdSuccess,
  failure,
  fetching,
  removeProductToCartSuccess,
  updateCartSuccess,
  removeAllProductSuccess,
} from "./cartRedux";
import { cartService } from "../../service/cartService";
import {
  alertFetching,
  alertMessage,
  alertReset,
} from "../alertRedux/alertRedux";

export const addProductToCart = async (dispatch, product) => {
  try {
    const res = await cartService.addProductToCart(product);
    if (res) {
      !res.userId && sessionStorage.setItem("idCart", res.id);
      dispatch(addProductToCartSuccess(res));
    }
  } catch (err) {
    dispatch(
      alertMessage({ message: "Echec Ajout Produit au Panier", error: true })
    );
    dispatch(failure());
  }
};

export const getCartById = async (dispatch, idCart) => {
  dispatch(fetching());
  try {
    const res = await cartService.getCartById(idCart);
    dispatch(getCartByIdSuccess(res));
  } catch (err) {
    dispatch(failure());
  }
};
export const getCartByUserId = async (dispatch, userId) => {
  console.log("getCartById", userId);
  dispatch(fetching());
  try {
    const res = await cartService.getCartByUserId(userId);
    console.log("responsecart", res);
    dispatch(getCartByUserIdSuccess(res));
  } catch (err) {
    dispatch(failure());
  }
};

export const removeProductToCart = async (dispatch, product) => {
  dispatch(fetching());
  dispatch(alertReset());
  dispatch(alertFetching());
  try {
    const res = await cartService.removeProductToCart(product);
    if (res) {
      dispatch(removeProductToCartSuccess(res));
      dispatch(
        alertMessage({ message: "Produit supprime du panier", error: false })
      );
    }
  } catch (err) {
    dispatch(
      alertMessage({
        message: "Echec suppression Produit du panier",
        error: true,
      })
    );
    dispatch(failure());
  }
};
export const updateCart = async (dispatch, cart) => {
  dispatch(fetching());
  try {
    const res = await cartService.updateCart(cart);
    dispatch(updateCartSuccess(res));
  } catch (err) {
    dispatch(failure());
  }
};
export const removeAllProductToCart = async (dispatch, cartId) => {
  console.log(" reset all product in cart", cartId);
  dispatch(fetching());
  try {
    const res = await cartService.removeAllProductToCart(cartId);
    dispatch(removeAllProductSuccess(res));
  } catch (err) {
    dispatch(failure());
  }
};
