// import { Add, Remove ,Delete,Clear, DeleteOutline,DoneOutline ,ErrorOutline} from "@material-ui/icons";

// import styled from "styled-components";
import { Add, Remove, DeleteOutline } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Link from "next/link";
import {
  removeProductToCartSuccess,
  updateCartSuccess,
} from "../redux/cartRedux/cartRedux";

import ProductCartWidget from "../components/ProductCartWidget";

// const KEY = process.env.REACT_APP_STRIPE;

const Container = styled("div")({
  width: "100%",
  backgroundColor: "#f5f8fc",
  // backgroundColor:"red"
});

const Wrapper = styled(Card)(({ theme }) => ({
  padding: "20px",
  margin: "30px 60px",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    // padding: "5px 0px",
    margin: "30px 0px",
    // alignItems:"stretch",
  },
}));
const Title = styled("h2")({
  textAlign: "center",
  fontWeight: 300,
});
const Top = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const TopButton = styled(Button)({
  borderRadius: "0%",
  border: "2px solid black",
  color: "black",
  padding: "10px",
  fontSize: "12px",
  fontWeight: "bold",
});
const TopText = styled("h4")({
  fontWeight: 500,
  textDecoration: "underline",
});

const Bottom = styled(Box)(({ theme }) => ({
  margin: "20px 0px",
  display: "flex",
  // flex:"nowrap",
  //  justifyContent:"space-between",
  gap: "20px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    flexDirection: "column",
  },
}));
const CartContainer = styled(Box)(({ theme }) => ({
  flex: 2,
  // [theme.breakpoints.down("sm")]: {
  //   display:"flex",
  //   flexDirection:"column"
  // },
}));
const ProductContainer = styled(Box)(({ theme }) => ({
  //  width:"100%",
  // [theme.breakpoints.down("sm")]: {
  //   display:"flex",
  //   justifyContent:"center",
  //   alignItems:"center"
  // },
}));

const HeadTable = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px",
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    // flexDirection:"column",
    // // alignItems:"center",
    // justifyContent:"flex-end",
    display: "none",
    // overflow:"hidden"
    // backgroundColor:"green",
    // // width:"20%",
  },
}));
const ProductItem = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",

    // width:"100%",
  },
}));
const ImageContainer = styled(Box)(({ theme }) => ({
  width: "120px",
  height: "120px",
}));
const Image = styled("img")({
  height: "100%",
  width: "100%",
});
const DetailContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "40%",
  [theme.breakpoints.down("sm")]: {
    // flexDirection:"column"
    alignItems: "center",
    width: "100%",
  },
}));
const ProductName = styled("span")({});
const Color = styled("div")({
  width: "15px",
  height: "15px",
  borderRadius: "50%",
});
const Size = styled("div")({});
const PriceContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
});
const AddMount = styled(Box)({
  border: "1px solid teal",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "18px",
});
const ProductPrice = styled("h4")({
  fontWeight: 400,
  fontSize: "20px",
});

const ProductAction = styled(Box)({});
const RemoveProduct = styled(IconButton)({});
const Hr = styled("hr")({
  backgroundColor: "#eee",
  border: "none",
  height: "2px",
});
const CommandeContainer = styled(Box)({
  flex: "1",

  // backgroundColor:"red"
});
const ResumeCommande = styled(Box)({
  backgroundColor: "#eee",
  // color:"teal",
  position: "relative",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  //   gap: "8px",
});
const CommandeTitle = styled("h4")({
  color: "teal",
  // textAlign:"center",
  // fontWeight:300,
  // fontSize:"28px"
});

const ResumeLine = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const LineTitle = styled(Box)({
  color: "teal",
  // fontSize:"16px",
  // fontWeight:500,
});
const LineContent = styled("h6")({
  fontSize: "20px",
  fontWeight: "bold",
});
const TotalLine = styled(Box)({
  display: "flex",

  justifyContent: "space-between",
});
const TotalTitle = styled("h4")({
  color: "teal",
  fontSize: "28px",
});
const TotalContent = styled("h4")({
  fontWeight: "bold",
  fontSize: "28px",
});
const CommandeButton = styled(Button)({
  backgroundColor: "black",
  color: "white",
  padding: "10px",
  margin: "30px 20px 0px 0px",
  "&:hover": {
    backgroundColor: "black",
  },
});

