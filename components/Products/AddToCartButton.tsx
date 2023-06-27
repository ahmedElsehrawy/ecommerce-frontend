import { useMutation } from "@apollo/client";
import { Alert, Button, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { CartNumberVar } from "../../apollo/initialState";
import { ADD_TO_CART, GET_CART } from "../../apollo/queiries";
import { Colors } from "../../constants/colors";
import { CartItem } from "../../types/cart";

interface Props {
  fullWidth?: boolean;
  productId: number;
}

const AddToCartButton = (props: Props) => {
  const { fullWidth, productId } = props;
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [addToCart] = useMutation(ADD_TO_CART, {
    update: (cache, { data }) => {
      const cart: any = cache.readQuery({
        query: GET_CART,
      });

      const ifProductExist = cart.getCart.CartItem.find(
        (cartItem: CartItem) =>
          cartItem?.product?.id === data?.addCartItem?.product.id
      );
      let newCartItems;
      if (ifProductExist) {
        let editedCartItem = cart.getCart.CartItem.find(
          (cartItem: CartItem) =>
            cartItem.product.id === data?.addCartItem.product.id
        );

        let filterdCartItem = cart.getCart.CartItem.filter(
          (cartItem: CartItem) =>
            cartItem.product.id !== data?.addCartItem.product.id
        );

        editedCartItem = {
          ...editedCartItem,
          quantity: data?.addCartItem.quantity,
        };

        newCartItems = [...filterdCartItem, editedCartItem];
      } else {
        newCartItems = [...cart.getCart.CartItem, data?.addCartItem];
      }

      const newCart = {
        getCart: {
          ...cart.getCart,
          totalPrice: cart.getCart.totalPrice + data?.addCartItem.product.price,
          CartItem: newCartItems,
        },
      };

      cache.writeQuery({
        query: GET_CART,
        data: newCart,
      });

      if (!ifProductExist) {
        const cartItemsNumber = CartNumberVar();
        CartNumberVar(cartItemsNumber + 1);
      }
      setOpen(true);
    },
  });

  return (
    <>
      <Button
        sx={{ color: Colors.secondary, borderColor: Colors.secondary }}
        variant="outlined"
        fullWidth={fullWidth}
        size="medium"
        onClick={() =>
          addToCart({
            variables: {
              input: {
                productId: productId,
                quantity: 1,
              },
            },
          })
        }
      >
        Add To Cart
      </Button>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Product Added To Cart
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddToCartButton;
