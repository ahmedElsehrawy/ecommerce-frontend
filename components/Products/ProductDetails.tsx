import { Grid, Rating } from "@mui/material";
import React from "react";
//@ts-ignore
import styled from "styled-components";
import { Colors } from "../../constants/colors";
import AddToCartButton from "./AddToCartButton";

interface Props {
  id: number;
  name: string;
  description: string;
  price: number;
  averageRatingValue: number;
  category: {
    id: number;
    name: string;
  };
}

const ProductDetails = (props: Props) => {
  const { id, name, description, price, category, averageRatingValue } = props;
  return (
    <Grid item xs={12} sm={6} md={8}>
      <Title>{name}</Title>
      <Rating name="read-only" value={averageRatingValue} readOnly />
      <Category>#{category.name}</Category>
      <Price>${price}</Price>
      <Description>{description}</Description>
      <AddToCartButton productId={id} />
    </Grid>
  );
};

const Container = styled.div``;
const Title = styled.h1`
  color: ${Colors.text};
  margin-bottom: 0;
`;

const Category = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${Colors.babyBlue};
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.4s ease;

  :hover {
    color: ${Colors.third};
  }
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${Colors.secondary};
`;

const Description = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: ${Colors.grayText};
`;

export default ProductDetails;