// const styleModal = {
//   position: 'absolute',
//    left:"10%",
//   top:0,
//   right:"10%",
//   bottom:0,
//   margin:"auto",
//   // transform: 'translate(-50%, -50%)',
//   //  width: "60%",
//   display:"flex",
//   flexDirection:"column",
//   alignItems:"center",
//   bgcolor: 'white',
//   // border: '2px solid #000',
//   boxShadow: 24,
//   px:8,
//   py: 2,
// };
const Cart = () => {
  // const cart = location.state;
  // This values are the props in the UI
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [searchName, setSearchName] = useState("");
  const cart = useSelector((state) => state.cart.mycart);
  const isFetching = useSelector((state) => state.cart.isFetching);
  const [hasMounted, setHasMounted] = useState(false);
  //   const amount = "2";
  //   const currency = "USD";
  //   const style = { layout: "vertical" };
  //   const handleValidCommand = () => {
  //     // console.log("hajjjjj");
  //     // !user && navigate("/login", { state: { redirect: "/detailsCommande" } });
  //     // user && navigate("/detailsCommande");
  //     // // return <Navigate to="/login" state={{ from: history.location }} />;
  //   };
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  // useEffect(() => {
  //   console.log("cart", cart);
  // }, []);

  const handleRemoveToCart = (product) => {
    console.log("idcart", cart.id);
    console.log("product", product);
    const newProduct = { ...product };
    // removeProductToCart(dispatch, {
    //   newProduct,
    //   userId: user?.id,
    //   idCart: cart?.id,
    // });
    dispatch(removeProductToCartSuccess(product));
  };
  const handleQuantity = (product, type) => {
    if (type === "dec") {
      product.caract[0].quantity > 1 &&
        dispatch(
          updateCartSuccess({
            ...cart,
            products: cart.products.map((item) =>
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
            total: cart.total - product.caract[0].price * 1,
          })
        );
    } else {
      dispatch(
        updateCartSuccess({
          ...cart,
          products: cart.products?.map((item) =>
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
          total: cart.total + product.caract[0].price * 1,
        })
      );
    }

    // }
  };
  return (
    <Container>
      <Navbar searchName={searchName} setSearchName={setSearchName} />
      <Announcement />
      <ProductCartWidget />
      <Wrapper>
        <Title>Votre Panier</Title>
        <Top>
          <Link href={"/products"}>
            <TopButton>POURSUIVRE VOS ACHATS</TopButton>
          </Link>
          <TopText>
            {cart?.quantity > 0
              ? `Produit ajoute (${cart?.quantity})`
              : "Panier Vide"}
          </TopText>
        </Top>
        <Bottom>
          <CartContainer>
            <HeadTable>
              <div>Produit</div>
              <Box sx={{ width: "40%" }}> </Box>
              <div>Prix</div> <div>Quantite</div>
              <div> </div>
            </HeadTable>
            <Hr />
            {cart?.products?.map((product, index) => (
              <div key={product.id}>
                <ProductItem>
                  <ImageContainer>
                    <Image src={`data:image/*;base64,${product.img}`} />
                  </ImageContainer>
                  <DetailContainer>
                    <ProductName>
                      <b>Produit:</b> {product.name}
                    </ProductName>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <b>Couleur:</b>
                      {/* <Color sx={{ backgroundColor: "red" }} /> */}
                      {product.caract[0].color}
                    </Box>
                    <Size>
                      <b>Taille:</b> {product.caract[0].size}
                    </Size>
                  </DetailContainer>
                  <ProductPrice>
                    {" "}
                    {product.caract[0].price * product.caract[0].quantity} F
                  </ProductPrice>
                  <PriceContainer>
                    <AddMount>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantity(product, "dec")}
                      >
                        {" "}
                        <Remove sx={{ fontSize: "16px", fontWeight: "bold" }} />
                      </IconButton>
                      {product.caract[0].quantity}
                      <IconButton
                        size="small"
                        onClick={() => handleQuantity(product, "inc")}
                      >
                        {" "}
                        <Add sx={{ fontSize: "16px", fontWeight: "bold" }} />
                      </IconButton>
                    </AddMount>
                    {/* <ProductPrice> {product.price * product.quantity} F</ProductPrice> */}
                  </PriceContainer>
                  <ProductAction>
                    <RemoveProduct
                      size="small"
                      sx={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleRemoveToCart(product)}
                    >
                      <DeleteOutline />
                    </RemoveProduct>
                  </ProductAction>
                </ProductItem>
                <Hr />
              </div>
            ))}
          </CartContainer>
          <CommandeContainer>
            <ResumeCommande>
              <CommandeTitle>TOTAL PANIER</CommandeTitle>
              <ResumeLine>
                <LineTitle>Sous-Total</LineTitle>
                <LineContent>{cart ? cart.total : 0} F</LineContent>
              </ResumeLine>
              <ResumeLine>
                <Typography>Frais Livraision </Typography>

                {/* <Typography >calculer</Typography> */}
              </ResumeLine>
              <Hr />
              <TotalLine>
                <TotalTitle>Total</TotalTitle>
                <TotalContent>{cart ? cart.total : 0} F</TotalContent>
              </TotalLine>

              {cart?.total > 0 && (
                // zone> 0 &&
                <Link href={"/detailsCommande"}>
                  <CommandeButton fullWidth>VALIDER LA COMMANDE</CommandeButton>
                </Link>
              )}
              <Backdrop
                sx={{
                  color: "teal",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isFetching}
                // onClick={()=>set}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </ResumeCommande>
          </CommandeContainer>
        </Bottom>
      </Wrapper>
      {/* <Newsletter/> */}
      <Footer />
    </Container>
  );
};
export default Cart;
