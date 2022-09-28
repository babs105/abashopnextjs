import React, { useEffect, useState } from "react";
import { Form, useForm } from "../components/useForm";
import Controls from "../components/controls/Controls";
import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import { Clear, Visibility, VisibilityOff } from "@mui/icons-material";
import { addOrder } from "../redux/orderRedux/callOrderApi";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
// import { reset } from '../redux/cartRedux/cartRedux';
import moment from "moment";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { updateCartSuccess } from "../redux/cartRedux/cartRedux";
// import { history } from "../";

import ProductCartWidget from "../components/ProductCartWidget";
import { getAllTarifZone } from "../redux/tarifZoneRedux/callTarifZoneApi";

const Container = styled("div")({
  width: "100%",
  // backgroundColor:"red"
});
const Wrapper = styled(Box)(({ theme }) => ({
  // margin:"20px 0px",
  // width:"100%",
  padding: "30px",
  display: "flex",
  flex: "wrap",
  gap: "30px",
  [theme.breakpoints.down("sm")]: {
    // width:"100%",
    flexDirection: "column",
    // padding: "10px",
  },
}));
const Hr = styled("hr")({
  backgroundColor: "#eee",
  border: "none",
  height: "2px",
});

const DetailsCommandeContainer = styled("div")({
  flex: 2,
  // minWidth:"50%"
  /* ${mobile({ padding: "10px" })} */
});
const ResumeCommandeContainer = styled("div")({
  flex: 1,

  /* ${mobile({ padding: "10px" })} */
});
const ResumeCommande = styled("div")({
  backgroundColor: "#eee",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  // alignItems:"start",
  gap: "15px",
});
const CommandeTitle = styled("h4")({
  color: "teal",
});
const HeadTable = styled(Box)({
  display: "flex",
  // width:"280px",
  justifyContent: "space-between",
  alignItems: "center",
  color: "teal",
  fontWeight: "bold",
});

const ProductContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});
const ProductItem = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  // width:"280px",
});
const ProductDescQty = styled("div")({
  fontSize: "14px",
  // width:"60%",
});
const TotalProduct = styled("div")({
  fontSize: "15px",
  // width:"40%"
});
const SousTotalContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});
const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "30%",
  top: 0,
  right: "30%",
  // bottom:0,
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "white",
  boxShadow: 24,
  // border:0,
  outline: 0,
  height: "100%",
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
  justifyContent: "flex-end",
  width: "100%",

  [theme.breakpoints.down("sm")]: {},
}));
const CloseModalButton = styled(IconButton)(({ theme }) => ({
  padding: "10px",
  margin: "10px",
  [theme.breakpoints.down("sm")]: {},
}));
const WrapperButtonPaid = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "90%",
  padding: "10px",

  [theme.breakpoints.down("sm")]: {},
}));

