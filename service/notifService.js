import axios from "axios";
import { publicRequest, userRequest } from "../axios/axios";
const baseURLdev = "http://localhost:8080";
// const baseURLprod = "https://appsastrans.herokuapp.com";

export const notifService = {
  readAllNotif,
  readOneNotif,
};

// function addOrder(order) {
//   return axios
//     .create({
//       baseURL: baseURLdev,
//     })
//     .post("/order/create", order)
//     .then(handleRegisterResponse)
//     .then((order) => order);
// }

function readAllNotif(data) {
  return (
    // axios
    //   .create({
    //     baseURL: baseURLdev,
    //   })
    userRequest
      .put("/notif/updateAllNotification", data)
      // .then(handleRegisterResponse)
      .then((res) => res.data)
  );
}
function readOneNotif(data) {
  return (
    // axios
    //   .create({
    //     baseURL: baseURLdev,
    //   })
    userRequest
      .put("/notif/updateNotification", data)
      // .then(handleRegisterResponse)
      .then((res) => res.data)
  );
}
// function getAllOrders() {
//   return axios
//     .create({
//       baseURL: baseURLdev,
//       headers: JSON.parse(sessionStorage.getItem("user")) && {
//         Authorization:
//           "Bearer " + JSON.parse(sessionStorage.getItem("user")).accessToken,
//       },
//     })
//     .get("/order/getAllOrders")
//     .then(handleRegisterResponse)
//     .then((orders) => orders);
// }

// function getAllOrdersByUserId(userId) {
//   return axios
//     .create({
//       baseURL: baseURLdev,
//       headers: JSON.parse(sessionStorage.getItem("user")) && {
//         Authorization:
//           "Bearer " + JSON.parse(sessionStorage.getItem("user")).accessToken,
//       },
//     })
//     .get("/order/getAllOrdersByUserId/" + userId)
//     .then(handleRegisterResponse)
//     .then((orders) => orders);
// }

// function getOrderById(id) {

//   return axios
//     .create({
//       baseURL: baseURLdev,
//       headers: JSON.parse(sessionStorage.getItem("user")) && {
//         Authorization:
//           "Bearer " + JSON.parse(sessionStorage.getItem("user")).accessToken,
//       },
//     })
//     .get("/order/getOrderById/" + id)
//     .then(handleRegisterResponse)
//     .then((order) => order);
// }
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
