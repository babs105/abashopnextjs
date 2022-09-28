import { useRef, useState } from "react";
import Link from "next/link";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// component
import Iconify from "../../components/Iconify";
import Router from "next/router";
import { id } from "date-fns/locale";

// ----------------------------------------------------------------------

export default function UserMoreMenu({ user }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Link
          // style={{ textDecoration: "none" }}
          href={`/admin/users/edit/${user._id}`}
          // href={{
          //   pathname: "/admin/users/edituser",
          //   query: { id: user._id },
          // }}
        >
          <MenuItem
            sx={{ color: "text.secondary" }}
            // onClick={() => {
            //   Router.push({
            //     pathname: "/admin/users/edituser",

            //     query: { user: JSON.stringify(user) },
            //   });
            // }}
          >
            <ListItemIcon>
              <Iconify icon="eva:edit-fill" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Editer"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        </Link>
        <MenuItem sx={{ color: "text.secondary" }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Supprimer"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
