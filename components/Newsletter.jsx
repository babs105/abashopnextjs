import { TextField, styled, Box, Button, InputBase } from "@mui/material";
import { Send } from "@mui/icons-material";

// import { mobile } from "../responsive";

const Container = styled(Box)({
  height: "60vh",
  backgroundColor: "#ecd6d6",
  display: " flex",
  alignItems: "center",
  // justifyContent: "center",
  flexDirection: "column",
});

const Title = styled("h1")(({ theme }) => ({
  fontSize: "3vw",
  marginBottom: "20px",
}));

const Desc = styled(Box)({
  fontSize: "2.5vw",
  fontWeight: 300,
  marginBottom: "20px",
  // ${mobile({ textAlign: "center" })}
});

const InputContainer = styled(Box)(({ theme }) => ({
  width: "50%",
  height: "40px",
  backgroundColor: "white",
  display: "flex",

  justifyContent: " space-between",
  paddingLeft: "4px",
  // border: "1px solid lightgray",
  borderRadius: theme.shape.borderRadius,

  // ${mobile({ width: "80%" })}
}));

const Input = styled("input")({
  // border:"none",
  // border: "1px solid lightgray",
  border: "none",
  flex: 7,
  outline: "none",
  // fontSize:"10px"
  padding: "8px",
  focus: "none",
});

const StyledButton = styled("button")({
  flex: 1,
  border: "none",
  backgroundColor: " teal",
  color: " white",
  borderRadius: "0px 5px 5px 0px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "teal",
  },
});

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      {/* <Desc>Get timely updates from your favorite products.</Desc> */}
      <Desc>
        Ne manquez pas nos nouveaux produits et promotions super cool.
      </Desc>
      <InputContainer>
        <Input placeholder="Votre email" />
        <StyledButton>
          <Send />
        </StyledButton>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
