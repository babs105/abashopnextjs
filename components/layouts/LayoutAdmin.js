import { Box } from "@mui/material";
// import Link from "next/link";
// import Router from "next/router";
// import Navbar from "./Navbar";
// import { Navigate, Outlet } from "react-router-dom";

import { styled } from "@mui/material";
import SidebarProfile from "../sidebar/SidebarProfile";
import Topbar from "../topbar/Topbar";
import ProductCartWidget from "../ProductCartWidget";
import { useSelector } from "react-redux";
import { useState } from "react";
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  backgroundColor: "#f5f8fc",
  // minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));
export default function LayoutSiderBar({ children }) {
  const user = useSelector((state) => state.user.currentUser);
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <RootStyle>
      <Topbar onOpenSidebar={() => setOpenSideBar(true)} />
      <SidebarProfile
        isOpenSidebar={openSideBar}
        onCloseSidebar={() => setOpenSideBar(false)}
      />
      <ProductCartWidget />
      <MainStyle>{children}</MainStyle>
    </RootStyle>
  );
  //    : (
  //     Router.push("/login")
  //   );
}
