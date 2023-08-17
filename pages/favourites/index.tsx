import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import React from "react";
import { GET_FAVOURITES } from "../../apollo/queiries";
import Empty from "../../components/common/Empty";
import ContentContainer from "../../components/Layout/ContentContainer";
import ProductCard from "../../components/Products/ProductCard";

type Props = {};

const Favourites = (props: Props) => {
  const { data, loading } = useQuery(GET_FAVOURITES);
  console.log("🚀 ~ file: index.tsx ~ line 12 ~ Favourites ~ data", data);

  console.log(data);

  if (loading) {
    return <></>;
  }

  return data?.getFavourites.length === 0 ? (
    <Empty imageSrc="/undraw_empty_cart_co35.png" text="favourites is empty" />
  ) : (
    <ContentContainer>
      <Grid sx={{ paddingBottom: 20 }} container spacing={5}>
        {data?.getFavourites.map((item: any) => (
          <Grid key={item.id} item xs={12} md={6} lg={4} xl={3}>
            <ProductCard product={item.product} />
          </Grid>
        ))}
      </Grid>
    </ContentContainer>
  );
};

export default Favourites;
