import axios from "axios";
import { publicRequest, userRequest } from "../axios/axios";
import { localStorageHelper } from "../utils/localStorageHelper";
const baseURLdev = "http://localhost:8080";
// const baseURLprod = "https://appsastrans.herokuapp.com";

export const orderService = {
  addOrder,
  getAllOrders,
  updateOrder,
  getOrderById,
  getAllOrdersByUserId,
};

function addOrder(order) {
  return (
    // axios
    //   .create({
    //     baseURL: baseURLdev,
    //   })
    publicRequest
      .post("/order/create", order)
      // .then(handleRegisterResponse)
      .then((res) => res.data)
  );
}

function updateOrder(data) {
  return (
    // axios
    //   .create({
    //     baseURL: baseURLdev,
    //     headers: localStorageHelper.getLocalStorage("user") && {
    //       Authorization:
    //         "Bearer " + localStorageHelper.getLocalStorage("user").accessToken,
    //     },
    //   })
    userRequest
      .put("/order/updateOrder", data)
      // .then(handleRegisterResponse)
      .then((res) => res.data)
  );
}
function getAllOrders() {
  return (
    // axios
    //   .create({
    //     baseURL: baseURLdev,
    //     headers: localStorageHelper.getLocalStorage("user") && {
    //       Authorization:
    //         "Bearer " + localStorageHelper.getLocalStorage("user").accessToken,
    //     },
    //   })
    userRequest
      .get("/order/getAllOrders")
      // .then(handleRegisterResponse)
      .then((res) => res.data)
  );
}

function getAllOrdersByUserId(userId) {
  return (
    // axios
    //   .create({
    //     baseURL: baseURLdev,
    //     headers: localStorageHelper.getLocalStorage("user") && {
    //       Authorization:
    //         "Bearer " + localStorageHelper.getLocalStorage("user").accessToken,
    //     },
    //   })
    userRequest
      .get("/order/getAllOrdersByUserId/" + userId)
      // .then(handleRegisterResponse)
      .then((res) => res.data)
  );
}

function getOrderById(id, token) {
  // return publicRequest
  //   .get("/order/getOrderById/" + id)
  //   .then(handleRegisterResponse)
  //   .then((order) => order);
  return (
    // axios
    //   .create({
    //     baseURL: baseURLdev,
    //     headers: token
    //       ? {
    //           Authorization: "Bearer " + token,
    //         }
    //       : localStorageHelper.getLocalStorage("user") && {
    //           Authorization:
    //             "Bearer " +
    //             localStorageHelper.getLocalStorage("user").accessToken,
    //         },
    //   })
    userRequest
      .get("/order/getOrderById/" + id)
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
