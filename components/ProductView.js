import React, { useEffect, useState } from "react";
import { Add, Remove, AddShoppingCart } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCartSuccess } from "../redux/cartRedux/cartRedux";
// import styled from "styled-components";

const Wrapper = styled(Card)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "30px 60px",
  padding: "20px 60px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    padding: "5px 0px",
    margin: "30px 8px",
    // alignItems:"stretch",
  },
}));

const ImageContainer = styled(Box)({
  flex: 1,
  // minWidth:"350px",
});
const InfoContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  // minWidth:"350px",
  padding: "0px 50px",
  [theme.breakpoints.down("sm")]: {
    padding: "0px 20px",
  },
}));
// const Image = styled("img")(({ theme }) => ({
//   minWidth: "200px",
//   // minWidth:"280px",
//   width: "100%",
//   height: "70vh",
//   objectFit: "contain",
//   [theme.breakpoints.down("sm")]: {
//     height: "40vh",
//   },
// }));
const Title = styled("h1")({
  fontWeight: 500,
});
const Desc = styled("p")({
  margin: "20px 0px",
});
const Price = styled("span")({
  fontSize: "40px",
});
const Detail = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  margin: "20px 0",
  width: "50%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
const Filter = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const AddContainer = styled("div")(({ theme }) => ({
  minWidth: "400px",
  // width:"60%",
  display: "flex",
  gap: "20px",
  margin: "30px 0px",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "space-between",
  },
}));
const AddMount = styled("div")({
  border: "1px solid teal",
  borderRadius: "10px",
  display: "flex",
  padding: "2px",
  justifyContent: "space-between",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "20px",
});

const AddButton = styled(Button)(({ theme }) => ({
  borderRadius: "0%",
  border: "2px solid teal",
  padding: "10px",
  //  color:"black",
  color: theme.palette.common.black,

  // justifyContent:"space-between",
  // alignItems:"center"
}));
function ProductView({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [values, setValues] = useState({ color: "", size: "", price: "" });
  const [filters, setFilters] = useState({});
  const [newCaract, setNewCaract] = useState({});
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.mycart);
  const isFetching = useSelector((state) => state.cart.isFetching);
  const user = useSelector((state) => state.user.currentUser);
  let uniqueColor = [];
  let uniqueSize = [];
  useEffect(() => {
    console.log("cart ", cart);
    console.log("user ", user);
    console.log("filters ", filters);
    console.log("product ", product);
    console.log("newCaract", newCaract);
    const getCaractProductSelected = () => {
      console.log("in getproduct");
      const caractfilter = product.caract.filter((item) =>
        Object.entries(filters).every(([key, value]) => item[key] === value)
      );
      console.log("caractfilter", caractfilter);
      setNewCaract(caractfilter[0]);
    };
    Object.keys(filters).length !== 0
      ? getCaractProductSelected()
      : setNewCaract(product?.caract[0]);
  }, [filters, product]);

  useEffect(() => {
    console.log("id change");
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    setFilters({ ...filters, [name]: value });
  };

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const newProduct = {
      ...product,
      caract: [{ ...newCaract, quantity: quantity }],
    };
    console.log("newProduct", {
      newProduct,
      userId: user ? user.id : null,
      idCart: cart ? cart.id : null,
    });
    // addProductToCart(dispatch, {
    //   newProduct,
    //   userId: user ? user.id : null,
    //   idCart: cart ? cart.id : null,
    // });
    const productSearch = cart.products?.find((prod) => prod.id === product.id);
    if (!productSearch) {
      dispatch(addProductToCartSuccess(newProduct));
      toast.success("Product Ajoute dans le panier");
    }
    // cart.products.map(prod=>prod.id===product.id)
  };
  return (
    // <Box sx={{ backgroundColor: "#f5f8fc" }}>
    <Wrapper variant="outlined">
      <ImageContainer>
        <Image
          height={300}
          width={300}
          layout="fixed"
          src={`data:image/*;base64,${product.img}`}
        />
      </ImageContainer>
      <InfoContainer>
        <Title>{product.name}</Title>

        <Desc>{product.desc}</Desc>
        <Price>
          {/* {Object.keys(newCaract).length === 0 ? product.caract[0].price * quantity:newCaract.price * quantity} F */}
          {newCaract?.price * quantity} F
          {/* {product.caract[0].price * quantity} F  */}
        </Price>
        <Detail>
          <Filter>
            <FormControl
              sx={{ minWidth: 100, marginRight: "20px" }}
              size="small"
            >
              <InputLabel id="demo">Couleur</InputLabel>
              <Select
                labelId="demo"
                name="color"
                defaultValue={
                  // newCaract.color
                  product.caract[0].color
                }
                // value={values.color}
                autoWidth
                id="demo-color"
                label="Couleur"
                onChange={handleInputChange}
              >
                {product.caract?.forEach((elt) => {
                  if (uniqueColor.indexOf(elt.color) === -1) {
                    uniqueColor.push(elt.color);
                  }
                })}
                {uniqueColor.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Filter>
          <Filter>
            <FormControl
              sx={{ minWidth: 100, marginRight: "20px" }}
              size="small"
            >
              <InputLabel id="demo">Taille</InputLabel>
              <Select
                labelId="demo"
                name="size"
                defaultValue={
                  product.caract[0].size
                  //  newCaract.size
                }
                // value={values.color}
                autoWidth
                id="demo-color"
                label="Taille"
                onChange={handleInputChange}
              >
                {product.caract?.forEach((elt) => {
                  if (uniqueSize.indexOf(elt.size) === -1) {
                    uniqueSize.push(elt.size);
                  }
                })}
                {uniqueSize.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Filter>
        </Detail>
        <AddContainer>
          <AddMount>
            <IconButton size="small" onClick={() => handleQuantity("dec")}>
              {" "}
              <Remove />
            </IconButton>
            {quantity}
            <IconButton size="small" onClick={() => handleQuantity("inc")}>
              {" "}
              <Add />
            </IconButton>
          </AddMount>
          {isFetching ? (
            <AddButton endIcon={<CircularProgress color="primary" size={20} />}>
              Ajouter au Panier{" "}
            </AddButton>
          ) : (
            <AddButton onClick={handleClick} endIcon={<AddShoppingCart />}>
              Ajouter au Panier{" "}
            </AddButton>
          )}
        </AddContainer>
      </InfoContainer>
      <ToastContainer />
    </Wrapper>
    // </Box>
  );
}

export default ProductView;
