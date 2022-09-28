import Link from "next/link";
import { Box, Button, styled, Card } from "@mui/material";
import Image from "next/image";
// import { mobile } from "../responsive";

// const Container = styled.div`
//   flex: 1;
//   margin: 3px;
//   height: 70vh;
//   position: relative;
// `;

// const Image = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   ${mobile({ height: "20vh" })}

// `;

// const Info = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// const Title = styled.h1`
//     color:white;
//     margin-bottom: 20px;
// `;

// const Button = styled.button`
//     border:none;
//     padding: 10px;
//     background-color: white;
//     color:gray;
//     cursor: pointer;
//     font-weight: 600;
// `;

const Container = styled(Card)(({ theme }) => ({
  margin: "3px",
  position: " relative",
  height: "300px",
  [theme.breakpoints.down("sm")]: {
    height: "280px",
  },
}));
// const Image = styled("img")(({ theme }) => ({
//   width: "100%",
//   height: " 100%",
//   objectFit: "cover",
// }));
const Info = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));
const Title = styled("h1")(({ theme }) => ({
  color: "white",
  marginBottom: "20px",
  [theme.breakpoints.up("sm")]: {
    fontSize: "24px",
  },
}));
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "white",
  color: "gray",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: "gray",
    color: "white",
  },
}));
const CategoryItem = ({ item }) => {
  return (
    <Container elevation={0}>
      {/* state={{ cat: item.title }}> */}
      <>
        <Image
          src={`data:image/*;base64,${item.categoryImg}`}
          height={500}
          width={500}
          layout="fill"
        />
        {/* <Image src={`data:image/*;base64,${item.categoryImg}`} /> */}
        <Info>
          <Title sx={{ fontSize: { sm: "24px" } }}>{item.title}</Title>
          <Link href={`/products/categories/${item.title}`}>
            <StyledButton>VISITER</StyledButton>
          </Link>
        </Info>
      </>
    </Container>
  );
};

export default CategoryItem;
