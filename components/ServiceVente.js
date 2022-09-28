import { Box, Card, Stack, Typography } from "@mui/material";

import React from "react";
import Iconify from "./Iconify";

function ServiceVente() {
  return (
    <Box
      sx={{
        height: { sm: "50vh" },
        color: "gray",
        padding: "20px",
        // backgroundColor: "gray",
        backgroundColor: "#ecd6d6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { sm: "row", xs: "column" },
          justifyContent: "center",
          alignItems: "center",
          gap: { sm: "20px", xs: "20px" },
          height: { sm: "70%", xs: "100%" },
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "70%",
            gap: "20px",
            padding: "20px",
          }}
        >
          <Iconify
            icon={"la:shipping-fast"}
            sx={{ fontSize: { sm: "180px", xs: "80px" } }}
          />
          <Typography>Livraison Rapide</Typography>
        </Card>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "80%",
            gap: "20px",
            padding: "20px",
          }}
        >
          <Iconify
            icon={"bx:lock-open"}
            sx={{ fontSize: { sm: "180px", xs: "90px" } }}
          />
          <Typography sx={{ fontSize: { sm: "18px", xs: "12px" } }}>
            Paiement Sécurisé
          </Typography>
        </Card>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "70%",
            gap: "20px",
            padding: "20px",
          }}
        >
          <Iconify
            icon={"bx:support"}
            sx={{ fontSize: { sm: "150px", xs: "80px" } }}
          />
          <Typography>Service Client</Typography>
        </Card>
      </Box>
    </Box>
  );
}

export default ServiceVente;
