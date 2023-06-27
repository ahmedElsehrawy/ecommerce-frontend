import {
  AttachMoneyOutlined,
  InfoOutlined,
  ListAltOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useState } from "react";
//@ts-ignore
import styled from "styled-components";
import { Colors } from "../../constants/colors";
import { User } from "../../types/user";
import Balance from "./Balance";
import Info from "./Info";
import Orders from "./Orders";

interface Props {
  user: User;
}

const ProfileAside = (props: Props) => {
  const { user } = props;
  console.log(
    "🚀 ~ file: ProfileAside.tsx ~ line 23 ~ ProfileAside ~ user",
    user
  );
  const [selectedNavigation, setSelectedNavigation] = useState("info");

  const listItems = [
    { name: "info", icon: <InfoOutlined sx={{ fontSize: 20 }} /> },
    { name: "orders", icon: <ListAltOutlined sx={{ fontSize: 20 }} /> },
    { name: "balance", icon: <AttachMoneyOutlined sx={{ fontSize: 20 }} /> },
    { name: "settings", icon: <SettingsOutlined sx={{ fontSize: 20 }} /> },
  ];

  const getSelectedComponent = () => {
    switch (selectedNavigation) {
      case "info":
        return (
          <Info
            firstName={user?.firstName}
            lastName={user?.lastName}
            email={user?.email}
            phone={user?.phone}
            createdAt={user?.createdAt.toString()}
          />
        );

      case "orders":
        return <Orders orders={user?.Order} />;

      case "balance":
        return <Balance balance={user?.balance} />;
      default:
        break;
    }
  };

  return (
    <Container>
      <Aside>
        <PersonalInformation>
          <Avatar sx={{ width: 48, height: 48 }}>M</Avatar>
          <Name>
            <span className="title">{`${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`}</span>
            <span className="description">Your personal account</span>
          </Name>
        </PersonalInformation>
        <List>
          {listItems.map((item) => (
            <ListItem
              key={item.name}
              onClick={() => setSelectedNavigation(item.name)}
              selected={item.name === selectedNavigation}
            >
              {item.icon}
              {item.name}
            </ListItem>
          ))}
        </List>
      </Aside>
      <Data>{getSelectedComponent()}</Data>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Aside = styled.div`
  width: 260px;

  @media screen and (max-width: 768px) {
    width: 100%;
    flex: 1;
  }
`;

const Data = styled.div`
  width: 100%;
`;

const PersonalInformation = styled.div`
  width: 260px;
  display: flex;
  align-items: center;
  gap: 7px;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  & .title {
    font-size: 16px;
    font-weight: 600;
  }
  & .description {
    font-size: 12px;
    font-weight: 500;
  }
`;

const List = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const ListItem = styled.div<{ selected: boolean }>`
  cursor: pointer;
  width: 100%;
  background-color: ${(props: { selected: boolean }) =>
    props.selected && Colors.selected};
  margin-bottom: 5px;
  border-radius: 8px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export default ProfileAside;
