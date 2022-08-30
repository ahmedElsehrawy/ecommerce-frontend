import { Grid } from "@mui/material";
import React from "react";
import { Product } from "../../types/product";
import ContentContainer from "../Layout/ContentContainer";
import ProductDetails from "./ProductDetails";
import ProductImage from "./ProductImage";

type Props = {
  product: Product;
};

const ProductPage = (props: Props) => {
  const { product } = props;
  return (
    <ContentContainer>
      <Grid container spacing={5}>
        <ProductImage productImage={product?.image} />
        <ProductDetails
          id={product?.id}
          name={product?.name}
          description={product?.description}
          price={product?.price}
          category={{
            name: product?.category?.name,
            id: product?.category?.id,
          }}
        />
      </Grid>
    </ContentContainer>
  );
};

export default ProductPage;
