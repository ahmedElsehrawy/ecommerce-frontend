import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
//@ts-ignore
import styled from "styled-components";

interface Props {
  balance: number;
}

const Balance = (props: Props) => {
  const { balance } = props;
  return (
    <Container>
      <Card sx={{ padding: 1 }}>
        <CardContent>
          <Typography sx={{ textAlign: "center" }} variant="h6">
            Your balnce is: ${balance}
          </Typography>
        </CardContent>
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

export default Balance;
