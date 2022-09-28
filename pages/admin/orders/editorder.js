import React, { useEffect, useRef, useState } from "react";
import cookies from "next-cookies";
import {
  Box,
  IconButton,
  Modal,
  styled,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  Skeleton,
  Card,
  CardActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import { sentenceCase } from "change-case";
import { Add, Check, Clear, Remove } from "@mui/icons-material";
import Iconify from "../../../components/Iconify";
import { Form, useForm } from "../../../components/useForm";
// import // getOrderById,
// updateOrder,
// "../../../../redux/orderRedux/callOrderApi";
import Controls from "../../../components/controls/Controls";
import { productActions } from "../../../redux/productRedux/productActions";
import { updateOrderSuccess } from "../../../redux/orderRedux/orderRedux";
import axios from "axios";
import { orderService } from "../../../service/orderService";
import { BASEURL } from "../../../utils/baseUrl";
import useSWR, { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import { localStorageHelper } from "../../../utils/localStorageHelper";
import {
  getOrderById,
  updateOrder,
} from "../../../redux/orderRedux/callOrderApi";
import Link from "next/link";
import Image from "next/image";

const Container = styled("div")({
  width: "100%",
});
const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  padding: " 0px 20px",
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
  },
}));
const ResumeOrderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "130px",
  alignItems: "center",
  gap: "24px",

  // padding:"50px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    padding: "5px 0px",
    height: "100%",
    alignItems: "stretch",
  },
}));

const OrderItem = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  flexDirection: "column",
  // justifyContent: "flex-start",
  alignItems: "stretch",
  // justifyContent: "s",

  // padding:"50px",
  // [theme.breakpoints.down("sm")]: {
  //   flexDirection:"column",
  //   padding:"5px 0px",
  //   alignItems:"stretch",
  // },
}));
const ItemTitle = styled(Box)(({ theme }) => ({
  fontWeight: 400,
}));
const ItemContainer = styled(Box)(({ theme }) => ({
  color: "teal",
  fontWeight: "bold",
  fontSize: "16px",
}));
const DetailsOrderTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const TableWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  // alignItems:"center",

  // padding:"50px",
  // [theme.breakpoints.down("sm")]: {
  //   flexDirection:"column",
  //   padding:"5px 0px",
  //   alignItems:"stretch",
  // },
}));
const TableHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "teal",
  padding: "10px 20px",

  // [theme.breakpoints.down("sm")]: {
  //   flexDirection:"column",
  //   padding:"5px 0px",
  //   alignItems:"stretch",
  // },
}));
const TableTitle = styled(Box)(({ theme }) => ({
  color: "white",
}));
const TableDetail = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "10px 20px",
  gap: "16px",
  // [theme.breakpoints.down("sm")]: {
  //   flexDirection:"column",
  //   padding:"5px 0px",
  //   alignItems:"stretch",
  // },
}));
const ProductItem = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  // width:"280px",
  gap: "5px",
  [theme.breakpoints.down("sm")]: {
    // flexDirection: "column",
    padding: "5px 0px",
    // alignItems: "stretch",
  },
}));
const ProductDescQty = styled("div")({
  fontSize: "14px",
  // width:"60%",
});
const TotalProduct = styled("div")({
  fontSize: "15px",
  // width:"40%"
});
const Hr = styled("hr")({
  backgroundColor: "#eee",
  border: "none",
  height: "2px",
});

const Hr2 = styled("hr")(({ theme }) => ({
  backgroundColor: "gray",
  border: "none",
  height: "100%",
  width: "2px",
  opacity: 0.2,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "30%",
  top: "10%",
  right: "30%",
  bottom: "10%",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "white",
  boxShadow: 24,
  // border:0,
  outline: 0,
  height: "100vh",
  overflowY: "auto",
  px: 8,
  py: 2,
  [theme.breakpoints.down("sm")]: {
    left: 0,
    top: "30%",
    right: 0,
    bottom: "30%",
    margin: "auto",
  },
}));

const ModalContainerListProduct = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "10%",
  top: "10%",
  right: "10%",
  bottom: "10%",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "white",
  boxShadow: 24,
  // border:0,
  outline: 0,
  height: "100vh",
  overflowY: "auto",
  px: 8,
  py: 2,
  [theme.breakpoints.down("sm")]: {
    left: 0,
    top: "30%",
    right: 0,
    bottom: "30%",
    margin: "auto",
  },
}));
const CloseModalContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "5px 20px",
  width: "100%",

  [theme.breakpoints.down("sm")]: {},
}));
const CloseModalButton = styled(IconButton)(({ theme }) => ({
  padding: "5px",
  // margin: "10px",

  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {},
}));

const SousTotalContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  // width:"50%"

  // [theme.breakpoints.down("sm")]: {
  //   flexDirection:"column",
  //   padding:"5px 0px",
  //   alignItems:"stretch",
  // },
}));
const Wrapper1 = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "5px 0px",
  [theme.breakpoints.down("sm")]: {
    // alignItems:"stretch",
  },
}));

