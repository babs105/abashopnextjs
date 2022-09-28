// import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { Typography } from "@mui/material";
import Image from "next/image";
// import Image from 'next/future/image'
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { Box, Button, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// // import styled from "styled-components";
// import { sliderItems } from "../data";
import { getAllCategory } from "../redux/categoryRedux/callCategoryApi";

const ContainerSlider = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "calc(100vh - 90px)",
  position: "relative",
  overflow: "hidden",
  //  [theme.breakpoints.up("xs")]: {
  //   display: "none",
  //},
  // [theme.breakpoints.up("sm")]: {
  //   display: "flex",
  //},
}));
const ArrowLeft = styled(Box)(({ theme }) => ({
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  backgroundColor: "#fff7f7",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  left: "10px",
  top: 0,
  bottom: 0,
  margin: "auto", /// le positionnement est defini par le margin auto pour les position 0
  cursor: "pointer",
  // opacity: 0.5,
  zIndex: 2,
}));
const ArrowRight = styled(Box)(({ theme }) => ({
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  backgroundColor: "#fff7f7",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: 0,
  bottom: 0,
  right: "10px",
  margin: "auto",
  cursor: "pointer",
  // opacity: 0.5,
  zIndex: 2,
}));
// const Image = styled("img")(({ theme }) => ({
//   height: "80%",
//   // objectFit: "fill",
// }));

const Slider = ({ categories, errcat }) => {
  const dispatch = useDispatch();
  // const categories = useSelector((state) => state.category.categories);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    // getAllCategory(dispatch);
  }, []);

  const handleClick = (direction) => {
    console.log("slideIndex", slideIndex);
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <ContainerSlider sx={{ display: { xs: "none", sm: "flex" } }}>
      <ArrowLeft onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </ArrowLeft>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          transition: "all 1.5s ease",
          transform: `translateX(${slideIndex * -100}vw)`,
        }}
      >
        {console.log("categories in slider", categories)}
        {!categories && !errcat && (
          <h1
            style={{
              color: "teal",
              textAlign: "center",
              width: "100vw",
              margin: "auto",
            }}
          >
            CHARGEMENT ...
          </h1>
        )}
        {categories?.map((item) => {
          return (
            item.type === "Top" && (
              <Box
                sx={{
                  width: "100vw",
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  // backgroundColor: `#${item.bg}`,
                  backgroundColor: "#fff",
                }}
                key={item._id}
              >
                <Box
                  sx={{
                    height: "100%",
                    flex: 1,
                  }}
                >
                  <Image
                    src={`${item.categoryImg}`}
                    height={500}
                    width={500}
                    layout={"responsive"}
                    // objectFit=""
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    // alignItems: "center",
                    flex: 1,
                    paddingX: "50px",
                  }}
                >
                  <Typography
                    variant="h1"
                    component={"h1"}
                    sx={{ fontSize: "70px" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    component={"p"}
                    sx={{
                      margin: "30px 0px",
                      fontSize: " 18px",
                      fontWeight: 400,
                      letterSpacing: " 2px",
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Link href={`/products/categories/${item.title}`}>
                    <Button
                      variant="contained"
                      p={2}
                      sx={{
                        fontSize: "20px",
                        width: "100px",

                        backgroundColor: "teal",
                      }}
                    >
                      VISITER{" "}
                    </Button>
                  </Link>
                </Box>
              </Box>
            )
          );
        })}
      </Box>
      <ArrowRight onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </ArrowRight>
    </ContainerSlider>
  );
};

export default Slider;
