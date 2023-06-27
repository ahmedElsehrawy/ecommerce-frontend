import { useQuery } from "@apollo/client";
import React from "react";
import { ME } from "../../apollo/queiries";
import Loader from "../../components/common/Loader";
import ContentContainer from "../../components/Layout/ContentContainer";
import Orders from "../../components/Profile/Orders";

type Props = {};

const OrdersPage = (props: Props) => {
  const { data, loading, error } = useQuery(ME);

  if (loading) {
    return <Loader />;
  }

  return (
    <ContentContainer>
      <Orders orders={data?.user?.Order} />
    </ContentContainer>
  );
};

export default OrdersPage;
