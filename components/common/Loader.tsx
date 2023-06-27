import React from "react";
//@ts-ignore
import styled from "styled-components";
import { RingLoader } from "react-spinners";

type Props = {};

const Loader = (props: Props) => {
  return (
    <Container>
      <RingLoader color="#36d7b7" />
    </Container>
  );
};

const Container = styled.div`
  height: calc(100% - 195px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loader;
