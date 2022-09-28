import axios from "axios";
import { baseUrl } from "../config";
import authHeader from "../utils/authheader";

export const requestWrapper = {
  get,
  // post,
  // put,
  // delete: _delete,
};

function get(url) {
  const requestOptions = {
    baseURL: baseUrl,
    headers: { Authorization: authHeader(url) },
  };
  return axios.create(requestOptions).get(url);
}
function post(url, body) {
  const requestOptions = {
    baseURL: baseUrl,
    headers: { Authorization: authHeader(url) },
  };
  return axios.create(requestOptions).get(url, body);
}
