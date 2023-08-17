import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

import { Colors } from "../../constants/colors";
//@ts-ignore
import styled from "styled-components";
import { Product } from "../../types/product";
import AddToCartButton from "./AddToCartButton";
import RemoveFromCartButton from "./removeFromCartButton";
import AddToFavouriteButton from "./AddToFavouriteButton";

interface Props {
  product: Product;
  fromCart?: boolean;
  cartItemId?: number;
  quantity?: number;
}

const ProductCard = (props: Props) => {
  const { product, fromCart, cartItemId, quantity } = props;

  return (
    <Card
      sx={{
        display: "flex",
        minHeight: 200,
        backgroundColor: Colors.cardColor,
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: 151,
          height: 200,
          maxHeight: 200,
        }}
        image={product.mainImage}
        alt={product.name}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Link href={`/products/${product.id}`}>
            <Typography
              sx={{ cursor: "pointer", color: Colors.babyBlue }}
              component="div"
              variant="h5"
            >
              {product.name.substring(0, 12)}
              {product.name.length > 12 && "..."}
            </Typography>
          </Link>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{ color: Colors.text }}
          >
            ${product.price}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="p"
            sx={{ color: Colors.text }}
          >
            {product.description.substring(0, 20)}
            {product.description.length > 20 && "..."}
          </Typography>
        </CardContent>
        <StyledCardActions>
          {fromCart ? (
            <RemoveFromCartButton fullWidth={false} cartItemId={cartItemId} />
          ) : (
            <AddToCartButton fullWidth={false} productId={product.id} />
          )}
          <AddToFavouriteButton productId={product.id} />
        </StyledCardActions>
      </Box>

      {quantity && <Quantity>{quantity}</Quantity>}
    </Card>
  );
};

const Quantity = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 26px;
  height: 26px;
  line-height: 26px;
  background-color: ${Colors.babyBlue};
  color: ${Colors.white};
  text-align: center;
  border-radius: 50%;
`;

const StyledCardActions = styled(CardActions)`
  display: flex;
  gap: 5px;
`;

export default ProductCard;
