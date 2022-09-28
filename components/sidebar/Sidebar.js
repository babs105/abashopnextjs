import { Fragment, useEffect } from "react";
import Link from "next/link";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
// mock
import account from "../../_mock/account";
// hooks
import useResponsive from "../../hooks/useResponsive";
// components

import Scrollbar from "../Scrollbar";
//
import NavSection from "../NavSection";
import { navConfig, navProfile } from "./NavConfig";
import Logo from "../Logo";
import { useTheme } from "@emotion/react";
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

export default function Sidebar({ isOpenSidebar, onCloseSidebar }) {
  const user = useSelector((state) => state.user.currentUser);
  const theme = useTheme();
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography
                // variant="body"
                sx={{ fontSize: "12px", color: "text.secondary" }}
              >
                {user.roles.map((rolename) => (
                  <Fragment key={rolename}>
                    {rolename}
                    <br />
                  </Fragment>
                ))}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{ pt: 5, borderRadius: 2, position: "relative" }}
        >
          <Box
            component="img"
            src="/static/illustrations/illustration_avatar.png"
            sx={{ width: 100, position: "absolute", top: -50 }}
          />

          <Box sx={{ textAlign: "center" }}>
            <Typography gutterBottom variant="h6">
              Get more?
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              From only $69
            </Typography>
          </Box>

          <Button
            href="https://material-ui.com/store/items/minimal-dashboard/"
            target="_blank"
            variant="contained"
          >
            Upgrade to Pro
          </Button>
        </Stack>
      </Box>
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
