import Link from "next/link";
import React from "react";
//@ts-ignore
import styled from "styled-components";
import { Colors } from "../../../constants/colors";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import MenuList from "./MenuList";
import { useReactiveVar } from "@apollo/client";

import { AuthVar, CartNumberVar } from "../../../apollo/initialState";
import { Badge } from "@mui/material";
import Logo from "./Logo";
import Search from "./Search";

type Props = {};

const Navbar = (props: Props) => {
  const data = useReactiveVar(AuthVar);
  const cartItemsNumber = useReactiveVar(CartNumberVar);

  return (
    <Container>
      {data?.token === null && (
        <Regiter>
          <Link href="/login">
            <a>
              <Person2OutlinedIcon />
              <span className="text">Sign in</span>
            </a>
          </Link>
          <Link href="/register">
            <a>
              <PersonAddAlt1OutlinedIcon />
              <span className="text">Register</span>
            </a>
          </Link>
        </Regiter>
      )}
      <Search />

      <Logo />
      {data.token && (
        <SpecificationsContainer>
          <Specifications>
            <Link href="/favourites">
              <a>
                <FavoriteBorderOutlinedIcon />
                <span className="text">Favourites</span>
              </a>
            </Link>
            <Link href="/cart">
              <a>
                <Badge badgeContent={cartItemsNumber} color="default">
                  <AddShoppingCartOutlinedIcon />
                </Badge>
                <span className="text">cart</span>
              </a>
            </Link>
          </Specifications>
          <MenuList />
        </SpecificationsContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  height: 60px;
  margin-bottom: 30px;
  background-color: #202020;
  & span {
    font-size: 12px;
    color: ${Colors.third};
    margin-left: 5px;
  }
`;

const Regiter = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 7px;

  & span {
    color: ${Colors.lightWhite2};
  }
  & a {
    display: flex;
    align-items: center;
    color: ${Colors.lightWhite2};
  }

  & .text {
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

const SpecificationsContainer = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Specifications = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 7px;

  @media screen and (max-width: 768px) {
    display: none;
  }
  & a {
    display: flex;
    align-items: center;
    color: ${Colors.lightWhite2};
  }

  & span {
    color: ${Colors.lightWhite2};
  }

  & .text {
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

export default Navbar;
