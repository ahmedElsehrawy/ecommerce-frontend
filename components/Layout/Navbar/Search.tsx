import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
//@ts-ignore
import styled from "styled-components";
import { useRouter } from "next/router";

type Props = {};

const Search = (props: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState(
    router.query.search ? router.query.search : ""
  );

  return (
    <Container>
      <TextField
        placeholder="search products"
        variant="standard"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (search) {
              router.push(`/products?search=${search}`);
            }
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 12px;

  @media screen and (max-width: 1024px) {
    top: 50px;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
    margin-bottom: 20px;
  }
`;

export default Search;
