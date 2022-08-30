import { Grid, Skeleton } from "@mui/material";
import Image from "next/image";
import React from "react";

interface Props {
  productImage: string;
}

const ProductImage = (props: Props) => {
  const { productImage } = props;
  return (
    <Grid item xs={12} sm={6}>
      <Image
        width={500}
        height={500}
        alt="demo"
        layout="responsive"
        src={productImage}
      />
    </Grid>
  );
};

export default ProductImage;