const ImageContainer = styled(Box)({
  flex: 1,
  // minWidth:"350px",
});
const InfoContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.down("sm")]: {
    padding: "0px 20px",
  },
}));
// const Image = styled("img")(({ theme }) => ({
//   minWidth: "200px",
//   // minWidth:"280px",
//   width: "50%",
//   height: "90px",
//   objectFit: "contain",
//   [theme.breakpoints.down("sm")]: {
//     height: "40vh",
//   },
// }));
const Title = styled("h1")({
  fontWeight: 200,
});
const Desc = styled("p")({
  margin: "20px 0px",
});
const Price = styled("span")({
  fontSize: "20px",
});
const Detail = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  margin: "20px 0",
  width: "50%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
const Filter = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const ColorTitle = styled("h2")({
  fontWeight: 200,
});
const SizeTitle = styled("h2")({
  fontWeight: 200,
});
const Color = styled("div")({
  width: "25px",
  height: "25px",
  borderRadius: "50%",

  marginLeft: "5px",
});

const Size = styled("h2")({
  marginLeft: "5px",
});
const AddContainer = styled("div")(({ theme }) => ({
  minWidth: "400px",
  // width:"60%",
  display: "flex",
  gap: "20px",
  margin: "30px 0px",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "space-between",
  },
}));
const AddMount = styled("div")({
  border: "1px solid teal",
  borderRadius: "10px",
  display: "flex",
  padding: "2px",
  justifyContent: "space-between",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "20px",
});

const AddButton = styled(Button)(({ theme }) => ({
  border: "2px solid teal",
  padding: "10px",
  marginTop: "0px",

  // justifyContent:"space-between",
  // alignItems:"center"
}));

const FilterContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flex: "nowrap",
  padding: "0px 15px",
  gap: "20px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "start",
  },
}));

// const Filter = styled("div")({
//   display: "flex",
//   alignItems: "center",
// });

const FilterText = styled("span")({
  fontSize: " 20px",
  fontWeight: 600,
  marginRight: "10px",
});
const Container1 = styled("div")({
  // flex:1,
  // maxWidth: "280px",
  width: "100%",
  height: "200px",
  display: "flex",
  alignItems: "center",
  justifyContent: " center",
  backgroundCcolor: "#f5fbfd",
  position: "relative",
});
const Info = styled("div")({
  opacity: 0,
  width: "100%",
  height: " 100%",
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: " rgba(0, 0, 0, 0.2)",
  zIndex: 3,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // cursor: "pointer",
  "&:hover": {
    opacity: 1,
    transition: " all 0.5s ease",
    cursor: "pointer",
  },
});

// const Circle = styled.div`
//   width: 200px;
//   height: 200px;
//   border-radius: 50%;
//   background-color: white;
//   position: absolute;
// `;

const Image1 = styled("img")({
  height: "100%",
  width: "100%",
  zIndex: 2,
});

