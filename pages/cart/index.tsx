import { useQuery } from "@apollo/client";
import { Button, Card, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { GET_CART } from "../../apollo/queiries";
import Empty from "../../components/common/Empty";
import ContentContainer from "../../components/Layout/ContentContainer";
import ProductCard from "../../components/Products/ProductCard";
import { CartItem } from "../../types/cart";

interface Props {}

const Cart = (props: Props) => {
  const { data, loading } = useQuery(GET_CART);
  console.log("🚀 ~ file: index.tsx ~ line 14 ~ Cart ~ data", data);

  if (loading) {
    return <></>;
  }

  return (
    <ContentContainer>
      {data?.getCart.CartItem.length === 0 ? (
        <Empty imageSrc="/undraw_empty_cart_co35.png" text="cart is empty" />
      ) : (
        <>
          <Card sx={{ marginBottom: 4, padding: 4, textAlign: "center" }}>
            <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
              totalPrice: ${data?.getCart.totalPrice.toFixed(2)}
            </Typography>
            <Link href="/proceed">
              <Button variant="outlined">Proceed</Button>
            </Link>
          </Card>
          <Grid container spacing={5}>
            {data?.getCart?.CartItem.map((cartItem: CartItem) => (
              <Grid item xs={12} md={6} lg={4} key={cartItem.id}>
                <ProductCard
                  fromCart={true}
                  product={cartItem.product}
                  cartItemId={cartItem.id}
                  quantity={cartItem.quantity}
                />
              </Grid>
            ))}
          </Grid>
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
