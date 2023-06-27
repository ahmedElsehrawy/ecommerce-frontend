import { Grid } from "@mui/material";
import React from "react";
import { Product } from "../../types/product";
import ContentContainer from "../Layout/ContentContainer";
import ProductDetails from "./ProductDetails";
import ProductImage from "./ProductImage";
import AddComment from "../comments/addComment";

type Props = {
  product: Product;
};

const ProductPage = (props: Props) => {
  const { product } = props;
  return (
    <ContentContainer>
      <Grid container spacing={5}>
        <ProductImage
          productImage={product?.mainImage}
          gallery={product?.Gallery}
        />

        <ProductDetails
          id={product?.id}
          name={product?.name}
          description={product?.description}
          price={product?.price}
          averageRatingValue={product?.averageRatingValue}
          category={{
            name: product?.category?.name,
            id: product?.category?.id,
          }}
        />
      </Grid>

      <AddComment comments={product?.Comment} productId={product?.id} />
    </ContentContainer>
  );
};

export default ProductPage;
