import { Grid } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  productImage: string;
  gallery: any;
}

const ProductImage = (props: Props) => {
  const { productImage, gallery } = props;
  const [mainImage, setMainImage] = useState(productImage);
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Image
        width={500}
        height={500}
        alt="demo"
        layout="responsive"
        src={mainImage}
      />
      <div style={{ marginBottom: "50px" }}>
        <a
          style={{ marginRight: "3px" }}
          key={productImage}
          onClick={() => {
            setMainImage(productImage);
          }}
        >
          <Image
            width={40}
            height={40}
            alt="demo"
            layout="fixed"
            src={productImage}
          />
        </a>
        {gallery.map((image: any) => (
          <a
            style={{ marginRight: "3px" }}
            key={image.id}
            onClick={() => {
              setMainImage(image.url);
            }}
          >
            <Image
              width={40}
              height={40}
              alt="demo"
              layout="fixed"
              src={image.url}
            />
          </a>
        ))}
      </div>
    </Grid>
  );
};

export default ProductImage;
