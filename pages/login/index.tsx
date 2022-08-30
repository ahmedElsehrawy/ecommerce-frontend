import React, { useState, useMemo } from "react";
import { Grid, Box, TextField, Button, FormLabel } from "@mui/material";
//@ts-ignore
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { setAuthVar, storeAuth } from "../../utils/auth";
import { Colors } from "../../constants/colors";
import { useRouter } from "next/router";
import { AuthVar } from "../../apollo/initialState";
import { LOGIN } from "../../apollo/queiries";

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [login, { data, error }] = useMutation(LOGIN, {
    variables: {
      input: {
        email,
        password,
      },
    },
    onCompleted: async (data) => {
      await setAuthVar(AuthVar, data?.login);
      await storeAuth(data?.login);
      router.push("/");
    },
  });

  return (
    <Grid container spacing={0}>
      <Grid item xs={0} sm={6}>
        <ImageContainer>
          <OverLay />
        </ImageContainer>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormContainer>
          <Box
            component="form"
            noValidate
            style={{ width: "80%" }}
            onSubmit={(e: any) => {
              e.preventDefault();
              login();
            }}
          >
            <FormItem>
              <CustomLabel>Enter Your Email</CustomLabel>
              <TextField
                id="email"
                size="small"
                fullWidth
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </FormItem>
            <FormItem>
              <CustomLabel>Enter Your Password</CustomLabel>
              <TextField
                id="password"
                size="small"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormItem>
            <FormItem>
              <CustomButton fullWidth type="submit" variant="contained">
                Sign In
              </CustomButton>
            </FormItem>
          </Box>
        </FormContainer>
      </Grid>
    </Grid>
  );
};

const OverLay = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.233); /* Black background with opacity */
`;

const ImageContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-image: url("market.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const FormContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${Colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormItem = styled.div`
  padding-bottom: 20px;
  width: 100%;
`;

const CustomButton = styled(Button)`
  background-color: ${Colors.third};

  :hover {
    background-color: ${Colors.third};
  }
`;

const CustomLabel = styled(FormLabel)`
  color: ${Colors.secondary};
`;

export default Login;
