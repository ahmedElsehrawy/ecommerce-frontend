import type { NextPage } from "next";
//@ts-ignore
import styled from "styled-components";
import Category from "../components/Home/Category";
import ContentContainer from "../components/Layout/ContentContainer";
import OfferBanner from "../components/Home/offer";
import { Colors } from "../constants/colors";
import { addApolloState, initializeApollo } from "../apollo/client";
import { Category as CategoryType } from "../types/category";
import { CATEGORIES } from "../apollo/queiries";

interface Props {
  categories: CategoryType[];
  count: number;
}

//@ts-ignore
const Home: NextPage = (props: Props) => {
  const { categories, count } = props;
  return (
    <ContentContainer>
      <Container>
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

export async function getServerSideProps() {
  const client = initializeApollo();
  const { data } = await client.query({
    query: CATEGORIES,
    variables: {
      skip: 0,
      take: 4,
    },
  });

  return addApolloState(client, {
    props: {
      categories: data?.categories?.nodes,
      count: data?.categories?.count,
    },
  });
}

export default Home;
