import type { GetStaticProps, NextPage } from "next";
//@ts-ignore
import styled from "styled-components";
import Category from "../components/Home/Category";
import ContentContainer from "../components/Layout/ContentContainer";
import OfferBanner from "../components/Home/offer";
import { Colors } from "../constants/colors";
import { addApolloState, initializeApollo } from "../apollo/client";
import { Category as CategoryType } from "../types/category";
import { CATEGORIES, GET_PRODUCTS } from "../apollo/queiries";
import Slider from "../components/common/Slider";
import { Product } from "../types/product";

interface Props {
  categories: CategoryType[];
  products: Product[];
  count: number;
}

//@ts-ignore
const Home: NextPage = (props: Props) => {
  const { categories, count, products } = props;
  console.log("🚀 ~ file: index.tsx ~ line 23 ~ categories", categories);
  return (
    <ContentContainer>
      <Container>
        <Slider products={products} />
        <OfferBanner />
        {categories?.map((category: any) => (
          <Category key={category?.id} category={category} />
        ))}
      </Container>
    </ContentContainer>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: ${Colors.primary};
`;

export const getStaticProps: GetStaticProps = async () => {
  const client = initializeApollo();
  const { data: categories } = await client.query({
    query: CATEGORIES,
    variables: {
      skip: 0,
      take: 4,
    },
  });
  console.log(
    "🚀 ~ file: index.tsx:51 ~ constgetStaticProps:GetStaticProps= ~ categories:",
    categories
  );

  let data = null;
  if (categories?.categories?.nodes[0]) {
    data = await client.query({
      query: GET_PRODUCTS,
      variables: {
        skip: 0,
        take: 10,
        where: {
          categoryId: categories?.categories?.nodes[0].id,
        },
      },
    });
  }
  console.log(data);
  return addApolloState(client, {
    props: {
      categories: categories?.categories?.nodes,
      count: categories?.categories?.count,
      products: data ? data?.data?.products?.nodes : null,
    },
  });
};

export default Home;
