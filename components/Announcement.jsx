import { Box, styled } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  height: "30px",
  backgroundColor: "teal",
  color: "white",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
  fontWeight: 500,
}));
const Announcement = () => {
  return (
    <Container>
      {/* <marquee> */} Spécial Promo! Livraison gratuite pour toute commande
      supérieure à 19 000 FCFA {/* </marquee> */}
    </Container>
  );
};

export default Announcement;
