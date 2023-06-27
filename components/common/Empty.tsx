import Image from "next/image";
import React from "react";

//@ts-ignore
import styled from "styled-components";
import { Typography } from "@mui/material";
interface Props {
  imageSrc: string;
  text: string;
}

const Empty = (props: Props) => {
  const { imageSrc, text } = props;
  return (
    <Content>
      <Image
        src={imageSrc}
        alt="empty image"
        width={500}
        height={500}
        layout="responsive"
      />
      <Typography sx={{ textAlign: "center" }}>{text}</Typography>
    </Content>
  );
};

const Content = styled.div`
  margin: 0 auto;
  width: 300px;
  height: 200px;
`;

export default Empty;
