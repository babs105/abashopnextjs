import { Pets, Search, ExpandMore, Close } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  ListItem,
  ListItemButton,
  List,
  Button,
  styled,
  Toolbar,
  Typography,
  ListItemText,
  Divider,
  Drawer,
  IconButton,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import AccountPopover from "./AccountPopover";
import { padding } from "@mui/system";
import Iconify from "./Iconify";

const NavbarButton = styled(Button)(({ theme }) => ({
  fontSize: "12px",

  [theme.breakpoints.up("sm")]: {
    fontSize: "14px",
  },
}));
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "white",
  color: "black",
});
const StyledSearch = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "white",
  border: "1px solid grey",
  padding: "5px",
  borderRadius: "15px",

  // borderRadius:theme.shape.borderRadius,
  // width:"40%"
  // [theme.breakpoints.up("sm")]: {
  //   fontSize: "14px"
  // },
}));
const InputSearch = styled("input", {
  shouldForwardProp: (prop) => prop !== "showInput",
})(({ theme, showInput }) => ({
  width: showInput ? "100%" : 0,
  outline: "none",
  border: "none",
  fontSize: "18px",
  padding: showInput ? "0px 5px" : "0px",
  // width:"40%"
  // [theme.breakpoints.up("sm")]: {
  //   fontSize: "14px"
  // },
}));
const ButtonSearch = styled("button")(({ theme }) => ({
  border: "none",
  boxShadow: "none",
  backgroundColor: "#fff",
  display: "flex",
  justifyContent: "center",
  cursor: "pointer",
  padding: "2px",
  // width:"40%"
  // [theme.breakpoints.up("sm")]: {
  //   fontSize: "14px"
  // },
}));
// sx={{width:0,border:"none"}} />
const StyledIcons = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: "white",
  alignItems: "center",
  gap: "40px",
}));
const drawerWidth = 240;
const Navbar = ({ searchName, setSearchName }) => {
  // const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [hasMounted, setHasMounted] = React.useState(false);
  const [showInput, setShowInput] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        // backgroundColor: "teal",
        textAlign: "center",
        // color: "white",
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        Nos Collections
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              textAlign: "center",
              "& :hover": {
                fontSize: "20px",
                color: "teal",
                fontWeight: "bold",
              },
            }}
          >
            <Link
              href="/products"
              // state={{ cat: "" }}
              // style={{ textDecoration: "none" }}
            >
              <ListItemText primary={"Toutes les tenues"} />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              textAlign: "center",
              "& :hover": {
                fontSize: "20px",
                color: "teal",
                fontWeight: "bold",
              },
            }}
          >
            <Link
              // to="/products"
              href="/products/categories/Collection Homme"
              // state={{ cat: "Collection Homme" }}
              // style={{ textDecoration: "none" }}
            >
              <ListItemText primary={"Collection Homme"} />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              textAlign: "center",
              "& :hover": {
                fontSize: "20px",
                color: "teal",
                fontWeight: "bold",
              },
            }}
          >
            <Link
              href="/products/categories/Collection Femme"
              // state={{ cat: "Collection Femme" }}
              // style={{ textDecoration: "none" }}
            >
              <ListItemText primary={"Collection Femme"} />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              textAlign: "center",
              "& :hover": {
                fontSize: "20px",
                color: "teal",
                fontWeight: "bold",
              },
            }}
          >
            <Link
              href="/products/categories/Collection Enfant"
              // state={{ cat: "Collection Enfant" }}
              // style={{ textDecoration: "none" }}
            >
              <ListItemText primary={"Collection Enfant"} />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
      {!user && (
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            // height: "",
            flexDirection: "column-reverse",
            gap: "8px",
            position: "absolute",
            bottom: "0",
            left: "20%",
            transform: "(-20%,0)",
            paddingBottom: "4px",
          }}
        >
          <Link href="/register">
            <NavbarButton
              variant="contained"
              sx={{
                boxShadow: "none",
                backgroundColor: "teal",
                color: "white",
              }}
            >
              OUVRIR UN COMPTE
            </NavbarButton>
          </Link>
          <Link href="/login" style={{ textDecoration: "none" }}>
            <NavbarButton
              variant="outlined"
              sx={{
                boxShadow: "none",
                color: "black",
              }}
            >
              SE CONNECTER
            </NavbarButton>
          </Link>
        </Box>
      )}
    </Box>
  );

  // const handleClick = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearchName(value);
  };
  return (
    <AppBar position="sticky" elevation={0}>
      <StyledToolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "40px",
          }}
        >
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            ABA.
          </Typography>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <Pets />
          </Box>
          <StyledSearch>
            <InputSearch
              placeholder="Rechercher..."
              showInput={showInput}
              value={searchName}
              onChange={handleSearch}
            />
            <ButtonSearch
              onClick={() => {
                setShowInput(!showInput);
              }}
              sx={{}}
            >
              {showInput ? (
                <Close
                  onClick={() => {
                    setShowInput(!showInput);
                    setSearchName("");
                  }}
                  sx={{ color: "gray" }}
                />
              ) : (
                <Search
                  onClick={() => {
                    setShowInput(!showInput);
                  }}
                  sx={{ color: "gray" }}
                />
              )}
            </ButtonSearch>
          </StyledSearch>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NavbarButton
            onClick={handleClick}
            sx={{
              boxShadow: "none",
              color: "gray",
            }}
          >
            BOUTIQUE <ExpandMore />
          </NavbarButton>
          <Menu
            sx={{
              // backgroundColor: "red",
              display: { xs: "none", sm: "block", color: "#808080" },
            }}
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
          >
            <MenuItem onClick={handleClose}>
              <Link
                href="/products"
                // state={{ cat: "" }}
              >
                <a style={{ textDecoration: "none", color: "#808080" }}>
                  Toutes les Tenues
                </a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                href="/products/categories/Collection Homme"
                // state={{ cat: "Collection Homme" }}
                sx={{ textDecoration: "none" }}
              >
                <a style={{ textDecoration: "none", color: "#808080" }}>
                  Collection Homme
                </a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                href="/products/categories/Collection Femme"
                // state={{ cat: "Collection Femme" }}
              >
                <a style={{ textDecoration: "none", color: "#808080" }}>
                  Collection Femme
                </a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                href="/products/categories/Collection Enfant"
                // state={{ cat: "Collection Enfant" }}
              >
                <a style={{ textDecoration: "none", color: "#808080" }}>
                  Collection Enfant
                </a>
              </Link>
            </MenuItem>
          </Menu>
        </Box>
        <StyledIcons>
          {user ? (
            <>
              <AccountPopover />
            </>
          ) : (
            <>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Link href="/login" sx={{ textDecoration: "none" }}>
                  <NavbarButton
                    variant="outlined"
                    sx={{
                      boxShadow: "none",
                      border: "none",
                      color: "gray",
                      ":hover": {
                        opacity: "0.8",
                      },
                    }}
                  >
                    <Iconify icon={"bxs:lock-alt"} sx={{ fontSize: "18px" }} />
                    COMPTE
                  </NavbarButton>
                </Link>
              </Box>
            </>
          )}

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </StyledIcons>
      </StyledToolbar>
      <Box component="nav" sx={{ backgroundColor: "teal" }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </AppBar>
  );
};

export default Navbar;
