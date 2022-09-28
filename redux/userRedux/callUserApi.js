// import { history } from "../../routing/AppRouter";
import Router from "next/router";
import { toast } from "react-toastify";
import { userService } from "../../service/userService";
import { localStorageHelper } from "../../utils/localStorageHelper";
import {
  alertFetching,
  alertMessage,
  alertReset,
} from "../alertRedux/alertRedux";
// import { deleteCart } from "../cartRedux/cartRedux";
import {
  loginSuccess,
  registerSuccess,
  failure,
  fetching,
  getAllUsersSuccess,
  updateUserSuccess,
  updateProfileSuccess,
  logoutSuccess,
  getUserDetail,
} from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(fetching());
  // dispatch(alertReset());
  // dispatch(alertFetching());
  try {
    const res = await userService.login(user);
    console.log("dataUser", res);
    if (!res.hasError) {
      dispatch(loginSuccess(res.body));

      // Router.push("/");
      // toast.error()
    }
    if (res.hasError) {
      toast.error(res.errorMessage);
    }
  } catch (err) {
    // dispatch(alertMessage({ message: err.message, error: true }));
    toast.error(err);
    dispatch(failure());
  }
};
export const getloggedUser = async (dispatch) => {
  dispatch(fetching());

  try {
    const res = await userService.getloggedUser();
    console.log("Loggeduser", res);
    if (res) {
      dispatch(getUserDetail(res));
      // dispatch(alertMessage({ message: "", error: false }));
    }
  } catch (err) {
    // dispatch(alertMessage({ message: err.message, error: true }));
    dispatch(failure());
  }
};
export const register = async (dispatch, data) => {
  dispatch(fetching());
  // dispatch(alertReset());
  // dispatch(alertFetching());
  try {
    const res = await userService.register(data);
    console.log("response register", res);
    if (!res.hasError) {
      dispatch(registerSuccess(res.body));
      toast.success("Compte cree avec succes");
    }
    if (res.hasError) {
      toast.success(res.errorMessage);
    }
  } catch (err) {
    dispatch(failure());
    // dispatch(alertMessage({ message: err.message, error: true }));
    toast.error(err.message);
    // dispatch(alertMessage(res));s
  }
};

export const updateUser = async (dispatch, data) => {
  dispatch(fetching());
  // dispatch(alertReset());
  // dispatch(alertFetching());
  try {
    const res = await userService.updateUser(data);
    console.log("response update user", res);
    if (res) {
      dispatch(updateUserSuccess(res));
      // dispatch(alertMessage({ message: "Modification reussie", error: false }));
      toast.success("User Info Modifie");
    }
  } catch (err) {
    dispatch(failure());
    dispatch(alertMessage({ message: "Echec Modification ", error: true }));
    // dispatch(alertMessage(res));s
    toast.error("Echec Modification");
  }
};
export const updateProfile = async (dispatch, data) => {
  dispatch(fetching());
  // dispatch(alertReset());
  // dispatch(alertFetching());
  try {
    const res = await userService.updateUserProfile(data);
    console.log("response update user", res);
    if (res) {
      sessionStorage.setItem("user", JSON.stringify(res));
      dispatch(updateProfileSuccess(res));
      // dispatch(
      //   alertMessage({ message: "Profile Modification reussie", error: false })
      // );
      toast.success("Profile mis a jour reussie");
    }
  } catch (err) {
    dispatch(failure());
    // dispatch(
    //   alertMessage({ message: "Echec Modification Profile ", error: true })
    // );
    toast.error("Echec Modification Profile");
    // dispatch(alertMessage(res));s
  }
};

export const getAllUsers = async (dispatch) => {
  dispatch(fetching());
  // dispatch(alertReset());
  // dispatch(alertFetching());
  try {
    const res = await userService.getAllUsers();
    console.log("response getAllUserss", res);
    if (res) {
      dispatch(getAllUsersSuccess(res));
      // dispatch(
      //   alertMessage({ message: "Liste Utilisateurs Trouves ", error: false })
      // );
    }
  } catch (err) {
    dispatch(failure());
    // dispatch(
    //   alertMessage({ message: "Aucun Utilisateur Trouve ", error: true })
    // );
  }
};
export const logout = (dispatch) => {
  console.log("exit");
  localStorageHelper.logout();
  dispatch(logoutSuccess());
  // dispatch(deleteCart());s
  Router.push("/");
};
