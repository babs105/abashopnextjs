import React, { useEffect, useRef, useState } from "react";

import { Box, Card, styled, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import { useDispatch, useSelector } from "react-redux";
import cookies from "next-cookies";
// import { useLocation } from "react-router-dom";
import Label from "../components/Label";
import { sentenceCase } from "change-case";
import { BASEURL } from "../utils/baseUrl";
import { localStorageHelper } from "../utils/localStorageHelper";
import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";
import axios from "axios";

const Container = styled("div")({
  width: "100%",
  backgroundColor: "#f5f8fc",
  // display: "flex",
  // flexDirection: "column",
  // justifyContent: "center",
  // alignItems: "center",
});
const Wrapper = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "30px 30px",
  // width: "80%",
  gap: "8px",
  padding: " 10px ",
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
  margin: "20px 0px",
  // justifyContent: "flex-start",
  alignItems: "stretch",
  // justifyContent: "s",

  // padding:"50px",
  [theme.breakpoints.down("sm")]: {
    margin: "10px 0px",
  },
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
  // width: "100%",
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
const fetcherFunc = (url) => {
  console.log("CALL SWR");
  return axios
    .create({
      headers: localStorageHelper.getLocalStorage("user") && {
        Authorization:
          "Bearer " + localStorageHelper.getLocalStorage("user").accessToken,
      },
    })
    .get(url)
    .then((res) => res.data);
};
const OrderResponse = ({ orderInit }) => {
  // const location = useLocation();
  // const order = location.state;
  const router = useRouter();
  // const { id } = router.query;
  const [searchName, setSearchName] = useState("");
  const [keyword, setKeyword] = useState(null);
  const hasMounted = useRef(false);

  const { data: order, error } = useSWR(
    keyword ? `${BASEURL}/order/getOrderById/${keyword}` : null,
    fetcherFunc,
    {
      fallbackData: hasMounted.current ? undefined : orderInit,
    }
  );
  useEffect(() => {
    console.log("mounted");
    hasMounted.current = true;
  }, []);
  useEffect(() => {
    setKeyword(router.query.id);
  }, [router.isReady]);

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
  if (!order) return <div>Loading... </div>;
  if (error) return <div>Erreur </div>;
  return (
    <Container>
      <Navbar searchName={searchName} setSearchName={setSearchName} />
      <Announcement />
      <Wrapper variant="outlined">
        <Box sx={{ width: "90%" }}>
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
              <ItemTitle> {order.addressEmetteur?.telephone} </ItemTitle>
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
              <ItemContainer>{order.amount} FCFA</ItemContainer>
              <ItemTitle>{order.mdp} </ItemTitle>

              <Label
                sx={{ width: "50%" }}
                variant="ghost"
                color={(order.statusPay === "encours" && "error") || "success"}
              >
                {sentenceCase(order.statusPay)}
              </Label>
            </OrderItem>
            <Hr2 />
            <OrderItem>
              <ItemTitle>Etape</ItemTitle>
              <Label
                variant="ghost"
                color={(order.statusOrder === 0 && "error") || "success"}
              >
                {sentenceCase(getStatOrder(order.statusOrder))}
              </Label>
            </OrderItem>
          </ResumeOrderContainer>
          <DetailsOrderTitle>
            <Typography variant="h4" sx={{ mt: "8px", color: "teal" }}>
              Details de la Commande
            </Typography>
          </DetailsOrderTitle>
          <TableWrapper>
            <TableHeader>
              <TableTitle>Produit</TableTitle>
              <TableTitle>Total</TableTitle>
            </TableHeader>
            <TableDetail>
              {order?.productsOrders?.map((product, index) => (
                <ProductItem key={index}>
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
                  <TotalProduct>
                    <b>
                      {product.caract[0].price * product.caract[0].quantity} F
                      CFA
                    </b>
                  </TotalProduct>
                </ProductItem>
              ))}
              <Hr
                sx={{ backgroundColor: " gray", width: "100%", opacity: 0.2 }}
              />
              <SousTotalContainer>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: { xs: "100%", sm: "50%" },
                  }}
                >
                  <Box sx={{ color: "teal" }}>Sous-Total :</Box>
                  <Box>
                    <b>{order?.total} F CFA</b>
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
                    {order.addressExpdition
                      ? `${order.addressExpdition?.pays}/${order.addressExpdition?.region} `
                      : ` ${order.addressEmetteur.pays}/${order.addressEmetteur.region}`}
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
                    {order.amount} F CFA
                  </Box>
                </Box>
              </SousTotalContainer>
              <Hr
                sx={{ backgroundColor: " gray", width: "100%", opacity: 0.2 }}
              />
            </TableDetail>
          </TableWrapper>
        </Box>
      </Wrapper>
    </Container>
  );
};

export default OrderResponse;
export async function getServerSideProps(context) {
  const { token } = cookies(context);
  const id = context.query.id;

  console.log("TOKEN", token);

  try {
    const response = await axios
      .create({
        baseURL: BASEURL,
        headers: { Authorization: "Bearer " + token },
      })
      .get("/order/getOrderById/" + id);

    return { props: { order: response.data } };
  } catch (err) {
    return { props: { error: "Something went wrong." } };
  }
}
