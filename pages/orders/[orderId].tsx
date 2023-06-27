import { useQuery } from "@apollo/client";
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
//@ts-ignore
import styled from "styled-components";
import { GET_ONE_ORDER } from "../../apollo/queiries";
import Loader from "../../components/common/Loader";
import ContentContainer from "../../components/Layout/ContentContainer";
import { Colors } from "../../constants/colors";
import { OrderItem } from "../../types/order";

type Props = {};

const OrderPage = (props: Props) => {
  const {
    query: { orderId },
  } = useRouter();

  const { data: order, loading } = useQuery(GET_ONE_ORDER, {
    variables: {
      where: {
        //@ts-ignore
        id: +orderId,
      },
    },
    skip: !orderId,
  });
  console.log("🚀 ~ file: [orderId].tsx ~ line 36 ~ OrderPage ~ order", order);

  if (loading || !order) {
    return <Loader />;
  }

  return (
    <ContentContainer>
      <Typography sx={{ color: Colors.babyBlue }} gutterBottom component="div">
        #orderId: {order.getOneOrder.id}
      </Typography>
      <Typography variant="caption" gutterBottom component="div">
        {
          //@ts-ignore
          `status: ${order.getOneOrder.orderStatus.toLowerCase()}`
        }
      </Typography>
      <Typography variant="caption" gutterBottom component="div">
        totalPrice: ${order.getOneOrder.totalPrice}
      </Typography>

      <List>
        {order.getOneOrder.OrderItem.map((item: OrderItem, index: number) => {
          return (
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
                {index <= order.getOneOrder.OrderItem.length - 2 && <Divider />}
              </div>
            </ListItem>
          );
        })}
      </List>
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

export default OrderPage;
