// material
import { styled } from "@mui/material/styles";
import { Badge } from "@mui/material";
// component
import Iconify from "../components/Iconify";
import Link from "next/link";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: "flex",
  cursor: "pointer",
  position: "fixed",
  alignItems: "center",
  top: theme.spacing(12),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadow,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create("opacity"),
  "&:hover": { opacity: 0.52 },
}));

// ----------------------------------------------------------------------

export default function ProductCartWidget() {
  const cart = useSelector((state) => state.cart.mycart);
  return (
    <RootStyle>
      {/* <Badge  showZero badgeContent={cart?.quantity} color="error">
          <ShoppingCartOutlined color="primary" />
        </Badge> */}
      <Link href="/cart" passHref>
        <Badge showZero badgeContent={cart?.quantity} color="error" max={99}>
          <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
        </Badge>
      </Link>
    </RootStyle>
  );
}
