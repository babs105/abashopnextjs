import Link from "next/link";
import { Visibility } from "@mui/icons-material";

import { Box, Card, CardActions, styled, Typography } from "@mui/material";
import Image from "next/image";

const Container = styled("div")(({ theme }) => ({
  width: "100%",
  height: "200px",
  display: "flex",
  alignItems: "center",
  justifyContent: " center",
  backgroundColor: "#f5fbfd",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    // height: "80%",
  },
}));
// const Container = styled("div")({
//   // flex:1,
//   // maxWidth: "280px",
//   width: "100%",
//   height: "200px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: " center",
//   backgroundColor: "#f5fbfd",
//   position: "relative",
// });
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
  },
});

// const Circle = styled.div`
//   width: 200px;
//   height: 200px;
//   border-radius: 50%;
//   background-color: white;
//   position: absolute;
// `;

// const Image = styled("img")({
//   height: "100%",
//   width: "100%",
//   zIndex: 2,
// });

const Icon = styled("div")({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "10px",
  cursor: "pointer",

  "&:hover": {
    backgroundColor: "#e9f5f5",
    transform: "scale(1.1)",
    transition: "all 0.5s ease",
  },
});

const Product = ({ item }) => {
  return (
    <Card variant="outlined">
      <Container>
        <Info>
          <Icon>
            <Link href={`/products/product/${item.id}`} passHref>
              <Visibility />
            </Link>
          </Icon>
        </Info>

        <Image
          src={`data:image/*;base64,${item.img}`}
          height={500}
          width={500}
          layout="fill"
        />
        {/* <Image src={`data:image/*;base64,${item.img}`} /> */}
      </Container>

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
                ":hover": { textDecoration: "underline", cursor: "pointer" },
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
  );
};

export default Product;
