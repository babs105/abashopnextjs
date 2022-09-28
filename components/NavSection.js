import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
//
import Iconify from "./Iconify";

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem({ item, active, roles }) {
  const theme = useTheme();
  const router = useRouter();
  const isActiveRoot = active(item.path);

  const { title, path, icon, info, children } = item;

  const [open, setOpen] = useState(isActiveRoot);

  useEffect(() => {
    console.log("roles2", roles);
    console.log("path", path);
  }, []);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: "primary.main",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
  };

  const activeSubStyle = {
    color: "primary.main",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
  };
  // && roles?.includes("ROLE_ADMIN")
  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Iconify
            icon={
              open
                ? "eva:arrow-ios-downward-fill"
                : "eva:arrow-ios-forward-fill"
            }
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <Link href={path}>
                  <ListItemStyle
                    key={title}
                    sx={{
                      ...(isActiveSub && activeSubStyle),
                      paddingLeft: "6px",
                    }}
                  >
                    <ListItemIconStyle>
                      <Box
                        component="span"
                        sx={{
                          ...(isActiveRoot && activeRootStyle),
                          width: 5,
                          height: 5,
                          display: "flex",
                          borderRadius: "50%",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "text.disabled",
                          transition: (theme) =>
                            theme.transitions.create("transform"),
                          ...(isActiveSub && {
                            transform: "scale(1.5)",
                            bgcolor: "primary.main",
                          }),
                        }}
                      />{" "}
                      {item.icon && item.icon}
                    </ListItemIconStyle>
                    {/* <ListItemText disableTypography primary={title} /> */}

                    <a
                      style={{
                        textDecoration: "none",
                        // color: isActiveSub && "primary.main",
                      }}
                    >
                      {" "}
                      {title}
                    </a>
                  </ListItemStyle>
                </Link>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  // path === "/admin" && roles?.includes("ROLE_ADMIN") ?
  return (
    <Link href={path}>
      <ListItemStyle
        // component={RouterLink}
        // to={path}
        sx={{
          ...(isActiveRoot && activeRootStyle),
        }}
      >
        <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
        {/* <ListItemText disableTypography primary={title} /> */}

        <a style={{ textDecoration: "none" }}>{title}</a>

        {/* {info && info} */}
      </ListItemStyle>
    </Link>
    // ) : (
    //   <ListItemStyle
    //     component={RouterLink}
    //     to={path}
    //     sx={{
    //       ...(isActiveRoot && activeRootStyle),
    //     }}
    //   >
    //     <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
    //     <ListItemText disableTypography primary={title} />
    //     {info && info}
    //   </ListItemStyle>
    //
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};

export default function NavSection({ navConfig, roles, ...other }) {
  const router = useRouter();
  const { pathname } = router;

  // const match = (path) =>
  //   path ? !!matchPath({ path, end: false }, pathname) : false;
  const match = (path) => (path ? path.includes(pathname) : false);
  // const match = (path) => (path ? router.asPath === path : false);

  useEffect(() => {
    console.log("roles", roles);
  }, []);

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {navConfig.map((item) => {
          if (roles?.includes("ROLE_ADMIN") && item.children?.length !== 0) {
            return (
              <NavItem
                key={item.title}
                item={item}
                // active={router.asPath === item.path}
                active={match}
                // roles={roles}
              />
            );
          }
          // {console.log("",z)}
          if (!item?.children) {
            return (
              <NavItem
                key={item.title}
                item={item}
                active={match}
                // roles={roles}
              />
            );
          }
        })}
      </List>
    </Box>
  );
}
