import { useMutation } from "@apollo/client";
import { Button } from "@mui/material";
import React from "react";
import { GET_CART, REMOVE_FROM_CART } from "../../apollo/queiries";
import { Colors } from "../../constants/colors";
import { Cart, CartItem } from "../../types/cart";

interface Props {
  fullWidth?: boolean;
  cartItemId?: number;
}

const RemoveFromCartButton = (props: Props) => {
  const { fullWidth, cartItemId } = props;

  const [removeFromCart, { loading, data }] = useMutation(REMOVE_FROM_CART, {
    update: (cache, { data }) => {
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
    },
  });

  return (
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
      Remove From Cart
    </Button>
  );
};

export default RemoveFromCartButton;
