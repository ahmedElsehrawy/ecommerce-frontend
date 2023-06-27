import { Card, Divider, Typography } from "@mui/material";
import React from "react";
//@ts-ignore
import styled from "styled-components";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
}

const Info = (props: Props) => {
  const { firstName, lastName, email, phone, createdAt } = props;
  return (
    <Container>
      <Card sx={{ padding: "16px" }}>
        <Typography
          sx={{ marginTop: "16px" }}
        >{` name: ${firstName} ${lastName}`}</Typography>
        <Divider />
        <Typography sx={{ marginTop: "16px" }}>{` email: ${email}`}</Typography>
        <Divider />
        <Typography
          sx={{ marginTop: "16px" }}
        >{` phone Number: ${phone}`}</Typography>
        <Divider />
        <Typography sx={{ marginTop: "16px" }}>{` joined: ${new Date(
          +createdAt
        ).toLocaleDateString()}`}</Typography>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 0 50px;

  @media screen and (max-width: 768px) {
    padding: 0 10px;
    margin-top: 30px;
  }
`;

export default Info;
