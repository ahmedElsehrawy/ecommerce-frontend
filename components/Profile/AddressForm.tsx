import {
  Alert,
  Box,
  Button,
  FormLabel,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
//@ts-ignore
import styled from "styled-components";
import { Colors } from "../../constants/colors";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_ADDRESS, GET_USER_ADDRESSES, ME } from "../../apollo/queiries";
import Loader from "../common/Loader";
import { AuthVar } from "../../apollo/initialState";

const AddressForm = () => {
  const [country, setCountry] = useState<String>("");
  const [city, setCity] = useState<String>("");
  const [postalCode, setPostalCode] = useState<String>("");
  const [telephone, setTelephone] = useState<String>("");
  const [street, setStreet] = useState<String>("");
  const [houseNumber, setHouseNumber] = useState<String>("");
  const [open, setOpen] = useState<boolean>(false);
  const auth = AuthVar();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { data, loading, error } = useQuery(ME);

  const [createAddress] = useMutation(CREATE_ADDRESS, {
    variables: {
      input: {
        country,
        city,
        postalCode,
        telephone,
        street,
        houseNumber,
        userId: +data?.user?.id,
      },
    },
  });

  if (loading) {
    return <Loader />;
  }
  console.log("🚀 ~ file: index.tsx ~ line 12 ~ Profile ~ data", data);

  if (error) {
    return <div>ooops error</div>;
  }

  return (
    <Grid item xs={12} sm={6}>
      <FormContainer>
        <Box
          component="form"
          noValidate
          style={{ width: "80%" }}
          onSubmit={(e: any) => {
            e.preventDefault();
            createAddress({
              onCompleted: () => {
                setCountry("");
                setCity("");
                setPostalCode("");
                setStreet("");
                setTelephone("");
                setHouseNumber("");
                setOpen(true);
              },
              refetchQueries: [
                {
                  query: GET_USER_ADDRESSES,
                  variables: {
                    where: { userId: auth.id },
                    skip: !auth.id,
                  },
                },
              ],
            });
          }}
        >
          <Typography variant="h5" marginBottom={5}>
            {" "}
            Add New Address{" "}
          </Typography>
          <FormItem>
            <CustomLabel>Enter Your Country</CustomLabel>
            <TextField
              id="country"
              size="small"
              fullWidth
              value={country}
              onChange={(e: any) => setCountry(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <CustomLabel>Enter Your City</CustomLabel>
            <TextField
              id="city"
              size="small"
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <CustomLabel>Enter Your PostCode</CustomLabel>
            <TextField
              id="postCode"
              size="small"
              fullWidth
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <CustomLabel>Enter Your Telephone</CustomLabel>
            <TextField
              id="telephone"
              size="small"
              type="number"
              fullWidth
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <CustomLabel>Enter Your Street</CustomLabel>
            <TextField
              id="street"
              size="small"
              fullWidth
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <CustomLabel>Enter Your HouseNumber</CustomLabel>
            <TextField
              id="houseNumber"
              size="small"
              type="number"
              fullWidth
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <CustomButton fullWidth type="submit" variant="contained">
              Add Address
            </CustomButton>
          </FormItem>
        </Box>
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Address Added Successfully
          </Alert>
        </Snackbar>
      </FormContainer>
    </Grid>
  );
};

const FormContainer = styled.div`
  max-width: 500px;
  margin-bottom: 100px;
  background-color: ${Colors.primary};
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

export default AddressForm;
