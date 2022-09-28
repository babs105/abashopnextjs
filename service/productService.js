import axios from "axios";

import { publicRequest, userRequest } from "../axios/axios";
const baseURLdev = "http://localhost:8080";
// const baseURLprod = "https://appsastrans.herokuapp.com";
export const productService = {
  addProduct,
  updateProduct,
  getProductById,
  getAllProduct,
  getProductByCat,
};

function addProduct(product) {
  // return userRequest
  //   .post("/product/create", product)
  //   .then(handleRegisterResponse)
  //   .then((res) => res);

  return (
    // axios
    //   .create({
    //     baseURL: baseURLdev,
    //     headers: JSON.parse(sessionStorage.getItem("user")) && {
    //       Authorization:
    //         "Bearer " + JSON.parse(sessionStorage.getItem("user")).accessToken,
    //     },
    //   })
    userRequest
      .post("/product/create", product)
      // .then(handleRegisterResponse)
      .then((res) => res.data)
  );
}

function updateProduct(data) {
  // return userRequest
  //   .put("/product/updateProduct", data)
  //   .then(handleRegisterResponse)
  //   .then((product) => product);

  return (
    // axios
    //   .create({
    //     baseURL: baseURLdev,
    //     headers: JSON.parse(sessionStorage.getItem("user")) && {
    //       Authorization:
    //         "Bearer " + JSON.parse(sessionStorage.getItem("user")).accessToken,
    //     },
    //   })
    userRequest
      .put("/product/updateProduct", data)
      // .then(handleRegisterResponse)
      .then((res) => res.data)
  );
}
function getAllProduct() {
  // return publicRequest
  //   .get("/product/getAllProduct")
  //   .then(handleRegisterResponse)
  //   .then((products) => products);
  return (
    // axios
    //   .create({
    //     baseURL: baseURLdev,
    //   })
    publicRequest
      .get("/product/getAllProduct")
      // .then(handleRegisterResponse)
      .then((res) => res.data)
  );
}
function getProductByCat(cat) {
  // return publicRequest
  //   .get("/product/getProductByCat/" + cat)
  //   .then(handleRegisterResponse)
  //   .then((products) => products);
  return (
    // axios
    //   .create({
    //     baseURL: baseURLdev,
    //   })
    publicRequest
      .get("/product/getProductByCat/" + cat)
      // .then(handleRegisterResponse)
      .then((res) => res.data)
  );
}
function getProductById(id) {
  // return publicRequest
  //   .get("/product/getProductById/" + id)
  //   .then(handleRegisterResponse)
  //   .then((product) => product);
  return (
    // axios
    //   .create({
    //     baseURL: baseURLdev,
    //   })
    publicRequest
      .get("/product/getProductById/" + id)
      // .then(handleRegisterResponse)
      .then((res) => res.data)
  );
}
// function getImageProduct(idFile) {
//   return publicRequest
//     .get("/product/download/" + idFile)
//     .then(handleRegisterResponse)
//     .then((img) => img);
// }
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
