import { categoryService } from "../../service/categoryService";
import {
  alertFetching,
  alertMessage,
  alertReset,
} from "../alertRedux/alertRedux";
import {
  addCategorySuccess,
  getAllCategorySuccess,
  //   getAllCategoryByCatSuccess,
  getCategoryByIdSuccess,
  updateCategorySuccess,
  failure,
  fetching,
} from "./categoryRedux";

import { toast } from "react-toastify";

export const addCategory = async (dispatch, category) => {
  dispatch(fetching());
  // dispatch(alertReset());
  try {
    const res = await categoryService.addCategory(category);
    dispatch(addCategorySuccess(res));
    // dispatch(
    //   alertMessage({ message: "Ajout Categorie avec Success", error: false })
    // );
    toast.success("Categorie ajoutee");
  } catch (err) {
    dispatch(failure());
    //   dispatch(alertMessage({ message: "Erreur ajout Categorie", error: true }));
    toast.error("Erreur ajout Categorie");
  }
};
export const getAllCategory = async (dispatch) => {
  dispatch(fetching());
  // dispatch(alertReset());
  // dispatch(alertFetching());
  try {
    const res = await categoryService.getAllCategory();

    if (res) {
      dispatch(getAllCategorySuccess(res));
      // dispatch(alertMessage({ message: "Categories Trouves ", error: false }));
    }
  } catch (err) {
    dispatch(failure());
    // dispatch();
    //   alertMessage({ message: "Erreur Chargement Produits ", error: true })
  }
};
// const getAllCategoryByCat = async (dispatch, cat) => {
//   dispatch(fetching());
//   try {
//     const res = await CategoryService.getCategoryByCat(cat);
//     dispatch(getAllCategoryByCatSuccess(res));
//   } catch (err) {
//     dispatch(failure());
//   }
// };
export const getCategoryById = async (dispatch, id) => {
  dispatch(fetching());
  try {
    const res = await categoryService.getCategoryById(id);
    dispatch(getCategoryByIdSuccess(res));
  } catch (err) {
    dispatch(failure());
  }
};

export const updateCategory = async (dispatch, category) => {
  dispatch(fetching());
  // dispatch(alertReset());
  try {
    const res = await categoryService.updateCategory(category);
    dispatch(updateCategorySuccess(res));
    // dispatch(
    //   alertMessage({ message: "Produit Modifie avec Success", error: false })
    // );
    toast.success("Categorie Modifie");
  } catch (err) {
    dispatch(failure());
    // dispatch(
    //   alertMessage({ message: "Echec Modification Produit ", error: true })
    // );
    toast.error("Erreur Categorie ");
  }
};
// export const categoryActions = {
//   addCategory,
//   getAllCategory,
// //   getAllCategoryByCat,
//   getCategoryById,
//   updateCategory,
// };
