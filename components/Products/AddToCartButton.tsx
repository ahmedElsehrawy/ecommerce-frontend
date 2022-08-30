import { useMutation } from "@apollo/client";
import { Button } from "@mui/material";
import React from "react";
import { ADD_TO_CART, GET_CART } from "../../apollo/queiries";
import { Colors } from "../../constants/colors";

interface Props {
  fullWidth?: boolean;
  productId: number;
}

const AddToCartButton = (props: Props) => {
  const { fullWidth, productId } = props;

  const [addToCart, { loading, data }] = useMutation(ADD_TO_CART, {
    update: (cache, { data }) => {
      const cart: any = cache.readQuery({
        query: GET_CART,
      });

      const newCart = {
        getCart: {
          ...cart.getCart,
          totalPrice: cart.getCart.totalPrice + data?.addCartItem.product.price,
          CartItem: [...cart.getCart.CartItem, data?.addCartItem],
        },
      };

      cache.writeQuery({
        query: GET_CART,
        data: newCart,
      });
    },
    // refetchQueries: [{ query: GET_CART }],
  });

  return (
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
  );
};

export default AddToCartButton;
