import React from "react";
//@ts-ignore
import styled from "styled-components";
import { Colors } from "../../../constants/colors";
import Categories from "./Categories";
import FirstRow from "./FirstRow";
import Logo from "./Logo";
import Search from "./Search";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <Container>
      <FirstRow />
      <Logo />
      <ThirdRow>
        <Categories />
        <Search />
      </ThirdRow>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${Colors.primary};
  width: 100%;
  padding: 30px 40px;
`;

const ThirdRow = styled.div`
  width: 100%;
  height: 100px;
  padding: 40px 30px;
  position: relative;
`;

export default Navbar;
