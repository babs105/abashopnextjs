import { baseUrl } from "../config";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import authHeader from "../utils/authheader";
import { localStorageHelper } from "../utils/localStorageHelper";

// const { publicRuntimeConfig } = getConfig();
// const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export const categoryService = {
  create,
  getAll,
  getById,
  // update,
  getCategoryByCat,
  delete: _delete,
};

// function create(category) {
//   return fetchWrapper.post(`${baseUrl}/admin/category/create`, category);
// }
function create(category) {
  const options = {
    method: "POST",
    headers: {
      // "Content-Type":"application/json",
      Authorization: authHeader(`${baseUrl}/admin/category/create`),
    },
    credentials: "include",
    body: category,
  };
  return fetch(`${baseUrl}/admin/category/create`, options).then(
    handleResponse
  );
}
function getAll() {
  return fetchWrapper.get(`${baseUrl}/category`);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}
function getCategoryByCat(cat) {
  return fetchWrapper.get(`${baseUrl}/category/categoryByCat/${cat}`);
}

// function update(id, params) {
//   return fetchWrapper.put(`${baseUrl}/${id}`, params).then((x) => {
//     // update stored user if the logged in user updated their own record
//     if (id === userSubject.value.id) {
//       // update local storage
//       const user = { ...userSubject.value, ...params };
//       localStorage.setItem("user", JSON.stringify(user));

//       // publish updated user to subscribers
//       userSubject.next(user);
//     }
//     return x;
//   });
// }

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
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
