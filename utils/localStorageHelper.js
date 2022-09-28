export const localStorageHelper = {
  setLocalStorage,
  getLocalStorage,
  logout,
  isUserLoggedIn,
  removeIdCart,
  // saveUserInfo,
};

function setLocalStorage(key, data) {
  console.log("SET LOCAL STORAGE  DATA", data);
  typeof window !== "undefined" &&
    window.sessionStorage.setItem(key, JSON.stringify(data));
}
function getLocalStorage(key) {
  if (typeof window !== "undefined") {
    return JSON.parse(window.sessionStorage.getItem(key));
  }
}
function removeIdCart() {
  sessionStorage.getItem("idCart") && sessionStorage.removeItem("idCart");
}
function logout() {
  getLocalStorage("cart") && sessionStorage.removeItem("cart");
  getLocalStorage("user") && sessionStorage.removeItem("user");
}

function isUserLoggedIn() {
  return getLocalStorage("user")?.accessToken ? true : false;
  // return true;
}
