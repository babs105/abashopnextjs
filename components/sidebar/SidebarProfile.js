import React, { Fragment, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
// material
import { styled } from "@mui/material/styles";
import { Box, Button, Drawer, Typography, Avatar, Stack } from "@mui/material";

import useResponsive from "../../hooks/useResponsive";
// components

import Scrollbar from "../Scrollbar";
//
import NavSection from "../NavSection";
import { navProfile } from "./NavConfig";
import Logo from "../Logo";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

// DashboardSidebar.propTypes = {
//   isOpenSidebar: PropTypes.bool,
//   onCloseSidebar: PropTypes.func,
// };

export default function SidebarProfile({ isOpenSidebar, onCloseSidebar }) {
  const user = useSelector((state) => state.user.currentUser);
  const [hasMounted, setHasMounted] = React.useState(false);

  const { pathname } = useRouter();

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },

        display: "flex",
        flexDirection: "column",
        // overflowY: "scroll",
        // "&::-webkit-scrollbar": {
        //   width: "5px",
        // },
        // "&::-webkit-scrollbar-track": {
        //   background: "#f1f1f1",
        // },
        // "&::-webkit-scrollbar-thumb": {
        //   width: "5px",
        // },
        // "&::-webkit-scrollbar-thumb:hover": {
        //   background: "#555",
        //   width: "5px",
        // },
        overflowY: "auto",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#999",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <AccountStyle>
          <Avatar src={""} alt="photoURL" />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
              <Link href="/">
                <a style={{ textDecoration: "none" }}>
                  {user?.firstName} {user?.lastName}
                </a>
              </Link>
            </Typography>
            <Typography
              // variant="body"
              sx={{ fontSize: "12px", color: "text.secondary" }}
            >
              {user?.roles.includes("ROLE_ADMIN")
                ? "Profil Admin"
                : "Profil Client"}
            </Typography>
          </Box>
        </AccountStyle>
      </Box>

      <NavSection navConfig={navProfile} roles={user?.roles} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
