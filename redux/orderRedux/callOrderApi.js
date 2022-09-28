import { orderService } from "../../service/orderService";
import {
  alertFetching,
  alertMessage,
  alertReset,
} from "../alertRedux/alertRedux";
import Router from "next/router";
// import history from "../../utils/history";
// import { history } from "../../routing/AppRouter";
// import { browserHistory } from "react-router";
// import history from "../../utils/history";
import { resetCart, deleteCart } from "../cartRedux/cartRedux";
import {
  addOrderSuccess,
  failure,
  fetching,
  // noFetching,
  updateOrderSuccess,
  getOrderByIdSuccess,
  getAllOrdersSuccess,
} from "./orderRedux";
import { getAllOrderByUserIdSuccess } from "../userRedux/userRedux";
import { toast } from "react-toastify";

export const addOrder = async (dispatch, order) => {
  console.log("ORDER ", order);
  dispatch(fetching());
  // dispatch(alertReset());

  try {
    const res = await orderService.addOrder(order);
    dispatch(addOrderSuccess(res.order));
    toast.success("Commande envoyee avec success");
    if (!res.error) {
      if (res.order) {
        dispatch(resetCart());
        Router.push({
          pathname: "/orderResponse",
          query: { id: res.order.id },
        });
      }
    }
    // history.push("/orderResponse", res.order);
    // history.push({
    //   pathname: "/orderResponse",
    //   state: res.order,
    // });
    // }
  } catch (err) {
    dispatch(failure());

    toast.error("Erreur Commande non recu");
  }
};
export const getAllOrders = async (dispatch) => {
  // console.log(" get all ");
  dispatch(fetching());
  try {
    const res = await orderService.getAllOrders();
    console.log(" orders ", res);
    dispatch(getAllOrdersSuccess(res));
  } catch (err) {
    dispatch(failure());
  }
};

export const getOrderById = async (dispatch, id) => {
  dispatch(fetching());

  try {
    const res = await orderService.getOrderById(id);
    console.log("getOrder", res);
    if (res) {
      dispatch(getOrderByIdSuccess(res));
      // dispatch(alertMessage({ message: "Commande", error: false }));
    }
  } catch (err) {
    // dispatch(alertMessage({ message: "Commande non trouve", error: true }));
    dispatch(failure());
  }
};
export const getAllOrdersByUserId = async (dispatch, id) => {
  dispatch(fetching());
  // dispatch(alertReset());
  // dispatch(alertFetching());
  try {
    const res = await orderService.getAllOrdersByUserId(id);
    console.log("getOrderByUser", res);
    if (res) {
      dispatch(getAllOrderByUserIdSuccess(res));
      // dispatch(alertMessage({ message: "mes Commande", error: false }));
    }
  } catch (err) {
    // dispatch(alertMessage({ message: "Commandes non trouvees", error: true }));
    dispatch(failure());
  }
};
export const updateOrder = async (dispatch, order) => {
  console.log("orderToUpdate", order);
  dispatch(fetching());
  // dispatch(alertReset());
  // dispatch(alertFetching());

  try {
    const res = await orderService.updateOrder(order);
    console.log("updteresponse", res);
    if (res) {
      dispatch(updateOrderSuccess(res));
      toast.success(" Modification reussie");
    }
  } catch (err) {
    dispatch(failure());
    toast.error("Echec Modification");
  }
};
