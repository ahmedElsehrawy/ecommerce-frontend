import { gql, useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
//@ts-ignore
import styled from "styled-components";
import { GET_PRODUCTS } from "../../../apollo/queiries";
import { Category } from "../../../types/category";

type Props = {
  category: Category;
};

const Category = ({ category }: Props) => {
  const { data, loading } = useQuery(GET_PRODUCTS, {
    variables: {
      where: {
        categoryId: category?.id,
      },
    },
    skip: !category?.id,
  });

  if (loading) {
    return <div></div>;
  }
  return data?.getProducts.length > 0 ? (
    <Container>
      <h2>{category?.name.toUpperCase()}</h2>
      <Grid container spacing={1} justifyContent="flex-start">
        {data?.getProducts.map((product: any) => (
          <Grid item key={product?.id} xs={12} sm={4} md={3} textAlign="center">
            <Link href={`/products/${product?.id}`}>
              <ImageContainer>
                <Image
                  src={product?.image}
                  width={300}
                  height={300}
                  alt={product?.name}
                  layout="responsive"
                  objectFit="cover"
                />
              </ImageContainer>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  ) : (
    <div></div>
  );
};

const Container = styled.div`
  margin-top: 50px;
`;

const ImageContainer = styled.div`
  cursor: pointer;
`;

export default Category;
