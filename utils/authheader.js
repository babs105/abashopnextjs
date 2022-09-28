import { baseUrl } from "../config";
import { localStorageHelper } from "./localStorageHelper";

// export default function authHeader() {
//   const user = JSON.parse(sessionStorage.getItem("user"));
//   console.log("userRequest", user);

//   if (user && user.accessToken) {
//     console.log("token", user.accessToken);
//     return { Authorization: "Bearer " + user.accessToken }; // for Spring Boot back-end
//     // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
//   } else {
//     return {};
//   }
// }
export default function authHeader(url) {
  const isApiUrl = url.startsWith(baseUrl);
  console.log("isApiUr", isApiUrl);
  if (localStorageHelper.getLocalStorage("user") && isApiUrl) {
    return `Bearer ${localStorageHelper.getLocalStorage("user").token}`;
  } else {
    return "";
  }
}
