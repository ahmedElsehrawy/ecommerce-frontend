import { ListAlt, Logout } from "@mui/icons-material";
import {
  Menu,
  Avatar,
  Divider,
  ListItemIcon,
  MenuItem,
  Tooltip,
  IconButton,
  Badge,
} from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { Box } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";

import React from "react";
import { AuthVar, CartNumberVar } from "../../../apollo/initialState";
import { removeAuth, resetAuthVar } from "../../../utils/auth";
import { useReactiveVar } from "@apollo/client";

type Props = {};

const MenuList = (props: Props) => {
  const router = useRouter();
  const cartItemsNumber = useReactiveVar(CartNumberVar);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    await resetAuthVar(AuthVar);
    await removeAuth();
    CartNumberVar(0);
    router.push("/");
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 200,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link href="/profile">
          <MenuItem>
            <Avatar /> Profile
          </MenuItem>
        </Link>
        <Divider />

        <Link href="/orders">
          <MenuItem>
            <ListItemIcon>
              <ListAlt fontSize="small" />
            </ListItemIcon>
            Orders
          </MenuItem>
        </Link>

        <Link href="/cart">
          <MenuItem>
            <ListItemIcon>
              <Badge badgeContent={cartItemsNumber} color="default">
                <AddShoppingCartOutlinedIcon />
              </Badge>
            </ListItemIcon>
            Cart
          </MenuItem>
        </Link>

        <Link href="/favourites">
          <MenuItem>
            <ListItemIcon>
              <FavoriteBorderOutlinedIcon />
            </ListItemIcon>
            Favourites
          </MenuItem>
        </Link>
        <Divider />

        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default MenuList;
