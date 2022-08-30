import { useMutation, useQuery } from "@apollo/client";
import { Alert, Grid, Typography } from "@mui/material";
import React from "react";
import { initializeApollo } from "../../apollo/client";
import { GET_CART } from "../../apollo/queiries";
import ContentContainer from "../../components/Layout/ContentContainer";
import ProductCard from "../../components/Products/ProductCard";
import { CartItem } from "../../types/cart";

interface Props {}

const Cart = (props: Props) => {
  const { data, loading } = useQuery(GET_CART);

  return loading ? (
    <div></div>
  ) : (
    <ContentContainer>
      {data?.getCart.CartItem.length === 0 ? (
        <Alert sx={{ width: 300, margin: "0 auto" }} severity="error">
          Cart is Empty
        </Alert>
      ) : (
        <>
          <Grid container spacing={5}>
            {data?.getCart?.CartItem.map((cartItem: CartItem) => (
              <Grid item xs={12} md={6} lg={4} key={cartItem.id}>
                <ProductCard
                  fromCart={true}
                  product={cartItem.product}
                  cartItemId={cartItem.id}
                />
              </Grid>
            ))}
          </Grid>
          <Typography sx={{ textAlign: "center", margin: "40px" }}>
            totalPrice: ${data?.getCart.totalPrice}
          </Typography>
        </>
      )}
    </ContentContainer>
  );
};

// export async function getStaticProps() {
//   const client = initializeApollo();
//   const { data } = await client.query({
//     query: GET_CART,
//   });

//   return {
//     props: { cart: data?.getCart },
//   };
// }

export default Cart;
