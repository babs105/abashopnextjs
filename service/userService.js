// import axios from "axios";
// import { publicRequest, userRequest } from "../axios/axios";

// import { localStorageHelper } from "../utils/localStorageHelper";
// const baseURLdev = "http://localhost:8080";
// // const baseURLprod = "https://appsastrans.herokuapp.com";
// export const userService = {
//   login,
//   logout,
//   register,
//   getAllUsers,
//   getUserById,
//   updateUser,
//   updateUserProfile,
//   getloggedUser,
// };

// function login(data) {
//   return (
//     // axios
//     //   .create({ baseURL: baseURLdev })
//     publicRequest
//       .post("/auth/signin", data)
//       // .then(handleRegisterResponse)
//       .then((res) => {
//         console.log("res User Logged", res);
//         if (res.data.accessToken) {
//           localStorageHelper.setLocalStorage("user", res.data);
//           document.cookie = `token=${res.data.accessToken};path=/`;
//           // expires=Thu, 18 Dec 2013 12:00:00 UTC;
//         }
//         return res.data;
//       })
//   );
// }

// function getloggedUser() {
//   return (
//     // axios
//     //   .create({
//     //     baseURL: baseURLdev,

//     //     headers: localStorageHelper.getLocalStorage("user") && {
//     //       Authorization:
//     //         "Bearer " + localStorageHelper.getLocalStorage("user").accessToken,
//     //     },
//     //   })
//     userRequest
//       .get("/users/userDetail")
//       // .then(handleRegisterResponse)
//       .then((res) => res.data)
//   );
// }
// function register(data) {
//   return (
//     // axios
//     //   .create({
//     //     baseURL: baseURLdev,
//     //   })
//     publicRequest
//       .post("/auth/signup", data)
//       // .then(handleRegisterResponse)
//       .then((res) => res.data)
//   );
// }
// function updateUser(data) {
//   return userRequest.put("/users/updateUser", data).then((res) => res.data);
// }
// function updateUserProfile(data) {
//   return userRequest
//     .put("/users/updateUserProfile", data)
//     .then((res) => res.data);
// }

// function getAllUsers() {
//   return userRequest.get("/users/getAllUsers").then((res) => res.data);
// }
// function getUserById(userId, token) {
//   // return axios
//   //   .create({
//   //     baseURL: baseURLdev,
//   //     headers: token
//   //       ? {
//   //           Authorization: "Bearer " + token,
//   //         }
//   //       : localStorageHelper.getLocalStorage("user") && {
//   //           Authorization:
//   //             "Bearer " +
//   //             localStorageHelper.getLocalStorage("user").accessToken,
//   //         },
//   //   })
//   userRequest.get("/users/getUserById/" + userId).then((res) => res.data);
// }

// function logout() {
//   localStorageHelper.logout();
//   // localStorage.removeItem("token");
// }

// function handleResponse(response) {
//   const { data } = response;
//   if (response.status === 401) {
//     if (response.status === 401) {
//       // auto logout if 401 response returned from api
//       logout();
//       // eslint-disable-next-line no-restricted-globals
//       location.reload(true);
//     }

//     const error = (data && data.message) || response.statusText;
//     return Promise.reject(error);
//   }

//   return data;
// }

// function handleRegisterResponse(response) {
//   const { data } = response;
//   // if (response.status === 401) {
//   //   const error = (data && data.message) || response.statusText;
//   //   console.log("handleRegisterResponse => error");
//   //   console.log(error);
//   //   return Promise.reject(error);
//   // }
//   return data;
// }

import { baseUrl } from "../config";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { localStorageHelper } from "../utils/localStorageHelper";

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  // update,
  delete: _delete,
};

function login(user) {
  return fetchWrapper.post(`${baseUrl}/auth/login`, user).then((res) => {
    // localStorage.setItem("user", JSON.stringify(res.body));
    console.log("res User Logged", res);
    if (!res.hasError) {
      if (res.body.token) {
        localStorageHelper.setLocalStorage("user", {
          ...res.body,
        });
        document.cookie = `token=${res.body.token};path=/`;
        // expires=Thu, 18 Dec 2013 12:00:00 UTC;
      }
      return res;
    }
    if (res.hasError) {
      return res;
    }
  });
}
function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem("user");
}

function register(user) {
  return fetchWrapper.post(`${baseUrl}/auth/register`, user);
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

// function update(id, params) {
//   return fetchWrapper.put(`${baseUrl}/${id}`, params).then((x) => {
//     // update stored user if the logged in user updated their own record
//     if (id === userSubject.value.id) {
//       // update local storage
//       const user = { ...userSubject.value, ...params };
//       localStorage.setItem("user", JSON.stringify(user));

//       // publish updated user to subscribers
//       // userSubject.next(user);
//     }
//     return x;
//   });
// }

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}
