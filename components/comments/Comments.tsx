import React from "react";
import SingleComment from "./SingleComment";

//@ts-ignore
import styled from "styled-components";
import { Typography } from "@mui/material";

type Props = { comments: any };

const Comments = (props: Props) => {
  const { comments } = props;

  return (
    <CommetnsContainer>
      <h2>Comments</h2>
      {comments.map((comment: any) => (
        <SingleComment key={comment?.id} ind={comment?.id} data={comment} />
      ))}
    </CommetnsContainer>
  );
};

const CommetnsContainer = styled.div`
  margin-top: 48px;
`;

export default Comments;