const Icon = styled("div")({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "10px",

  "&:hover": {
    backgroundColor: "#e9f5f5",
    transform: "scale(1.1)",
    transition: "all 0.5s ease",
  },
});
// const fetcherFunc = (url) => {
//   console.log("CALL SWR");
//   return axios
//     .create({
//       headers: localStorageHelper.getLocalStorage("user") && {
//         Authorization:
//           "Bearer " + localStorageHelper.getLocalStorage("user").accessToken,
//       },
//     })
//     .get(url)
//     .then((res) => res.data);
// };
function EditOrder() {
  // const location = useLocation();
  const router = useRouter();

  const dispatch = useDispatch();
  // const [orderInit, setOrderInit] = useState(location.state.order);
  const [openModal, setOpenModal] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [openModalListProduct, setOpenModalListProduct] = useState(false);
  const [fZone, setFZone] = useState(0);
  const [change, setChange] = useState(false);

  //redux
  const order = useSelector((state) => state.order.currentOrder);
  const isFetching = useSelector((state) => state.order.isFetching);
  const products = useSelector((state) => state.product.products);
  const isFetchingProduct = useSelector((state) => state.product.isFetching);

  const [producToChange, setProducToChange] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [filters, setFilters] = useState({ color: "", size: "" });
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;

    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  const timeElapsed = Date.now();

  let uniqueColor = [];
  let uniqueSize = [];

  const paysList = [
    { id: 1, title: "Senegal", value: "Senegal" },
    { id: 2, title: "Maroc", value: "Maroc" },
    { id: 3, title: "France", value: "France" },
  ];
  const snshippingList = [
    { id: 1, title: "Dakar", value: 1500 },
    { id: 2, title: "Pikine", value: 2500 },
    { id: 3, title: "Guédiawaye", value: 2500 },
    { id: 4, title: "Rufisque", value: 3000 },
    { id: 5, title: "Diourbel", value: 5000 },
    { id: 6, title: "Fatick", value: 5000 },
    { id: 7, title: "Kaffrine", value: 5000 },
    { id: 8, title: "Kaolack", value: 5000 },
    { id: 9, title: "Kédougou", value: 5000 },
    { id: 10, title: "Kolda", value: 5000 },
    { id: 11, title: "Louga", value: 5000 },
    { id: 12, title: "Matam", value: 5000 },
    { id: 13, title: "Saint-Louis", value: 5000 },
    { id: 14, title: "Sédhiou", value: 5000 },
    { id: 15, title: "Tambacounda", value: 5000 },
    { id: 16, title: "Thiès", value: 5000 },
    { id: 17, title: "Ziguinchor", value: 5000 },
  ];
  const payshippingList = [
    { id: 1, title: "Senegal", value: 5000 },
    { id: 2, title: "Maroc", value: 20000 },
    { id: 3, title: "Cote d'ivoire", value: 20000 },
    { id: 4, title: "France", value: 30000 },
  ];
  const initialFValues = {
    id: 0,
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    telephone: "",
    pays: "",
    regiondept: "",
    address: "",
    mdp: "",
    firstName2: "",
    lastName2: "",
    telephone2: "",
    address2: "",
    pays2: "",
    regiondept2: "",
    fraisExpedition: "",
  };
  const getStatOrder = (status) => {
    switch (status) {
      case 0:
        return "Preparation";
        break;
      case 1:
        return "Pret";
        break;
      case 2:
        return "En Route";
        break;
      case 3:
        return "Non Trouve";
        break;
      case 4:
        return "Retourne";
        break;
      case 5:
        return "Livre";
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getOrderById(dispatch, router.query.id);
    productActions.getAllProduct(dispatch);
  }, [router.isReady]);

  useEffect(() => {
    console.log("filters", filters);
    const getFilteredProducts = () => {
      const foundPro = [];
      products.map((product, index) => {
        product.caract.map((item) => {
          let isFound = Object.entries(filters).every(
            ([key, value]) => item[key] === value
          );
          isFound &&
            foundPro.length !== 0 &&
            foundPro?.caract?.map(
              (ct) =>
                ct.color !== product.caract[index].color &&
                foundPro.push(product)
            );
          if (isFound && foundPro.length === 0) foundPro.push(product);
        });
      });
      console.log("filtrProduct", foundPro);
      setFilteredProducts(foundPro);
    };

    // filters
    // Object.keys(filters).length !== 0
    //   ? getFilteredProducts()
    //   : setFilteredProducts(products);

    filters.color !== "" && filters.size !== ""
      ? getFilteredProducts()
      : setFilteredProducts(products);
  }, [products, filters]);

  useEffect(() => {
    // console.log('FilterPrduct Critere',filteredProducts)

    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.caract[0].price - b.caract[0].price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.caract[0].price - a.caract[0].price)
      );
    }
  }, [sort]);

  const handleSelectInputChange = (e) => {
    const { name, value } = e.target;
    // setValues({ ...values, [name]: value });
    setProduct({
      ...product,
      caract: [{ ...product.caract[0], [name]: value }],
    });
  };

  const handleQuantity = (type, product) => {
    if (type === "dec") {
      if (product.caract[0].quantity > 1) {
        setProduct({
          ...product,
          caract: [
            { ...product.caract[0], quantity: product.caract[0].quantity - 1 },
          ],
        });
        // quantity > 1 && setQuantity(quantity - 1);
        dispatch(
          updateOrderSuccess({
            ...order,
            productsOrders: order.productsOrders.map((item) =>
              item.id === product.id
                ? {
                    ...product,
                    caract: [
                      {
                        ...product.caract[0],
                        quantity: product.caract[0].quantity - 1,
                      },
                    ],
                  }
                : item
            ),
            total: order.total - product.caract[0].price * 1,
            amount:
              order.total - product.caract[0].price * 1 + order.fraisExpedition,
          })
        );
      }
    } else {
      setProduct({
        ...product,
        caract: [
          { ...product.caract[0], quantity: product.caract[0].quantity + 1 },
        ],
      });
      // setQuantity(quantity + 1);
      dispatch(
        updateOrderSuccess({
          ...order,
          productsOrders: order.productsOrders.map((item) =>
            item.id === product.id
              ? {
                  ...product,
                  caract: [
                    {
                      ...product.caract[0],
                      quantity: product.caract[0].quantity + 1,
                    },
                  ],
                }
              : item
          ),
          total: order.total + product.caract[0].price * 1,
          amount:
            order.total + product.caract[0].price * 1 + order.fraisExpedition,
        })
      );
    }
  };

  const validate = (fieldValues = values) => {
    // let iscaract = Object.keys(inputCart).length === 0;
    let temp = { ...errors };

    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "This field is required.";
    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "This field is required.";
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("telephone" in fieldValues)
      temp.telephone =
        fieldValues.telephone.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("pays" in fieldValues)
      temp.pays = fieldValues.pays.length != 0 ? "" : "This field is required.";
    if (values.pays === "Senegal") {
      if ("regiondept" in fieldValues) {
        temp.regiondept =
          fieldValues.regiondept.length != 0 ? "" : "This field is required.";
      }
    }

    if ("firstName2" in fieldValues)
      temp.firstName2 = fieldValues.firstName2 ? "" : "This field is required.";
    if ("lastName2" in fieldValues)
      temp.lastName2 = fieldValues.lastName2 ? "" : "This field is required.";
    if ("address2" in fieldValues)
      temp.address2 = fieldValues.address2 ? "" : "This field is required.";
    if ("telephone2" in fieldValues)
      temp.telephone2 =
        fieldValues.telephone2.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("pays2" in fieldValues)
      temp.pays2 =
        fieldValues.pays2.length != 0 ? "" : "This field is required.";
    if (values.pays2 === "Senegal") {
      if ("regiondept2" in fieldValues)
        temp.regiondept2 =
          fieldValues.regiondept2.length != 0 ? "" : "This field is required.";
    }

    // if ('departmentId' in fieldValues)
    //     temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
    setErrors({
      ...temp,
    });

    if (fieldValues == values) {
      console.log("validate", values);
      return Object.values(temp).every((item) => item == "");
    }

    //Object.values return un array des values de temp
  };
  const getPriceShippingPays = (pays, name) => {
    console.log("pays", pays);
    payshippingList.forEach((item) => {
      item.title === pays && name === "pays2" && setFZone(item.value);
    });
  };
  const getPriceShippingRegion = (region, name) => {
    console.log("region", region);
    snshippingList.forEach((item) => {
      item.title === region && name === "regiondept2" && setFZone(item.value);
    });
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(
      initialFValues,
      true,
      validate,
      getPriceShippingPays,
      getPriceShippingRegion,
      true
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      // alert("testing")
      const infoclient = {
        addressEmetteur: {
          firstName: values.firstName,
          lastName: values.lastName,
          telephone: values.telephone,
          address: values.address,
          email: values.email,
          pays: values.pays,
          region: values.regiondept,
        },
        addressExpdition: {
          firstName: values.firstName2,
          lastName: values.lastName2,
          telephone: values.telephone2,
          address: values.address2,
          pays: values.pays2,
          region: values.regiondept2,
        },
      };
      console.log("client", infoclient);
      // dispatch(
      //   updateOrderSuccess({
      //     ...order,
      //     fraisExpedition: fZone,
      //     ...infoclient,
      //     amount: order.total + fZone,
      //   })
      // );
      updateOrder(dispatch, {
        ...order,
        fraisExpedition: fZone,
        ...infoclient,
        amount: order.total + fZone,
      });

      // mutate();

      setChange(!change);
      setOpenModalInfo(false);
    }
  };

  // if (!order) return <div>Loading... </div>;
  // if (error) return <div>Erreur </div>;
  return (
    <Container>
      {!isFetching && (
        <Wrapper>
          <ResumeOrderContainer>
            <OrderItem>
              <ItemTitle>Date</ItemTitle>
              <ItemContainer>{order?.orderDate}</ItemContainer>
              <ItemTitle>Numero Commande</ItemTitle>
              <ItemContainer>{order?.numOrder}</ItemContainer>
            </OrderItem>
            <Hr2 />
            <OrderItem>
              <ItemTitle>Client</ItemTitle>
              <ItemContainer>
                {order?.addressEmetteur?.firstName}{" "}
                {order?.addressEmetteur?.lastName}
              </ItemContainer>
              <ItemTitle> {order?.addressEmetteur?.telephone} </ItemTitle>
            </OrderItem>
            <Hr2 />
            <OrderItem>
              <ItemTitle>Adresse Livraison</ItemTitle>
              <ItemContainer>
                {order?.addressExpdition?.firstName}{" "}
                {order?.addressExpdition?.lastName}
              </ItemContainer>
              <ItemTitle>Tel:{order?.addressExpdition?.telephone} </ItemTitle>
              <ItemTitle>Adresse:{order?.addressExpdition?.address} </ItemTitle>
            </OrderItem>
            <Hr2 />
            <OrderItem>
              <ItemTitle>Paiement</ItemTitle>
              <ItemContainer>{order?.amount} FCFA</ItemContainer>
              <ItemTitle>{order?.mdp}</ItemTitle>
              <Typography
                color={(order?.statusPay === "encours" && "error") || "success"}
              >
                {order?.statusPay}
              </Typography>

              {/* <Label
                sx={{ width: { xs: "20%", sm: "100%" } }}
                variant="ghost"
                color={(order?.statusPay === "encours" && "error") || "success"}
              >
                {sentenceCase(order?.statusPay)}
              </Label> */}
            </OrderItem>
            <Hr2 />
            <OrderItem>
              <ItemTitle>Etape</ItemTitle>
              <Typography color={"primary"}>
                {getStatOrder(order?.statusOrder)}
              </Typography>
              {/* <Label
                sx={{ width: { xs: "20%", sm: "100%" } }}
                variant="ghost"
                color={"success"}
              >
                {sentenceCase(getStatOrder(order?.statusOrder))}
              </Label> */}
            </OrderItem>
            <Hr2 />
            {/* {order?.statusPay === "encours" && order?.statusOrder === 0 && (  )} */}
            <OrderItem>
              <ItemTitle>Editer Info</ItemTitle>

              <IconButton
                sx={{ width: "40px" }}
                onClick={() => {
                  if (Object.keys(order).length !== 0) {
                    const addressExpdition = {
                      firstName2: order.addressExpdition.firstName,
                      lastName2: order.addressExpdition.lastName,
                      telephone2: order.addressExpdition.telephone,
                      address2: order.addressExpdition.address,
                      pays2: order.addressExpdition.pays,
                      regiondept2: order.addressExpdition.region,
                    };

                    setValues({
                      // id: order.id,
                      ...order,
                      fraisExpedition: order.fraisExpedition,
                      ...order.addressEmetteur,
                      regiondept: order.addressEmetteur.region,
                      ...addressExpdition,
                    });
                    // regler le frais si il ny pas eu de modifications
                    setFZone(order.fraisExpedition);
                  }
                  setOpenModalInfo(true);
                }}
              >
                <Iconify icon="eva:edit-2-outline" />
              </IconButton>
            </OrderItem>
          </ResumeOrderContainer>
          <DetailsOrderTitle>
            <Typography variant="h4" sx={{ mt: "8px", color: "teal" }}>
              Details de la Commande
            </Typography>
            {/* <IconButton onClick={() => {}}>
              <Iconify icon="eva:plus-circle-outline" />{" "}
            </IconButton> */}
          </DetailsOrderTitle>
          <TableWrapper>
            <TableHeader>
              <TableTitle>Produit</TableTitle>
              <TableTitle>Total</TableTitle>
            </TableHeader>
            <TableDetail>
              {order?.productsOrders?.map((product, index) => (
                <Box key={index}>
                  <ProductItem>
                    <Box
                      sx={{ display: "flex", gap: { sm: "30px", xs: "20px" } }}
                    >
                      <Image
                        height={100}
                        width={120}
                        src={`data:image/*;base64,${product.img}`}
                      />
                      <ProductDescQty>
                        {product.name}
                        <br />
                        Couleur<b> {product.caract[0].color}</b>
                        <br />
                        Taille : <b>{product.caract[0].size}</b>
                      </ProductDescQty>
                      <Box>
                        Quantite <br />
                        <b> x {product.caract[0].quantity}</b>
                      </Box>
                    </Box>
                    <Box>
                      {order?.statusPay === "encours" &&
                        order?.statusOrder === 0 && (
                          <>
                            <IconButton>
                              <Iconify icon="eva:trash-2-outline" />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                setOpenModal(true);
                                setProduct(product);
                              }}
                            >
                              <Iconify icon="eva:edit-2-outline" />{" "}
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                setOpenModalListProduct(true);
                                setProducToChange(product);
                              }}
                            >
                              <Iconify icon="eva:swap-outline" rotate={3} />{" "}
                            </IconButton>
                          </>
                        )}
                    </Box>
                    <TotalProduct>
                      <b>
                        {product.caract[0].price * product.caract[0].quantity} F
                        CFA
                      </b>
                    </TotalProduct>
                  </ProductItem>
                  <Hr
                    sx={{
                      backgroundColor: " gray",
                      width: "100%",
                      opacity: 0.2,
                      height: "0.5px",
                    }}
                  />
                </Box>
              ))}

              <SousTotalContainer>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: { xs: "100%", sm: "50%" },
                  }}
                >
                  <Box sx={{ color: "teal" }}>Sous-Total:</Box>
                  <Box>
                    <b>{order?.total} F CFA</b>
                    {/* <b>{total} F CFA</b> */}
                  </Box>
                </Box>
              </SousTotalContainer>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <Hr
                  sx={{
                    backgroundColor: " gray",
                    width: { xs: "100%", sm: "50%" },
                    opacity: 0.2,
                  }}
                />
              </Box>
              <SousTotalContainer>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: { xs: "100%", sm: "50%" },
                  }}
                >
                  <Box sx={{ color: "teal" }}>Expédition :</Box>
                  <Box>
                    {order?.addressExpdition
                      ? `${order?.addressExpdition?.pays}/${order?.addressExpdition?.region} `
                      : ` ${order?.addressEmetteur?.pays}/${order?.addressEmetteur?.region}`}
                  </Box>
                  <Box>
                    <b>{order?.fraisExpedition} F CFA</b>
                  </Box>
                </Box>
              </SousTotalContainer>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <Hr
                  sx={{
                    backgroundColor: " gray",
                    width: { xs: "100%", sm: "50%" },
                    opacity: 0.2,
                  }}
                />
              </Box>
              <SousTotalContainer>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: { xs: "100%", sm: "50%" },
                  }}
                >
                  <Box
                    sx={{ color: "teal", fontWeight: "bold", fontSize: "20px" }}
                  >
                    Total :
                  </Box>
                  <Box sx={{ fontWeight: "bold", fontSize: "20px" }}>
                    {order?.amount} F CFA
                  </Box>
                </Box>
              </SousTotalContainer>
              <Hr
                sx={{ backgroundColor: " gray", width: "100%", opacity: 0.2 }}
              />
            </TableDetail>
          </TableWrapper>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "0px",
            }}
          >
            <AddButton
              sx={{
                backgroundColor: "teal",
                borderRadius: "10px",
                color: "white",
                padding: "10px",
                margin: "30px 20px 0px 0px",
                "&:hover": {
                  backgroundColor: "teal",
                },
              }}
              onClick={() => {
                updateOrder(dispatch, order);
              }}
            >
              Enregister
            </AddButton>
            <AddButton
              variant="outline"
              sx={{
                borderRadius: "10px",
                color: "teal",
                padding: "10px",
                margin: "30px 20px 0px 0px",
                "&:hover": {
                  backgroundColor: "teal",
                  color: "white",
                },
              }}
              onClick={() => {
                console.log("orderInit", orderInit);
                // updateOrder(dispatch, orderInit);
                // dispatch(updateOrderSuccess({ ...orderInit }));
                // setOrder({ ...orderInit });
              }}
            >
              Annuler modifications
            </AddButton>
          </Box>
          <ToastContainer />
        </Wrapper>
      )}
      {/* debut  modal */}
      <Modal open={openModal}>
        <ModalContainer>
          <CloseModalContainer>
            <CloseModalButton
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <Clear />
            </CloseModalButton>

            {/* <Product product={product} /> */}
          </CloseModalContainer>
          {product.id && (
            <Wrapper1>
              <ImageContainer>
                <Image src={`data:image/*;base64,${product.img}`} />
              </ImageContainer>
              <InfoContainer>
                <Title>{product.name}</Title>

                <Desc>{product.desc}</Desc>
                <Price>
                  {/* {Object.keys(newCaract).length === 0 ? product.caract[0].price * quantity:newCaract.price * quantity} F */}
                  {/* {product.caract[0].price * quantity} F */}
                  {product.caract[0].price * product.caract[0].quantity} F
                  {/* {product.caract[0].price * quantity} F  */}
                </Price>
                <Detail>
                  <Filter>
                    <FormControl
                      sx={{ minWidth: 100, marginRight: "20px" }}
                      size="small"
                    >
                      <InputLabel id="demo">Couleur</InputLabel>
                      <Select
                        labelId="demo"
                        name="color"
                        defaultValue={
                          // newCaract.color
                          product.caract[0].color
                        }
                        // value={values.color}
                        autoWidth
                        id="demo-color"
                        label="Couleur"
                        onChange={handleSelectInputChange}
                      >
                        {product.caract?.forEach((elt) => {
                          if (uniqueColor.indexOf(elt.color) === -1) {
                            uniqueColor.push(elt.color);
                          }
                        })}
                        {uniqueColor.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                      {/* {error && <FormHelperText>{error}</FormHelperText>} */}
                    </FormControl>
                  </Filter>
                  <Filter>
                    <FormControl
                      sx={{ minWidth: 100, marginRight: "20px" }}
                      size="small"
                    >
                      <InputLabel id="demo">Taille</InputLabel>
                      <Select
                        labelId="demo"
                        name="size"
                        defaultValue={
                          product.caract[0].size
                          //  newCaract.size
                        }
                        // value={values.color}
                        autoWidth
                        id="demo-color"
                        label="Taille"
                        onChange={handleSelectInputChange}
                      >
                        {product.caract?.forEach((elt) => {
                          if (uniqueSize.indexOf(elt.size) === -1) {
                            uniqueSize.push(elt.size);
                          }
                        })}
                        {uniqueSize.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Filter>
                </Detail>
                <AddContainer>
                  <AddMount>
                    <IconButton
                      size="small"
                      onClick={() => handleQuantity("dec", product)}
                    >
                      {""}
                      <Remove />
                    </IconButton>
                    {/* {quantity} */}
                    {product.caract[0].quantity}
                    <IconButton
                      size="small"
                      onClick={() => handleQuantity("inc", product)}
                    >
                      {""}
                      <Add />
                    </IconButton>
                  </AddMount>
                  {/* {isFetching ? (
                    <AddButton
                      endIcon={<CircularProgress color="primary" size={20} />}
                    >
                      Ajouter au Panier{" "}
                    </AddButton>
                  ) : ( */}
                  {/* <AddButton onClick={handleClick}>Enregister</AddButton> */}
                  {/* )} */}
                </AddContainer>
              </InfoContainer>
            </Wrapper1>
          )}
        </ModalContainer>
      </Modal>
      <Modal open={openModalInfo}>
        <ModalContainer>
          <CloseModalContainer>
            <Typography variant="h6">Details Client</Typography>
            <CloseModalButton onClick={() => setOpenModalInfo(false)}>
              <Clear />
            </CloseModalButton>

            {/* <Product product={product} /> */}
          </CloseModalContainer>
          <Form sx={{ marginTop: "0px" }} onSubmit={handleSubmit}>
            <Wrapper>
              <Box>
                <Hr sx={{ marginBottom: "18px" }} />
              </Box>
              <Grid
                container
                spacing={{ xs: 2, sm: 2 }}
                columns={{ xs: 4, sm: 12 }}
              >
                <Grid item xs={4} sm={6}>
                  <Controls.Input
                    name="firstName"
                    label="Prenom"
                    value={values.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                    fullWidth
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={4} sm={6}>
                  <Controls.Input
                    name="lastName"
                    label="Nom"
                    value={values.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={4} sm={6}>
                  <Controls.Select
                    name="pays"
                    label="Pays"
                    value={values.pays}
                    onChange={handleInputChange}
                    options={payshippingList}
                    error={errors.pays}
                    fullWidth
                    // sx={{mt:1}}
                  />
                </Grid>
                <Grid item xs={4} sm={6}>
                  {values.pays === "Senegal" && (
                    <Controls.Select
                      name="regiondept"
                      label="Region/Departement"
                      value={values.regiondept}
                      onChange={handleInputChange}
                      options={snshippingList}
                      error={errors.regiondept}
                      fullWidth
                      // sx={{mt:1}}
                    />
                  )}
                </Grid>
                <Grid item xs={4} sm={6}>
                  <Controls.Input
                    name="address"
                    label="address"
                    value={values.address}
                    onChange={handleInputChange}
                    error={errors.address}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={4} sm={6}>
                  <Controls.Input
                    name="telephone"
                    label="Telephone"
                    value={values.telephone}
                    onChange={handleInputChange}
                    error={errors.telephone}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={4} sm={12}>
                  <Controls.Input
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={4} sm={12}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Addresse de Livraison
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={6}>
                  <Controls.Input
                    name="firstName2"
                    label="Prenom"
                    value={values.firstName2}
                    onChange={handleInputChange}
                    error={errors.firstName2}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={4} sm={6}>
                  <Controls.Input
                    name="lastName2"
                    label="Nom"
                    value={values.lastName2}
                    onChange={handleInputChange}
                    error={errors.lastName2}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={4} sm={6}>
                  <Controls.Select
                    name="pays2"
                    label="Pays"
                    value={values.pays2}
                    onChange={handleInputChange}
                    options={payshippingList}
                    error={errors.pays2}
                    fullWidth
                    // sx={{mt:1}}
                  />
                </Grid>
                <Grid item xs={4} sm={6}>
                  {values.pays2 === "Senegal" && (
                    <Controls.Select
                      name="regiondept2"
                      label="Region/Departement"
                      value={values.regiondept2}
                      onChange={handleInputChange}
                      options={snshippingList}
                      error={errors.regiondept2}
                      fullWidth
                      // sx={{mt:1}}
                    />
                  )}
                </Grid>
                <Grid item xs={4} sm={6}>
                  <Controls.Input
                    name="telephone2"
                    label="Telephone"
                    value={values.telephone2}
                    onChange={handleInputChange}
                    error={errors.telephone2}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={4} sm={6}>
                  <Controls.Input
                    name="address2"
                    label="addresse"
                    value={values.address2}
                    onChange={handleInputChange}
                    error={errors.address2}
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>
              <Box sx={{ marginTop: "0px" }}>
                <Controls.Button
                  type="submit"
                  text="Valider"
                  fullWidth
                  sx={{
                    backgroundColor: "teal",
                    color: "white",
                    padding: "10px",
                    margin: "30px 0px",
                    "&:hover": {
                      backgroundColor: "teal",
                    },
                  }}
                />
              </Box>
            </Wrapper>
          </Form>
        </ModalContainer>
      </Modal>
      <Modal open={openModalListProduct}>
        <ModalContainerListProduct>
          <CloseModalContainer>
            <Typography variant="h6">Selectionner </Typography>
            <CloseModalButton
              onClick={() => {
                setOpenModalListProduct(false);
              }}
            >
              <Clear />
            </CloseModalButton>
          </CloseModalContainer>
          <Box width={"100%"}>
            <FilterContainer>
              <Filter>
                <FilterText>Filtrer Tenues:</FilterText>
                <FormControl
                  sx={{ minWidth: 100, marginRight: "20px" }}
                  size="small"
                >
                  <InputLabel id="demo">Couleur</InputLabel>
                  <Select
                    labelId="demo"
                    name="color"
                    // defaultValue=""
                    value={filters.color}
                    autoWidth
                    id="demo-color"
                    label="Couleur"
                    onChange={handleFilters}
                  >
                    <MenuItem value={"Noire"}>Noire</MenuItem>
                    <MenuItem value={"Blanche"}>Blanche</MenuItem>
                    <MenuItem value={"Jaune"}>Jaune</MenuItem>
                    <MenuItem value={"Bleu"}>Bleu</MenuItem>
                    <MenuItem value={"Verte"}>verte</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  sx={{ minWidth: 80, marginRight: "20px" }}
                  size="small"
                >
                  <InputLabel id="demo1">Taille</InputLabel>
                  <Select
                    labelId="demo1"
                    name="size"
                    // defaultValue=""
                    value={filters.size}
                    autoWidth
                    id="demo1-size"
                    label="Taille"
                    onChange={handleFilters}
                  >
                    <MenuItem value={"XS"}>XS</MenuItem>
                    <MenuItem value={"S"}>S</MenuItem>
                    <MenuItem value={"M"}>M</MenuItem>
                    <MenuItem value={"L"}>L</MenuItem>
                    <MenuItem value={"XL"}>XL</MenuItem>
                  </Select>
                </FormControl>
              </Filter>
              <Filter>
                <FilterText>Trier Tenues:</FilterText>
                <FormControl
                  sx={{ minWidth: 100, marginRight: "20px" }}
                  size="small"
                >
                  <InputLabel id="demo2">Critere</InputLabel>
                  <Select
                    labelId="demo2"
                    defaultValue=""
                    autoWidth
                    id="demo2-citere"
                    label="Critere"
                    selected="newest"
                    onChange={(e) => {
                      setSort(e.target.value);
                    }}
                  >
                    <MenuItem value="newest">Plus recents</MenuItem>
                    <MenuItem value="asc">Moins chers</MenuItem>
                    <MenuItem value="desc">Plus chers</MenuItem>
                  </Select>
                </FormControl>
              </Filter>
              <Filter>
                <IconButton
                  onClick={() => {
                    setFilters({ color: "", size: "" });
                    setSort("newest");
                  }}
                >
                  <Clear />
                </IconButton>
              </Filter>
            </FilterContainer>
            {/* <Products filters={filters} sort={sort} /> */}
            <Box sx={{ margin: "34px 0px", padding: "15px" }}>
              {/* <Typography variant="h5">Produits</Typography> */}
              <Grid
                container
                spacing={{ xs: 2, sm: 4 }}
                columns={{ xs: 4, sm: 12 }}
              >
                {isFetchingProduct ? (
                  // <Stack spacing={1}>
                  //   <Skeleton variant="text" height={100} />
                  //   <Skeleton variant="text" height={20} />
                  //   <Skeleton variant="text" height={20} />
                  //   <Skeleton variant="rectangular" height={300} />
                  // </Stack>
                  <>
                    <Grid item xs={4} sm={3}>
                      <Skeleton variant="rectangular" height={200} />
                      <Skeleton variant="text" height={20} />
                      <Skeleton variant="text" height={20} />
                    </Grid>
                    <Grid item xs={4} sm={3}>
                      <Skeleton variant="rectangular" height={200} />
                      <Skeleton variant="text" height={20} />
                      <Skeleton variant="text" height={20} />
                    </Grid>
                    <Grid item xs={4} sm={3}>
                      <Skeleton variant="rectangular" height={200} />
                      <Skeleton variant="text" height={20} />
                      <Skeleton variant="text" height={20} />
                    </Grid>
                    <Grid item xs={4} sm={3}>
                      <Skeleton variant="rectangular" height={200} />
                      <Skeleton variant="text" height={20} />
                      <Skeleton variant="text" height={20} />
                    </Grid>
                  </>
                ) : (
                  // filters ?
                  filteredProducts?.map((item, index) => (
                    <Grid item xs={4} sm={3} key={index}>
                      {/* <Product item={item} key={item.id} /> */}
                      <Card variant="outlined">
                        <Container1
                          onClick={() => {
                            console.log("old", producToChange);
                            console.log("new", item);
                            const newProductsOrder = order?.productsOrders?.map(
                              (product, index) =>
                                product.id === producToChange.id
                                  ? {
                                      ...item,
                                      caract: [
                                        { ...item.caract[0], quantity: 1 },
                                      ],
                                    }
                                  : product
                            );
                            console.log("lesproducts", newProductsOrder);
                            dispatch(
                              updateOrderSuccess({
                                ...order,
                                productsOrders: [...newProductsOrder],
                                total:
                                  order.total +
                                  item.caract[0].price * 1 -
                                  // item.caract[0].quantity
                                  producToChange.caract[0].price *
                                    producToChange.caract[0].quantity,
                                amount:
                                  order.total +
                                  item.caract[0].price * 1 +
                                  // item.caract[0].quantity
                                  order.fraisExpedition -
                                  producToChange.caract[0].price *
                                    producToChange.caract[0].quantity,
                              })
                            );

                            setOpenModalListProduct(false);
                          }}
                        >
                          <Info>
                            <Icon>
                              {/* <Link to={`/product/${item.id}`}> */}

                              {/* <Link to="/productselect" state= {{product:item }}  > */}
                              <Check />
                              {/* </Link> */}
                            </Icon>
                          </Info>
                          <Image1 src={`data:image/*;base64,${item.img}`} />
                        </Container1>
                        <CardActions>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            <Link href={`/products/${item.id}`} passHref>
                              {/* state={{ product: item }} color="inherit"> */}
                              <Typography
                                variant="subtitle2"
                                noWrap
                                sx={{
                                  // color: "blue",
                                  ":hover": {
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                  },
                                }}
                              >
                                {item.name}
                              </Typography>
                            </Link>
                            {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}> */}
                            <Typography
                              size="small"
                              variant="h7"
                              sx={{ color: "#3556b8", fontWeight: "bold" }}
                            >
                              {`${item?.caract[0].price} F CFA`}
                            </Typography>
                            {/* <IconButton size="small" color="primary">
            <AddShoppingCart />
          </IconButton> */}
                            {/* </Box> */}
                          </Box>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))
                  //  :(products.slice(0,8).map((item,index) =>(
                  //  <Grid item xs={4} sm={3} key={index}>
                  //       <Product item={item} key={item.id} />
                  //   </Grid>
                  //   )))
                )}
              </Grid>
            </Box>
          </Box>
        </ModalContainerListProduct>
      </Modal>
    </Container>
  );
}
EditOrder.auth = true;
EditOrder.layout = "profile";

export default EditOrder;

// export async function getServerSideProps(context) {
//   //req res query
//   const { token } = cookies(context);
//   const id = context.query.id;

//   console.log("TOKEN", token);

//   try {
//     const data = await orderService.getOrderById(id, token);
//     console.log("get product data", data);
//     // const initialKey = buildKey(id);
//     return { props: { orderInit: data } };
//   } catch (err) {
//     return { props: { error: "Something went wrong." } };
//   }
// }
