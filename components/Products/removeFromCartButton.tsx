import { useMutation } from "@apollo/client";
import { Delete } from "@mui/icons-material";
import { Alert, Button, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { CartNumberVar } from "../../apollo/initialState";
import { GET_CART, REMOVE_FROM_CART } from "../../apollo/queiries";
import { Colors } from "../../constants/colors";
import { CartItem } from "../../types/cart";

interface Props {
  fullWidth?: boolean;
  cartItemId?: number;
}

const RemoveFromCartButton = (props: Props) => {
  const { fullWidth, cartItemId } = props;
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [removeFromCart, { loading, data }] = useMutation(REMOVE_FROM_CART, {
    update: (cache, { data }) => {
      setOpen(true);
      setTimeout(() => {
        const cart: any = cache.readQuery({
          query: GET_CART,
        });

        const deletedItem = cart?.getCart.CartItem.find(
          (cartItem: CartItem) => cartItem.id === cartItemId
        );

        const newCartItems = cart?.getCart.CartItem.filter(
          (cartItem: CartItem) => cartItem.id !== cartItemId
        );

        const newCart = {
          getCart: {
            CartItem: newCartItems,
            totalPrice:
              cart?.getCart.totalPrice -
              deletedItem.quantity * deletedItem.product.price,
          },
        };

        cache.writeQuery({
          query: GET_CART,
          data: newCart,
        });

        const cartItemsNumber = CartNumberVar();
        CartNumberVar(cartItemsNumber - 1);
      }, 1000);
    },
  });

  return (
    <>
      <Button
        sx={{ color: Colors.secondary, borderColor: Colors.secondary }}
        variant="outlined"
        fullWidth={fullWidth}
        size="medium"
        disabled={loading}
        onClick={() =>
          removeFromCart({
            variables: {
              where: {
                id: cartItemId,
              },
            },
          })
        }
      >
        <Delete color="error" />
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Product Removed From Cart
        </Alert>
      </Snackbar>
    </>
  );
};

export default RemoveFromCartButton;
