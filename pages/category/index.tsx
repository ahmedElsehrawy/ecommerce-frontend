import { Alert, Grid } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { addApolloState, initializeApollo } from "../../apollo/client";
import { GET_PRODUCTS } from "../../apollo/queiries";
import ContentContainer from "../../components/Layout/ContentContainer";
import ProductCard from "../../components/Products/ProductCard";
import { Product } from "../../types/product";

interface Props {
  products: Product[];
}

const CategoryPage = (props: Props) => {
  const { products } = props;

  if (products.length === 0) {
    return (
      <ContentContainer>
        <Alert sx={{ width: 300, margin: "0 auto" }} severity="error">
          No Results
        </Alert>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer>
      <Grid sx={{ paddingBottom: 20 }} container spacing={5}>
        {products.map((product: any) => (
          <Grid key={product.id} item xs={12} md={6} lg={4} xl={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </ContentContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const client = initializeApollo();
  const { data } = await client.query({
    query: GET_PRODUCTS,
    variables: {
      where: {
        //@ts-ignore
        categoryId: +context.query.id,
      },
      take: 10,
      skip: 0,
    },
  });

  return addApolloState(client, {
    props: {
      products: data?.products?.nodes,
    },
  });
};

export default CategoryPage;
