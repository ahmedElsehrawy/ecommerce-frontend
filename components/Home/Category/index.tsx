import { gql, useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
//@ts-ignore
import styled from "styled-components";
import { GET_PRODUCTS } from "../../../apollo/queiries";
import { Colors } from "../../../constants/colors";
import { Category } from "../../../types/category";
import Loader from "../../common/Loader";

type Props = {
  category: Category;
};

const Category = ({ category }: Props) => {
  const { data, loading } = useQuery(GET_PRODUCTS, {
    variables: {
      where: {
        categoryId: category?.id,
      },
      take: 10,
      skip: 0,
    },
    skip: !category?.id,
  });
  console.log("🚀 ~ file: index.tsx ~ line 24 ~ Category ~ data", data);

  if (loading) {
    return <Loader />;
  }
  return data?.products?.count > 0 ? (
    <Container>
      <h2>{category?.name.toUpperCase()}</h2>
      <Grid container spacing={1} justifyContent="flex-start">
        {data?.products.nodes.map((product: any) => (
          <Grid
            item
            key={product?.id}
            xs={12}
            sm={4}
            md={3}
            lg={2}
            textAlign="center"
          >
            <Link href={`/products/${product?.id}`}>
              <ImageContainer>
                <Image
                  src={product?.mainImage}
                  width={300}
                  height={300}
                  alt={product?.name}
                  layout="responsive"
                  objectFit="cover"
                  objectPosition="top"
                />
              </ImageContainer>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  ) : null;
};

const Container = styled.div`
  margin-top: 50px;
`;

const ImageContainer = styled.div`
  cursor: pointer;
`;

export default Category;
