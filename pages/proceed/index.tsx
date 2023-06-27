import { useMutation, useQuery } from "@apollo/client";
import {
  Avatar,
  Button,
  Card,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { AuthVar, CartNumberVar } from "../../apollo/initialState";
import {
  CREATE_ORDER,
  GET_CART,
  GET_USER_ADDRESSES,
} from "../../apollo/queiries";
import ContentContainer from "../../components/Layout/ContentContainer";
import { Address } from "../../types/address";
//@ts-ignore
import styled from "styled-components";
import { CartItem } from "../../types/cart";
import { useRouter } from "next/router";
import Loader from "../../components/common/Loader";

type Props = {};

const Proceed = (props: Props) => {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [address, setAddress] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const auth = AuthVar();
  const { data, loading } = useQuery(GET_CART);

  const { data: addresses, loading: addressesLoading } = useQuery(
    GET_USER_ADDRESSES,
    {
      variables: {
        where: { userId: auth.id },
      },
      skip: !auth,
    }
  );

  const [createOrder, { loading: createOrderLoading }] =
    useMutation(CREATE_ORDER);

  const handleAddressChange = (event: SelectChangeEvent) => {
    setAddress(+event.target.value as number);
  };

  const handlePaymentChange = (event: SelectChangeEvent) => {
    setPaymentMethod(event.target.value as string);
  };
  if (loading || addressesLoading || createOrderLoading || loader) {
    return <Loader />;
  }

  const orderItems = data?.getCart?.CartItem.map((item: CartItem) => {
    return {
      quantity: item.quantity,
      productId: item.product.id,
    };
  });

  return (
    <ContentContainer>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="demo-simple-select-label">Address</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  //@ts-ignore
                  value={address}
                  label="Address"
                  onChange={handleAddressChange}
                >
                  {addresses?.getUserAddresses?.map((address: Address) => (
                    <MenuItem
                      key={address.id}
                      value={address.id}
                    >{`${address.country},${address.city},${address.street}`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="demo-simple-select-label">Address</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  //@ts-ignore
                  value={address}
                  label="Address"
                  onChange={handleAddressChange}
                >
                  {addresses?.getUserAddresses?.map((address: Address) => (
                    <MenuItem
                      key={address.id}
                      value={address.id}
                    >{`${address.country},${address.city},${address.street}`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Payment Method
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //@ts-ignore
              value={paymentMethod}
              label="Payment"
              onChange={handlePaymentChange}
            >
              <MenuItem value="Delivery">cash on delivery</MenuItem>
              {/* <MenuItem key={address.id} value={address.id}></MenuItem> */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2 }}>
            <List>
              {data?.getCart?.CartItem.map((item: CartItem, index: number) => (
                <ListItem key={item.id}>
                  <div style={{ width: "100%" }}>
                    <ProductListItem>
                      <Avatar src={item.product.mainImage} />
                      <Typography variant="body2" gutterBottom component="div">
                        {item.product.name}
                      </Typography>
                      <Typography variant="body2" gutterBottom component="div">
                        {item.quantity}
                      </Typography>
                    </ProductListItem>
                    {index <= data?.getCart?.CartItem.length - 2 && <Divider />}
                  </div>
                </ListItem>
              ))}
            </List>
            <Typography sx={{ padding: 2 }}>
              totalPrice: {data?.getCart?.totalPrice}
            </Typography>
          </Card>
        </Grid>
        <Button
          variant="outlined"
          size="large"
          sx={{ margin: "0 auto", marginTop: 4 }}
          disabled={createOrderLoading || !address}
          onClick={() => {
            createOrder({
              variables: {
                input: {
                  addressId: address,
                  userId: auth?.id,
                  products: orderItems,
                },
              },
              onCompleted: (data) => {
                setLoader(true);
                CartNumberVar(0);
                router.push(`/orders/${data?.createOrder?.id}`);
              },
              refetchQueries: [{ query: GET_CART }],
            });
          }}
        >
          Order Now!
        </Button>
      </Grid>
    </ContentContainer>
  );
};

const ProductListItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

export default Proceed;
