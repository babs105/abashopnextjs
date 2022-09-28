import PropTypes from "prop-types";
// material
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Badge,
  InputBase,
  Menu,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";
import Iconify from "../Iconify";
import AccountPopover from "../AccountPopover";
import NotificationsPopover from "./NotificationsPopover";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  color: "black",
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));
const NavbarButton = styled(Button)(({ theme }) => ({
  fontSize: "12px",
  [theme.breakpoints.up("sm")]: {
    fontSize: "14px",
  },
}));
export default function Topbar({ onOpenSidebar }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.mycart);
  const [openMenu, setOpenMenu] = useState(false);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  const handleClick = () => {
    setOpenMenu(true);
  };
  const handleClose = () => {
    setOpenMenu(false);
  };
  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton
          onClick={onOpenSidebar}
          sx={{ mr: 1, color: "text.primary", display: { lg: "none" } }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 4 }}>
          {user ? (
            <>
              {/* <Avatar sx={{ color: "indigo" }} />
              <Typography variant="span"> {user.firstName}</Typography> */}
              <NotificationsPopover />
              <AccountPopover />
            </>
          ) : (
            <>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Link href="/register">
                  <a>OUVRIR UN COMPTE</a>
                </Link>
                <Link href="/login">
                  <a>SE CONNECTER</a>
                </Link>
              </Box>
              <Box sx={{ display: { xs: "block", sm: "none" } }}>
                <NavbarButton onClick={handleClick}>
                  <ExpandMore />
                </NavbarButton>
                <Menu
                  sx={{ display: { xs: "block", sm: "none" } }}
                  open={openMenu}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link href="/register">
                      <a>OUVRIR UN COMPTE</a>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link href="/login">
                      <a>OUVRIR UN COMPTE</a>
                    </Link>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}
          {/* <Link to="/cart" component={RouterLink}>
            <Badge badgeContent={cart?.quantity} color="error">
              <ShoppingCartOutlined color="primary" />
            </Badge>
          </Link> */}
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
