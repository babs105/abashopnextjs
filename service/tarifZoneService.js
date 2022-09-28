import axios from "axios";
import { publicRequest, userRequest } from "../axios/axios";
const baseURLdev = "http://localhost:8080";
// const baseURLprod = "https://appsastrans.herokuapp.com";
export const tarifZoneService = {
  addTarifZone,
  updateTarifZone,
  getTarifZoneById,
  getAllTarifZone,
  //   getTarifZoneByCat,
};

function addTarifZone(tarifZone) {
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
      .post("/tarifZone/create", tarifZone)
      // .then(handleRegisterResponse)
      .then((res) => res.data)
  );
}

function updateTarifZone(data) {
  // return userRequest
  //   .put("/TarifZone/updateTarifZone", data)
  //   .then(handleRegisterResponse)
  //   .then((TarifZone) => TarifZone);

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
      .put("/tarifZone/updateTarifZone", data)
      // .then(handleRegisterResponse)
      .then((res) => res.data)
  );
}
function getAllTarifZone() {
  // return publicRequest
  //   .get("/TarifZone/getAllTarifZone")
  //   .then(handleRegisterResponse)
  //   .then((TarifZones) => TarifZones);
  return (
    // axios
    //   .create({
    //     baseURL: baseURLdev,
    //   })
    publicRequest
      .get("/tarifZone/getAllTarifZone")
      // .then(handleRegisterResponse)
      .then((res) => res.data)
  );
}
function getTarifZoneByCat(cat) {
  // return publicRequest
  //   .get("/TarifZone/getTarifZoneByCat/" + cat)
  //   .then(handleRegisterResponse)
  //   .then((TarifZones) => TarifZones);
  return (
    // axios
    //   .create({
    //     baseURL: baseURLdev,
    //   })
    publicRequest
      .get("/tarifZone/getTarifZoneByCat/" + cat)
      // .then(handleRegisterResponse)
      .then((res) => res.data)
  );
}
function getTarifZoneById(id) {
  // return publicRequest
  //   .get("/TarifZone/getTarifZoneById/" + id)
  //   .then(handleRegisterResponse)
  //   .then((TarifZone) => TarifZone);
  return (
    // axios
    //   .create({
    //     baseURL: baseURLdev,
    //   })
    publicRequest
      .get("/tarifZone/getTarifZoneById/" + id)
      // .then(handleRegisterResponse)
      .then((res) => res.data)
  );
}
// function getImageTarifZone(idFile) {
//   return publicRequest
//     .get("/TarifZone/download/" + idFile)
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
