import { notifService } from "../../service/notifService";
// import {
//   alertFetching,
//   alertMessage,
//   alertReset,
// } from "../alertRedux/alertRedux";
// // import history from "../../utils/history";
// import { history } from "../../routing/AppRouter";
// // import { browserHistory } from "react-router";
// // import history from "../../utils/history";
// import { resetCart, deleteCart } from "../cartRedux/cartRedux";
import { toast } from "react-toastify";
import {
  failure,
  fetching,
  notifSucces,
  readAllNotifSucces,
  readOneNotifSucces,
  resetNotif,
} from "./notifRedux";

// export const addOrder = async (dispatch, order) => {
//   console.log("ORDER ", order);
//   dispatch(fetching());
//   dispatch(alertReset());

//   try {
//     const res = await orderService.addOrder(order);
//     dispatch(addOrderSuccess(res.order));

//     if (!res.error) {
//       authenticationHelper.removeIdCart();
//       dispatch(alertMessage(res));
//       if (res.order.userId) {
//         dispatch(resetCart());
//       } else {
//         dispatch(deleteCart());
//       }

//       history.push("/orderResponse", res.order);
//       // history.push({
//       //   pathname: "/orderResponse",
//       //   state: res.order,
//       // });
//     }
//   } catch (err) {
//     dispatch(failure());
//     dispatch(
//       alertMessage({ message: "Erreur Commande non recu", error: true })
//     );
//   }
// };
// export const getAllOrders = async (dispatch) => {
//   // console.log(" get all ");
//   dispatch(fetching());
//   try {
//     const res = await orderService.getAllOrders();
//     console.log(" orders ", res);
//     dispatch(getAllOrdersSuccess(res));
//   } catch (err) {
//     dispatch(failure());
//   }
// };

// export const getOrderById = async (dispatch, id) => {
//   dispatch(fetching());
//   dispatch(alertReset());
//   dispatch(alertFetching());
//   try {
//     const res = await orderService.getOrderById(id);
//     console.log("getOrder", res);
//     if (res) {
//       dispatch(getOrderByIdSuccess(res));
//       dispatch(alertMessage({ message: "Commande", error: false }));
//     }
//   } catch (err) {
//     dispatch(alertMessage({ message: "Commande non trouve", error: true }));
//     dispatch(failure());
//   }
// };
// export const getAllOrdersByUserId = async (dispatch, id) => {
//   dispatch(fetching());
//   dispatch(alertReset());
//   dispatch(alertFetching());
//   try {
//     const res = await orderService.getAllOrdersByUserId(id);
//     console.log("getOrderByUser", res);
//     if (res) {
//       dispatch(getAllOrderByUserIdSuccess(res));
//       dispatch(alertMessage({ message: "mes Commande", error: false }));
//     }
//   } catch (err) {
//     dispatch(alertMessage({ message: "Commandes non trouvees", error: true }));
//     dispatch(failure());
//   }
// };
export const readAllNotif = async (dispatch, notifs) => {
  console.log("notifsToUpdate", notifs);
  dispatch(fetching());
  // dispatch(resetNotif());
  //   dispatch(alertReset());
  //   dispatch(alertFetching());
  try {
    const res = await notifService.readAllNotif(notifs);
    console.log("updteresponse", res);
    if (res) {
      dispatch(readAllNotifSucces(res));
      toast.success("Toutes Notifications marquees lues");
    }
  } catch (err) {
    dispatch(failure());
    toast.error("Erreur Notifications marquees lues");
  }
};
export const readOneNotif = async (dispatch, notifs) => {
  console.log("notifsToUpdate", notifs);
  dispatch(fetching());
  try {
    const res = await notifService.readOneNotif(notifs);
    console.log("updteresponse", res);
    if (res) {
      dispatch(readOneNotifSucces(res));
      toast.success(" Notification marquee lue");
    }
  } catch (err) {
    dispatch(failure());
    toast.error("Erreur notification marquee lue");
  }
};
