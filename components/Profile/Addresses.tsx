import * as React from "react";
import { Button, Typography } from "@mui/material";

//@ts-ignore
import styled from "styled-components";
import { Screens } from "../../constants/screens";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import { useQuery } from "@apollo/client";
import { GET_USER_ADDRESSES } from "../../apollo/queiries";
import Loader from "../common/Loader";
import { Address } from "../../types/address";
import { AuthVar } from "../../apollo/initialState";

const Addresses = () => {
  const auth = AuthVar();
  const { data, loading } = useQuery(GET_USER_ADDRESSES, {
    variables: {
      where: { userId: auth.id },
    },
    skip: !auth,
  });
  console.log("🚀 ~ file: Addresses.tsx:23 ~ Addresses ~ data:", data);

  if (loading) {
    return <Loader />;
  }
  return (
    <AddressesContainer>
      <AddressForm />
      <Typography variant="h5">Addresses</Typography>
      {data?.getUserAddresses.map((addrees: Address) => (
        <AddressCard key={addrees.id} address={addrees} />
      ))}
    </AddressesContainer>
  );
};

const AddressesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-left: 50px;

  @media (min-width: ${Screens.md}) {
    padding: 22px;
  }
`;

export default Addresses;
