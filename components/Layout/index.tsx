import { useQuery, useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
//@ts-ignore
import styled from "styled-components";
import { AuthVar, CartNumberVar } from "../../apollo/initialState";
import { GET_CART, GET_FAVOURITES } from "../../apollo/queiries";
import { Colors } from "../../constants/colors";
import { getAuth, setAuthVar } from "../../utils/auth";
import Footer from "../common/Footer";
import Navbar from "./Navbar";
import Categories from "./Navbar/Categories";

type Props = {
  children: any;
};

const Layout = (props: Props) => {
  const router = useRouter();
  const [ready, setReady] = useState<boolean>(false);
  const { data } = useQuery(GET_CART);
  const { data: favourites } = useQuery(GET_FAVOURITES);

  if (data) {
    CartNumberVar(data?.getCart?.CartItem.length);
  }

  useEffect(() => {
    const handleUserState = async () => {
      const userString: any = await getAuth();
      if (userString) {
        const parsedUser = JSON.parse(userString);

        await setAuthVar(AuthVar, {
          isLogin: parsedUser.isLogin,
          token: parsedUser.token,
          id: parsedUser.id,
          firstName: parsedUser.firstName,
          lastName: parsedUser.lastName,
          email: parsedUser.email,
          phone: parsedUser.phone,
          role: parsedUser.role,
        });
      }
      setReady(true);
    };

    handleUserState();
  });

  if (!ready) {
    return <></>;
  }

  return router.asPath === "/login" || router.asPath === "/register" ? (
    <Wrapper>{props.children}</Wrapper>
  ) : (
    <Wrapper>
      <Navbar />
      <div className="content">
        <Categories />
        {props.children}
      </div>
      <Footer />
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  background-color: ${Colors.primary};
  width: 100%;
  height: 100vh;
  .content {
    min-height: 100vh;
  }
`;
