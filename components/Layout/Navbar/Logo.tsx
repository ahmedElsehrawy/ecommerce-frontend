import Link from "next/link";
import React from "react";
//@ts-ignore
import styled from "styled-components";

type Props = {};

const Logo = (props: Props) => {
  return (
    <Container>
      <Link href="/">
        <a href="">
          <div>
            H<span>&amp;</span>M
          </div>
        </a>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  & div {
    color: #ffffff;
    font-size: 30px;
    font-style: italic;
    font-family: "Rubik Dirt", cursive;
  }

  & span {
    font-size: 16px;
    font-style: italic;
    color: red !important;
  }
`;

export default Logo;
