import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
//@ts-ignore
import styled from "styled-components";
import { AuthVar } from "../../apollo/initialState";
import { Colors } from "../../constants/colors";
import { getAuth, setAuthVar } from "../../utils/auth";
import Navbar from "./Navbar";

type Props = {
  children: any;
};

const Layout = (props: Props) => {
  const router = useRouter();
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    const handleUserState = async () => {
      const userString: any = await getAuth();
      if (userString) {
        const parsedUser = JSON.parse(userString);
        console.log(
          "🚀 ~ file: index.tsx ~ line 23 ~ handleUserState ~ parsedUser",
          parsedUser
        );

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
    return <div>loadin....</div>;
  }

  return router.asPath === "/login" ? (
    <Wrapper>{props.children}</Wrapper>
  ) : (
    <Wrapper>
      <Navbar />
      {props.children}
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  background-color: ${Colors.primary};
  width: 100%;
  height: 100vh;
`;
