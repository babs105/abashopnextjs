import { publicRequest, userRequest } from "../axios/axios";

export const cartService = {
  addProductToCart,
  getCartByUserId,
  getCartById,
  updateCart,
  removeProductToCart,
  removeAllProductToCart,
};

function addProductToCart(product) {
  return (
    publicRequest
      .post("/cart/addProductToCart", product)
      // //.then(handleRegisterResponse)
      .then((res) => res.data)
  );
}
function removeProductToCart(product) {
  return (
    publicRequest
      .post("/cart/removeProductToCart", product)
      //.then(handleRegisterResponse)
      .then((res) => res.data)
  );
}
function removeAllProductToCart(cartId) {
  return (
    publicRequest
      .get("/cart/resetCart/" + cartId)
      //.then(handleRegisterResponse)
      .then((res) => res.data)
  );
}

function getCartByUserId(userId) {
  return (
    publicRequest
      .get("/cart/getCartByUserId/" + userId)
      //.then(handleRegisterResponse)
      .then((res) => res.data)
  );
}

function getCartById(idCart) {
  return (
    publicRequest
      .get("/cart/getCartById/" + idCart)
      //.then(handleRegisterResponse)
      .then((res) => res.data)
  );
}
function updateCart(cart) {
  return (
    publicRequest
      .put("/cart/updateCart", cart)
      //.then(handleRegisterResponse)
      .then((res) => res.data)
  );
}
function handleRegisterResponse(response) {
  const { data } = response;
  if (response.status === 401) {
    const error = (data && data.message) || response.statusText;
    console.log("handleRegisterResponse => error");
    console.log(error);
    return Promise.reject(error);
  }
  return data;
}
