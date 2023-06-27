import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
//@ts-ignore
import styled from "styled-components";
import { useRouter } from "next/router";
import { Colors } from "../../../constants/colors";

type Props = {};

const Search = (props: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState(
    router.query.search ? router.query.search : ""
  );

  return (
    <Container>
      <TextField
        sx={{ color: Colors.white }}
        placeholder="search"
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
            <InputAdornment
              position="start"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                if (search) {
                  router.push(`/products?search=${search}`);
                }
              }}
            >
              <SearchOutlinedIcon sx={{ color: Colors.white }} />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);

  & .css-1ptx2yq-MuiInputBase-root-MuiInput-root {
    color: ${Colors.white};
  }

  & .css-1ptx2yq-MuiInputBase-root-MuiInput-root:before {
    border-bottom: 1px solid ${Colors.grayText};
    border-bottom: 0;
  }

  &
    .css-1ptx2yq-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before {
    border-bottom: 1px solid ${Colors.lightWhite};
    border-bottom: 0;
  }

  & .css-1ptx2yq-MuiInputBase-root-MuiInput-root:after {
    border-bottom: 2px solid ${Colors.white};
    border-bottom: 0;
  }
  @media screen and (max-width: 768px) {
    width: 150px;
    font-size: 10px;
  }
`;

export default Search;
