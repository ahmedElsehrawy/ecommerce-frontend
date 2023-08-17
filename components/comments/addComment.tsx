import { useState } from "react";
//@ts-ignore
import styled from "styled-components";
import { Avatar, Button, Rating, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_COMMENT,
  CREATE_RATING,
  GET_COMMENTS,
  GET_PRODUCT,
  GET_PRODUCTS,
  ME,
} from "../../apollo/queiries";
import SingleComment from "./SingleComment";

type Props = {
  productId: number;
  // comments: any;
};

const AddComment = (props: Props) => {
  // const { comments } = props;
  // const [comm, setComm] = useState<[any]>(comments);
  const { productId } = props;
  const [value, setValue] = useState<string>("");
  const { data } = useQuery(ME);

  const [createRating] = useMutation(CREATE_RATING);

  const { data: comments, loading: commentsLoading } = useQuery(GET_COMMENTS, {
    variables: {
      where: {
        productId: +productId,
      },
    },
  });
  console.log(
    "🚀 ~ file: addComment.tsx:37 ~ AddComment ~ comments:",
    comments
  );

  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    variables: {
      input: {
        commentOwnerId: data?.user?.id,
        commentText: value,
        productId,
      },
    },

    // update: (cache, { data }) => {
    //   const oldProduct: any = cache.readQuery({
    //     query: GET_PRODUCT,
    //     variables: { where: { id: productId } },
    //   });

    //   const oldComments = oldProduct.product.Comment;
    //   console.log(
    //     "🚀 ~ file: addComment.tsx:35 ~ AddComment ~ oldComments:",
    //     oldComments
    //   );

    //   const newProduct = {
    //     ...oldProduct,
    //     Comment: [...oldComments, data.createComment],
    //   };
    //   console.log(
    //     "🚀 ~ file: addComment.tsx:41 ~ AddComment ~ newProduct:",
    //     newProduct
    //   );

    //   //@ts-ignore
    //   setComm([...oldComments, data.createComment]);
    // },

    refetchQueries: [
      {
        query: GET_COMMENTS,
        variables: {
          where: {
            productId: +productId,
          },
        },
      },
    ],
  });

  return (
    <Container>
      <CommetnsContainer>
        <h2>Comments</h2>
        {comments &&
          comments?.getComments.map((comment: any) => (
            <SingleComment key={comment?.id} ind={comment?.id} data={comment} />
          ))}
      </CommetnsContainer>
      <TextField
        multiline
        rows={4}
        variant="filled"
        style={{
          width: 360,
        }}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value);
        }}
      />
      <Rating
        name="simple-controlled"
        defaultValue={0}
        onChange={(event, newValue) => {
          if (newValue != null) {
            createRating({
              variables: {
                input: {
                  productId,
                  ratingValue: newValue,
                  userId: data?.user?.id,
                },
              },
            });
          }
        }}
      />
      <Button
        style={{ width: 260 }}
        variant="outlined"
        onClick={() => {
          createComment();
          setValue("");
        }}
        disabled={loading}
      >
        Add a Revirw
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 22px;
`;

const CommetnsContainer = styled.div`
  margin-top: 48px;
`;
export default AddComment;
