import { useRef, useState } from "react";
import Link from "next/link";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
} from "@mui/material";
// components
import MenuPopover from "./MenuPopover";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux/callUserApi";
import Iconify from "./Iconify";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Accueil.",
    icon: "eva:home-fill",
    href: "/",
  },
  {
    label: "Boutique",
    icon: "eva:settings-2-fill",
    href: "#",
  },
  {
    label: "Mon Compte",
    icon: "eva:person-fill",
    href: "/profile",
  },
  // {
  //   label: "Admin",
  //   icon: "eva:person-fill",
  //   linkTo: "/admin",
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const user = useSelector((state) => state.user.currentUser);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={"/image/avatar_default.jpg"} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user.username}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 0 }}>
          {MENU_OPTIONS.map((option) => (
            <div key={option.label}>
              <Link href={option.href}>
                <MenuItem>
                  <Iconify sx={{ marginRight: "3px" }} icon={option.icon} />{" "}
                  <a>{option.label}</a>
                </MenuItem>
              </Link>
            </div>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={() => {
            handleClose();
            logout(dispatch);
          }}
          sx={{ m: 1 }}
        >
          Deconnecter
        </MenuItem>
      </MenuPopover>
    </>
  );
}