function DetailsCommande({ location }) {
  // const cart = location.state;
  const cart = useSelector((state) => state.cart.mycart);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const isFetching = useSelector((state) => state.order.isFetching);
  const [searchName, setSearchName] = useState("");
  const tarifZones = useSelector((state) => state.tarifsZone.tarifZones);

  const isFetchingUpdateCart = useSelector((state) => state.cart.isFetching);
  const [zone, setZone] = useState({ id: 0, title: "", value: 0 });

  const [changeExpediteur, setChangeExpediteur] = useState(false);
  const [createCompte, setCreateCompte] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(false);
  // const [cart, setCart] = useState(location.state);

  const amount = (cart?.total + cart?.fraisExpedition) * 0.0016;
  const currency = "USD";
  const style = { layout: "vertical" };
  // const [mdp ,setMdp]=useState('Paiement a la livraison')

  const mdpList = [
    { id: "Paiement a la livraison", title: "Paiement a la livraison" },
    {
      id: "Paiement par Wave ou Orange Money",
      title: "Paiement par Wave ou Orange Money",
    },
    { id: "Paiement en ligne", title: "Paiement en ligne" },
  ];

  // const snshippingList = [
  //   { id: 1, title: "Dakar", value: 1500 },
  //   { id: 2, title: "Pikine", value: 5500 },
  //   { id: 3, title: "Guédiawaye", value: 2500 },
  //   { id: 4, title: "Rufisque", value: 3000 },
  //   { id: 5, title: "Diourbel", value: 5000 },
  //   { id: 6, title: "Fatick", value: 5000 },
  //   { id: 7, title: "Kaffrine", value: 5000 },
  //   { id: 8, title: "Kaolack", value: 5000 },
  //   { id: 9, title: "Kédougou", value: 5000 },
  //   { id: 10, title: "Kolda", value: 5000 },
  //   { id: 11, title: "Louga", value: 5000 },
  //   { id: 12, title: "Matam", value: 5000 },
  //   { id: 13, title: "Saint-Louis", value: 5000 },
  //   { id: 14, title: "Sédhiou", value: 5000 },
  //   { id: 15, title: "Tambacounda", value: 5000 },
  //   { id: 16, title: "Thiès", value: 5000 },
  //   { id: 17, title: "Ziguinchor", value: 5000 },
  //   // {id:18,	title:"Maroc",value:20000},
  //   // {id:19,	title:"Cote d'ivoire",value:20000},
  //   // {id:20,	title:"France",value:30000}
  // ];
  // const payshippingList = [
  //   { id: 1, title: "Senegal", value: 5000 },
  //   { id: 2, title: "Maroc", value: 20000 },
  //   { id: 3, title: "Cote d'ivoire", value: 20000 },
  //   { id: 4, title: "France", value: 30000 },
  // {id:4,	title:"Rufisque",value:3000},
  // {id:5,	title:"Diourbel",value:5000},
  // {id:6,	title:"Fatick",value:5000},
  // {id:7,	title:"Kaffrine",value:5000},
  // {id:8,	title:"Kaolack",value:5000},
  // {id:9,	title:"Kédougou",value:5000},
  // {id:10,	title:"Kolda",value:5000},
  // {id:11,	title:"Louga",value:5000},
  // {id:12,	title:"Matam",value:5000},
  // {id:13,	title:"Saint-Louis",value:5000},
  // {id:14,	title:"Sédhiou",value:5000},
  // {id:15,	title:"Tambacounda",value:5000},
  // {id:16,	title:"Thiès",value:5000},
  // {id:17,	title:"Ziguinchor",value:5000}
  // ];

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
    mdp: "Paiement a la livraison",
    firstName2: "",
    lastName2: "",
    telephone2: "",
    address2: "",
    pays2: "",
    regiondept2: "",
    // gender: 'male',
    // departmentId: '',
    // hireDate: new Date(),
    // isPermanent: false,
  };

  useEffect(() => {
    // !user && history.push("/register");
    console.log("details facture", cart?.products);
    //  cart?.products.length === 0 && history.back();
    getAllTarifZone(dispatch);
    // cart?.products.length === 0 && history.push("/cart");
  }, []);

  useEffect(() => {
    user &&
      setValues({
        ...values,
        ...user,
        email: user.username,
      });
  }, []);
  const validate = (fieldValues = values) => {
    // let iscaract = Object.keys(inputCart).length === 0;
    console.log("VALUES", values);
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
    if ("pays" in fieldValues) {
      temp.pays =
        fieldValues.pays.length !== 0 ? "" : "This field is required.";
    }

    if (values.pays === "Senegal") {
      if ("regiondept" in fieldValues) {
        temp.regiondept =
          fieldValues.regiondept.length !== 0 ? "" : "This field is required.";
      }
    }
    if (createCompte) {
      if ("password" in fieldValues)
        temp.password = fieldValues.password ? "" : "This field is required.";
    }
    if (changeExpediteur) {
      if ("firstName2" in fieldValues)
        temp.firstName2 = fieldValues.firstName2
          ? ""
          : "This field is required.";
      if ("lastName2" in fieldValues)
        temp.lastName2 = fieldValues.lastName2 ? "" : "This field is required.";
      if ("address2" in fieldValues)
        temp.address2 = fieldValues.address2 ? "" : "This field is required.";
      if ("telephone2" in fieldValues)
        temp.telephone2 =
          fieldValues.telephone2.length > 9
            ? ""
            : "Minimum 10 numbers required.";
      if ("pays2" in fieldValues)
        temp.pays2 =
          fieldValues.pays2.length !== 0 ? "" : "This field is required.";
      if (values.pays2 === "Senegal") {
        if ("regiondept2" in fieldValues)
          temp.regiondept2 =
            fieldValues.regiondept2.length !== 0
              ? ""
              : "This field is required.";
      }
    }

    // if ('departmentId' in fieldValues)
    //     temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
    setErrors({
      ...temp,
    });

    if (fieldValues == values) {
      console.log("ERROER", errors);

      return Object.values(temp).every((item) => item === "");
    } //Object.values return un array des values de temp
  };

  const getPriceZone = (zone) => {
    console.log("zone", zone);
    tarifZones.forEach((item) => {
      item.tarifs[0].zone === zone &&
        dispatch(
          updateCartSuccess({ ...cart, fraisExpedition: item.tarifs[0].tarif })
        );
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(
      initialFValues,
      true,
      validate,
      // getPriceShippingPays,
      getPriceZone,
      changeExpediteur
    );

  const createOrder = (statusPay) => {
    addOrder(dispatch, {
      order: {
        userId: user?.id,
        orderDate: moment().format("DD/MM/YYYY HH:mm"),
        productsOrders: cart?.products,
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
          firstName: values.firstName2 ? values.firstName2 : values.firstName,
          lastName: values.lastName2 ? values.lastName2 : values.lastName,
          telephone: values.telephone2 ? values.telephone2 : values.telephone,
          address: values.address2 ? values.address2 : values.address,
          pays: values.pays2 ? values.pays2 : values.pays,
          region: values.regiondept2 ? values.regiondept2 : values.regiondept,
        },

        mdp: values.mdp,
        fraisExpedition: cart?.fraisExpedition,
        total: cart?.total,
        amount: cart?.total + cart?.fraisExpedition,
        statusPay: statusPay,
        statusOrder: 0,
      },
      password: values.password,
      // idCart: cart.id,
    });
    // dispatch(reset());
    // setSuccess(true);
  };
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
      console.log("Amount", amount);
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
                application_context: {
                  shipping_preference: "NO_SHIPPING",
                },
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function () {
              createOrder("paye");
              resetForm();

              //  setOpenModal(false);
            });
          }}
          onError={function (data, actions) {
            setError(true);
            // dispatch(
            //   alertMessage({ message: "Erreur Paiement en Ligne! Ressayer plustard", error: true })
            // );
          }}
        />
      </>
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // alert("testing")
      if (values.mdp === "Paiement en ligne") {
        setOpenModal(true);
      } else {
        createOrder("encours");
        resetForm();
      }

      setChangeExpediteur(false);
      setCreateCompte(false);
    }
  };
  return (
    <Container>
      <Navbar searchName={searchName} setSearchName={setSearchName} />
      <ProductCartWidget />
      <Announcement />
      <Form onSubmit={handleSubmit}>
        <Wrapper>
          <DetailsCommandeContainer>
            <Box mb={4}>
              <Typography variant="h6" component="h2">
                DETAILS FACTURATION
              </Typography>
              <Hr />
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
              <Grid item xs={4} sm={6}>
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
              <Grid item xs={4} sm={6}>
                <Controls.SelectPays
                  name="pays"
                  label="Pays"
                  value={values.pays}
                  onChange={handleInputChange}
                  options={[...new Set(tarifZones.map((elt) => elt.pays))]}
                  error={errors.pays}
                  fullWidth
                  // sx={{mt:1}}
                />
              </Grid>
              <Grid item xs={4} sm={6}>
                {/* {values.pays === "Senegal" && ( */}
                <Controls.SelectTarifZone
                  name="regiondept"
                  label="Region/Departement"
                  value={values.regiondept}
                  onChange={handleInputChange}
                  options={tarifZones.filter((elt) => elt.pays === values.pays)}
                  error={errors.regiondept}
                  fullWidth
                  // sx={{mt:1}}
                />
                {/* )} */}
              </Grid>
              {!user && (
                <Grid item xs={4} sm={12}>
                  <Controls.Checkbox
                    name="createCompte"
                    label="Creer un compte"
                    value={createCompte}
                    onChange={(e) => {
                      setCreateCompte(e.target.value);
                      setErrors({ ...errors, password: "" });
                    }}
                  />
                </Grid>
              )}
              {createCompte && (
                <Grid item xs={4} sm={6}>
                  <Controls.Input
                    name="password"
                    label="Mot de Passe"
                    value={values.password}
                    onChange={handleInputChange}
                    error={errors.password}
                    fullWidth
                    size="small"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={4} sm={12}>
                <Controls.Checkbox
                  name="changeexpedition"
                  label="EXPÉDIER À UNE ADRESSE DIFFÉRENTE ?"
                  value={changeExpediteur}
                  onChange={(e) => {
                    setChangeExpediteur(e.target.value);
                    setErrors({
                      ...errors,
                      firstName2: "",
                      lastName2: "",
                      telephone2: "",
                      address2: "",
                      pays2: "",
                      regiondept2: "",
                    });
                  }}
                />
              </Grid>
              {changeExpediteur && (
                <>
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
                    <Controls.SelectPays
                      name="pays2"
                      label="Pays"
                      value={values.pays2}
                      onChange={handleInputChange}
                      error={errors.pays2}
                      options={[...new Set(tarifZones.map((elt) => elt.pays))]}
                      fullWidth
                      // sx={{mt:1}}
                    />
                  </Grid>
                  <Grid item xs={4} sm={6}>
                    {/* {values.pays2 === "Senegal" && ( */}
                    <Controls.SelectTarifZone
                      name="regiondept2"
                      label="Region/Departement"
                      value={values.regiondept2}
                      onChange={handleInputChange}
                      options={tarifZones.filter(
                        (elt) => elt.pays === values.pays2
                      )}
                      error={errors.regiondept2}
                      fullWidth
                      // sx={{mt:1}}
                    />
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
                </>
              )}
            </Grid>
          </DetailsCommandeContainer>
          <ResumeCommandeContainer>
            <ResumeCommande>
              <CommandeTitle>VOTRE COMMANDE</CommandeTitle>
              <HeadTable>
                <Box
                //  sx={{width:"60%"}}
                >
                  Produit
                </Box>
                <Box
                //  sx={{width:"40%"}}
                >
                  Sous-total
                </Box>
              </HeadTable>
              <ProductContainer>
                {cart?.products.map((product, index) => (
                  <ProductItem key={index}>
                    <ProductDescQty>
                      {product.name} <b>x {product.caract[0].quantity}</b>
                    </ProductDescQty>
                    <TotalProduct>
                      <b>
                        {product.caract[0].price * product.caract[0].quantity} F
                        CFA
                      </b>
                    </TotalProduct>
                  </ProductItem>
                ))}
              </ProductContainer>
              <Hr
                sx={{ backgroundColor: " black", width: "100%", opacity: 0.2 }}
              />
              <SousTotalContainer>
                <Box sx={{ color: "teal" }}>Sous-Total</Box>
                <Box>
                  <b>{cart?.total} F CFA</b>
                </Box>
              </SousTotalContainer>
              <Hr
                sx={{ backgroundColor: " black", width: "100%", opacity: 0.2 }}
              />
              <SousTotalContainer>
                <Box sx={{ color: "teal" }}>Expédition</Box>
                <Box>
                  {" "}
                  forfait:
                  <b>
                    {cart?.fraisExpedition ? cart?.fraisExpedition : 0} F CFA
                  </b>
                </Box>
              </SousTotalContainer>
              <Hr
                sx={{ backgroundColor: " black", width: "100%", opacity: 0.2 }}
              />
              <SousTotalContainer>
                <Box sx={{ color: "teal" }}>Total</Box>
                <Box sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  {cart ? cart.total + cart.fraisExpedition : 0} FCFA
                </Box>
              </SousTotalContainer>
              <Box mt={3}>
                <CommandeTitle>METHODE DE PAIEMENT</CommandeTitle>
                {/* <Typography variant='h6'></Typography> */}
                <Controls.RadioGroup
                  name="mdp"
                  // label="Methode de Paiement"
                  value={values.mdp}
                  onChange={handleInputChange}
                  items={mdpList}
                  sx={{ backgroundColor: "teal", color: "teal" }}
                />
              </Box>
              {cart?.products.length > 0 && values.mdp && (
                <Box sx={{ width: "100%" }}>
                  <Controls.Button
                    type="submit"
                    text="Commander"
                    fullWidth
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      padding: "10px",
                      margin: "30px 20px 0px 0px",
                      "&:hover": {
                        backgroundColor: "black",
                      },
                    }}
                  />
                </Box>
              )}
              <Backdrop
                sx={{
                  color: "teal",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isFetchingUpdateCart}
                // onClick={()=>set}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </ResumeCommande>
          </ResumeCommandeContainer>
        </Wrapper>
      </Form>
      {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isFetching}
        // onClick={()=>set}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

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
          </CloseModalContainer>
          {error && (
            <Typography color="error">
              Une erreur s'est produite lors de votre paiement{" "}
            </Typography>
          )}
          <WrapperButtonPaid>
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AcZ31_ZLRHGFwPGdJGGycZldqYA9qkNqLzTeCsEnQGmg8ooUsT7ru4Xl8pq_97cjzielF1UYJzzTZaK_",
                components: "buttons",
                currency: "USD",
                //  "disable-funding":"credit,card,p24",
                //  "disable-funding":"credit,card,p24",
              }}
            >
              <ButtonWrapper currency={currency} showSpinner={false} />
            </PayPalScriptProvider>
          </WrapperButtonPaid>
        </ModalContainer>
      </Modal>
      <ToastContainer />
    </Container>
  );
}
DetailsCommande.auth = true;
export default DetailsCommande;
