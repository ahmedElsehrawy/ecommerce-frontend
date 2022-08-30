import React from "react";
import { addApolloState, initializeApollo } from "../../apollo/client";
import { GET_PRODUCT } from "../../apollo/queiries";
import ProductPage from "../../components/Products";
import { Product } from "../../types/product";

interface Props {
  product: Product;
}

const Product = (props: Props) => {
  const { product } = props;

  return <ProductPage product={product} />;
};

export async function getServerSideProps(context: any) {
  const client = initializeApollo();
  const { data } = await client.query({
    query: GET_PRODUCT,
    variables: {
      where: {
        id: +context.query.productId,
      },
    },
  });

  return addApolloState(client, {
    props: { product: data?.product },
  });
}

export default Product;
