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

import { AuthVar } from "../../../apollo/initialState";
type Props = {};

const FirstRow = (props: Props) => {
  const data = useReactiveVar(AuthVar);

  return (
    <Container>
      {data?.token === null && (
        <Regiter>
          <Link href="/login">
            <a>
              <Person2OutlinedIcon />
              <span>Sign in</span>
            </a>
          </Link>
          <Link href="/register">
            <a>
              <PersonAddAlt1OutlinedIcon />
              <span>Register</span>
            </a>
          </Link>
        </Regiter>
      )}
      <Specifications>
        <Link href="/favorites">
          <a>
            <FavoriteBorderOutlinedIcon />
            <span>Favourites</span>
          </a>
        </Link>
        <Link href="/cart">
          <a>
            <AddShoppingCartOutlinedIcon />
            <span>cart</span>
          </a>
        </Link>
      </Specifications>
      <div>
        <MenuList />
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & span {
    font-size: 12px;
    color: ${Colors.third};
    margin-left: 5px;
  }
`;

const Regiter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;

  & a {
    display: flex;
    align-items: center;
  }
`;

const Specifications = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  & a {
    display: flex;
    align-items: center;
  }

  & span {
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

export default FirstRow;
