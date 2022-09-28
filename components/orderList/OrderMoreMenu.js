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

// ----------------------------------------------------------------------

export default function ProductMoreMenu({ order }) {
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
          href={{
            pathname: "/admin/orders/showorder",
            query: { id: order.id },
          }}
        >
          <MenuItem sx={{ color: "text.secondary" }}>
            <ListItemIcon>
              <Iconify icon="eva:eye-fill" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Details"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        </Link>
        {/* { */}
        {/* order.statusPay === "encours" && order.statusOrder === "preparation" && ( */}
        <Link
          href={{
            pathname: "/admin/orders/editorder",
            query: { id: order.id },
          }}
        >
          <MenuItem sx={{ color: "text.secondary" }}>
            <ListItemIcon>
              <Iconify icon="eva:edit-fill" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Editer"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        </Link>
        {/* // )
        } */}

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
