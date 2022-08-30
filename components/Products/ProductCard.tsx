import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

//@ts-ignore
import { Colors } from "../../constants/colors";
import { Product } from "../../types/product";
import AddToCartButton from "./AddToCartButton";
import RemoveFromCartButton from "./removeFromCartButton";

interface Props {
  product: Product;
  fromCart?: boolean;
  cartItemId?: number;
}

const ProductCard = (props: Props) => {
  const { product, fromCart, cartItemId } = props;

  return (
    <Card
      sx={{
        display: "flex",
        minHeight: 200,
        backgroundColor: Colors.cardColor,
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={product.image}
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
              {product.name}
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
            {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          {fromCart ? (
            <RemoveFromCartButton fullWidth={false} cartItemId={cartItemId} />
          ) : (
            <AddToCartButton fullWidth={false} productId={product.id} />
          )}
        </CardActions>
      </Box>
    </Card>
  );
};

export default ProductCard;
