import React from "react";
//@ts-ignore
import styled from "styled-components";
import { Colors } from "../../../constants/colors";

type Props = {};

const OfferBanner = (props: Props) => {
  return (
    <Container>
      <div>
        Shop now &amp; get 10% off your next purchase + introducing <br />{" "}
        faster shipping options at checkout
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${Colors.lightBrown};
  padding: 20px 80px;
  text-align: center;

  @media screen and (max-width: 768px) {
    padding: 20px 40px;
  }

  & div {
    font-weight: 700;
    font-size: 20;
  }

  & div {
    @media screen and (max-width: 768px) {
      font-size: 16px;
      font-weight: 600;
    }
    @media screen and (max-width: 425px) {
      font-size: 12px;
    }
  }
`;

export default OfferBanner;
