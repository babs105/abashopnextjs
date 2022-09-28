import { toast } from "react-toastify";
import { tarifZoneService } from "../../service/tarifZoneService";
import {
  alertFetching,
  alertMessage,
  alertReset,
} from "../alertRedux/alertRedux";
import {
  addTarifZoneSuccess,
  getAllTarifZoneSuccess,
  //   getAlltarifZoneByCatSuccess,
  getTarifZoneByIdSuccess,
  updateTarifZoneSuccess,
  failure,
  fetching,
} from "./tarifZoneRedux";

export const addTarifZone = async (dispatch, tarifZone) => {
  dispatch(fetching());
  // dispatch(alertReset());
  try {
    const res = await tarifZoneService.addTarifZone(tarifZone);
    dispatch(addTarifZoneSuccess(res));
    // dispatch(
    //   alertMessage({ message: "Ajout Tarif avec Success", error: false })
    // );
    toast.success("Tarif  Zone ajoute");
  } catch (err) {
    dispatch(failure());
    toast.error("Echec Ajout Tarif  Zone ");
    // dispatch(alertMessage({ message: "Erreur ajout Tarif", error: true }));
  }
};
export const getAllTarifZone = async (dispatch) => {
  dispatch(fetching());
  // dispatch(alertReset());
  // dispatch(alertFetching());
  try {
    const res = await tarifZoneService.getAllTarifZone();
    console.log("les tarifs", res);
    if (res) {
      dispatch(getAllTarifZoneSuccess(res));
      // dispatch(alertMessage({ message: "Tarif Zone Trouves ", error: false }));
    }
  } catch (err) {
    dispatch(failure());
    //   dispatch();
    //   alertMessage({ message: "Erreur Chargement Tarif ", error: true });
    //
  }
};
// const getAlltarifZoneByCat = async (dispatch, cat) => {
//   dispatch(fetching());
//   try {
//     const res = await tarifZoneService.gettarifZoneByCat(cat);
//     dispatch(getAlltarifZoneByCatSuccess(res));
//   } catch (err) {
//     dispatch(failure());
//   }
// };
export const getTarifZoneById = async (dispatch, id) => {
  dispatch(fetching());
  try {
    const res = await tarifZoneService.getTarifZoneById(id);
    dispatch(getTarifZoneByIdSuccess(res));
  } catch (err) {
    dispatch(failure());
  }
};

export const updateTarifZone = async (dispatch, tarifZone) => {
  dispatch(fetching());
  // dispatch(alertReset());
  try {
    const res = await tarifZoneService.updateTarifZone(tarifZone);
    dispatch(updateTarifZoneSuccess(res));
    // dispatch(
    //   alertMessage({ message: "Produit Modifie avec Success", error: false })
    // );
    toast.success("Tarif  Zone Modifiee");
  } catch (err) {
    dispatch(failure());
    // dispatch(
    //   alertMessage({ message: "Echec Modification Produit ", error: true })
    // );
    toast.error(" Echec Modification Tarif  Zone");
  }
};
// export const tarifZoneActions = {
//   addtarifZone,
//   getAlltarifZone,
// //   getAlltarifZoneByCat,
//   gettarifZoneById,
//   updatetarifZone,
// };
