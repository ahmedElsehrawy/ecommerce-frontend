import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import React from "react";
//@ts-ignore
import styled from "styled-components";
import { CATEGORIES } from "../../../apollo/queiries";
import { Colors } from "../../../constants/colors";

type Props = {};

const Categories = (props: Props) => {
  const { data, loading } = useQuery(CATEGORIES, {
    variables: {
      skip: 0,
      take: 6,
    },
  });

  if (loading) {
    return <Empty />;
  }

  return (
    <Container>
      {data?.categories?.nodes?.map((category: any) => (
        <Link
          key={category.id}
          href={`/category?name=${category.name}&id=${category.id}`}
        >
          <Category>{category.name.toUpperCase()}</Category>
        </Link>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const Category = styled.div`
  margin: 0 10px;
  color: ${Colors.text};
  cursor: pointer;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
  @media screen and (max-width: 425px) {
    font-size: 12px;
  }
`;

const Empty = styled.div`
  margin: 0 10px;
  height: 50px;
`;
export default Categories;
