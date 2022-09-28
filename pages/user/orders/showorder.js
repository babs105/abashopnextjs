import React, { useEffect } from "react";

import { Box, styled, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Label from "../../../components/Label";
import { sentenceCase } from "change-case";
import { useRouter } from "next/router";
import { getOrderById } from "../../../redux/orderRedux/callOrderApi";
import Image from "next/image";

const Container = styled("div")({
  width: "100%",
});
const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "50px",
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
  },
}));
// const ResumeOrderContainer = styled(Box)(({ theme }) => ({
//   display: "flex",
//   height: "100px",
//   alignItems: "center",
//   gap: "24px",

//   // padding:"50px",
//   [theme.breakpoints.down("sm")]: {
//     flexDirection: "column",
//     padding: "5px 0px",
//     height: "100%",
//     alignItems: "stretch",
//   },
// }));
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

const ShowOrder = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.currentOrder);
  const isFetching = useSelector((state) => state.order.isFetching);
  const timeElapsed = Date.now();
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
    console.log("show order");
    if (router.isReady) {
      getOrderById(dispatch, router.query.id);
    }
  }, [router.isReady]);

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
              <ItemContainer>{order?.amount}FCFA</ItemContainer>
              <ItemTitle>{order?.mdp}</ItemTitle>
              <Typography
                color={(order?.statusPay === "encours" && "error") || "success"}
              >
                {order?.statusPay}
              </Typography>
              {/* <Label
                sx={{ width: { xs: "25%", sm: "40%" } }}
                variant="ghost"
                color={(order.statusPay === "encours" && "error") || "success"}
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
                color={(order.statusOrder === 0 && "error") || "success"}
              >
                {sentenceCase(getStatOrder(order.statusOrder))}
              </Label> */}
            </OrderItem>
          </ResumeOrderContainer>
          <DetailsOrderTitle>
            <Typography variant="h4" sx={{ mt: "8px", color: "teal" }}>
              Details de la Commande
            </Typography>
            {/* Details de la Commande */}
          </DetailsOrderTitle>
          <TableWrapper>
            <TableHeader>
              <TableTitle>Produit</TableTitle>
              <TableTitle>Total</TableTitle>
            </TableHeader>
            <TableDetail>
              {order?.productsOrders?.map((product, index) => (
                <ProductItem key={index}>
                  <Box sx={{ display: "flex", gap: "30px" }}>
                    <Image
                      height={80}
                      width={80}
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
                      : ` ${order.addressEmetteur?.pays}/${order.addressEmetteur?.region}`}
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
        </Wrapper>
      )}
    </Container>
  );
};

ShowOrder.auth = true;
ShowOrder.layout = "profile";
export default ShowOrder;
