import getConfig from "next/config";
import { baseUrl } from "../config";

import { localStorageHelper } from "../utils/localStorageHelper";

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

function get(url) {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: authHeader(url) },
  };
  console.log("headers req", requestOptions.headers);
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(url),
      //   Authorization:
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjg1ZmRiY2JlNzlhOWU2NDE1ZWVjNSIsInVzZXJuYW1lIjoiYmFiYWNhci5kaWVuZzQxMTFAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY2MzY4NTI2OCwiZXhwIjoxNjYzNzcxNjY4fQ.ROa71t0dazi4QDpT4y_zRR_Kf00wSXmw38ShJC6Vz58",
    },
    credentials: "include",
    body: JSON.stringify(body),
    // body,
  };
  //   requestOptions.headers.Authorization = authHeader(url);
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(url),
    },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: "DELETE",
    headers: { Authorization: authHeader(url) },
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url) {
  console.log("URL ", url);
  const isApiUrl = url.startsWith(baseUrl);
  if (localStorageHelper.getLocalStorage("user") && isApiUrl) {
    return `Bearer ${localStorageHelper.getLocalStorage("user").token}`;
  } else {
    return "";
  }
}
function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if (
        [401, 403].includes(response.status) &&
        localStorageHelper.getLocalStorage("user")
      ) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        // userService.logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
