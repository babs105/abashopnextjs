import axios from "axios";
import authHeader from "../utils/authheader";
import { localStorageHelper } from "../utils/localStorageHelper";
const baseURLdev = "http://localhost:8080";
// const baseURLprod = "https://appsastrans.herokuapp.com";
const TOKEN =
  typeof window !== "undefined" && sessionStorage.getItem("user")
    ? typeof window !== "undefined" &&
      JSON.parse(sessionStorage.getItem("user"))?.accessToken
    : "";

export const publicRequest = axios.create({
  baseURL: baseURLdev,
});
export const userRequest = axios.create({
  baseURL: baseURLdev,
  headers: localStorageHelper.getLocalStorage("user") && {
    Authorization:
      "Bearer " + localStorageHelper.getLocalStorage("user").accessToken,
  },
});
