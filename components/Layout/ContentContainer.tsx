import React from "react";
//@ts-ignore
import styled from "styled-components";

type Props = {
  children: any;
};

const ContentContainer = (props: Props) => {
  return <Container>{props.children}</Container>;
};

const Container = styled.div`
  width: calc(100% - 40px);
  margin: 0 20px;
`;

export default ContentContainer;
