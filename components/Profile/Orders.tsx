import {
  Avatar,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
//@ts-ignore
import styled from "styled-components";
import { Colors } from "../../constants/colors";
import { Order, OrderItem } from "../../types/order";

interface Props {
  orders: Order[];
}

const Orders = (props: Props) => {
  const { orders } = props;
  console.log("🚀 ~ file: Orders.tsx ~ line 12 ~ Orders ~ orders", orders);

  if (orders?.length === 0) {
    return (
      <Card sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography
          sx={{ textAlign: "center" }}
          gutterBottom
          component="div"
          variant="h6"
        >
          No Orders Yet
        </Typography>
      </Card>
    );
  }
  return (
    <Container>
      {orders.map((order) => (
        <Card key={order.id} sx={{ padding: "6px", marginBottom: "20px" }}>
          <CardContent>
            <Link href={`/orders/${order.id}`}>
              <Typography
                sx={{ color: Colors.babyBlue, cursor: "pointer" }}
                gutterBottom
                component="div"
              >
                #orderId: {order.id}
              </Typography>
            </Link>
            <Typography variant="caption" gutterBottom component="div">
              {
                //@ts-ignore
                `status: ${order.orderStatus.toLowerCase()}`
              }
            </Typography>
            <Typography variant="caption" gutterBottom component="div">
              totalPrice: ${order.totalPrice}
            </Typography>

            <List>
              {order.OrderItem.map((item: OrderItem, index: number) => (
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
                    {index <= order.OrderItem.length - 2 && <Divider />}
                  </div>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ))}
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

const ProductListItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

export default Orders;
