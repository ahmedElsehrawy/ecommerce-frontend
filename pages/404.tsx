import Image from "next/image";
import React from "react";
//@ts-ignore
import styled from "styled-components";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <Container>
      <ImageContainer>
        <Image
          src="/notfound.svg"
          alt="not found image"
          width={500}
          height={500}
        />
      </ImageContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 90%;
`;

export default NotFound;
