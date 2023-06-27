import { Avatar, Typography } from "@mui/material";
import React from "react";
//@ts-ignore
import styled from "styled-components";

type Props = {
  ind: number;
  data: any;
};

const SingleComment = (props: Props) => {
  const { data } = props;

  return (
    <Comment ind={data?.id}>
      <Name>{data?.user?.firstName}</Name>
      <AvatarAndComment>
        <Avatar />
        <Typography>{data?.commentText}</Typography>
      </AvatarAndComment>
    </Comment>
  );
};

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
  background-color: ${(props: any) =>
    props.ind % 2 != 0 ? "#f4f4f4" : "#fff"};
  padding: 8px;
  border-radius: 4px;
`;

const Name = styled.div`
  color: blue;
  font-size: 14px;
`;
const AvatarAndComment = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export default SingleComment;
