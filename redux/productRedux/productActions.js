import { productService } from "../../service/productService";
import {
  alertFetching,
  alertMessage,
  alertReset,
} from "../alertRedux/alertRedux";
import {
  addProductSuccess,
  getAllProductSuccess,
  getAllProductByCatSuccess,
  getProductByIdSuccess,
  updateProductSuccess,
  failure,
  fetching,
} from "./productRedux";
import { toast } from "react-toastify";

const addProduct = async (dispatch, product) => {
  dispatch(fetching());
  // dispatch(alertReset());
  try {
    const res = await productService.addProduct(product);
    dispatch(addProductSuccess(res));
    // dispatch(
    //   alertMessage({ message: "Ajout Produit avec Success", error: false })
    // );
    toast.success("Ajout Produit avec Success");
  } catch (err) {
    dispatch(failure());
    // dispatch(alertMessage({ message: "Erreur ajout produit", error: true }));
    toast.error("Erreur ajout produit");
  }
};
const getAllProduct = async (dispatch) => {
  dispatch(fetching());
  // dispatch(alertReset());
  // dispatch(alertFetching());
  try {
    const res = await productService.getAllProduct();

    if (res) {
      dispatch(getAllProductSuccess(res));
      //   dispatch(alertMessage({ message: "Produits Trouves ", error: false }));
      //
    }
  } catch (err) {
    dispatch(failure());
    // dispatch(
    //   alertMessage({ message: "Erreur Chargement Produits ", error: true })
    // );
  }
};
const getAllProductByCat = async (dispatch, cat) => {
  dispatch(fetching());
  try {
    const res = await productService.getProductByCat(cat);
    dispatch(getAllProductByCatSuccess(res));
  } catch (err) {
    dispatch(failure());
  }
};
const getProductById = async (dispatch, id) => {
  dispatch(fetching());
  try {
    const res = await productService.getProductById(id);
    dispatch(getProductByIdSuccess(res));
  } catch (err) {
    dispatch(failure());
  }
};

const updateProduct = async (dispatch, product) => {
  dispatch(fetching());
  dispatch(alertReset());
  try {
    const res = await productService.updateProduct(product);
    dispatch(updateProductSuccess(res));
    // dispatch(
    //   alertMessage({ message: "Produit Modifie avec Success", error: false })
    // );
    toast.success("Produit Modifie avec Success");
  } catch (err) {
    dispatch(failure());
    // dispatch(
    //   alertMessage({ message: "Echec Modification Produit ", error: true })
    // );
    toast.error("Echec Modification Produit");
  }
};
export const productActions = {
  addProduct,
  getAllProduct,
  getAllProductByCat,
  getProductById,
  updateProduct,
};
