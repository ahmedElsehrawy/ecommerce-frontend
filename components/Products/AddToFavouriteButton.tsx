import { useMutation } from "@apollo/client";
import { Delete, FavoriteBorderOutlined } from "@mui/icons-material";
import { Alert, Button, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AuthVar } from "../../apollo/initialState";
import {
  ADD_AS_FAVOURITE,
  GET_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
} from "../../apollo/queiries";
import { Colors } from "../../constants/colors";
import { Product } from "../../types/product";

interface Props {
  productId: number;
}

const AddToFavouriteButton = (props: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [alreadyExist, setAlreadyExist] = useState<boolean>(false);
  const [removedSuccessfully, setRemovedSuccessfully] =
    useState<boolean>(false);
  const { productId } = props;
  const auth = AuthVar();

  const [addToFavourites, { data, loading: createLoading }] =
    useMutation(ADD_AS_FAVOURITE);
  const [removeFromFavourites, { data: removeFromFavouritesData, loading }] =
    useMutation(REMOVE_FROM_FAVOURITES);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleRemovedSuccessfully = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setRemovedSuccessfully(false);
  };
  const handleAleardExistClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlreadyExist(false);
  };
  return (
    <>
      <Button
        sx={{ color: Colors.secondary, borderColor: Colors.secondary }}
        variant="outlined"
        disabled={loading || createLoading}
        size="medium"
        onClick={() => {
          if (router?.asPath.includes("/favourites")) {
            removeFromFavourites({
              variables: {
                where: {
                  productId: productId,
                },
              },

              update: (cache, { data }) => {
                setRemovedSuccessfully(true);
                setTimeout(() => {
                  const favourites: any = cache.readQuery({
                    query: GET_FAVOURITES,
                  });

                  let newItems = favourites.getFavourites.filter(
                    (item: any) =>
                      item?.product?.id !==
                      data?.removeFromFavourites?.product.id
                  );

                  cache.writeQuery({
                    query: GET_FAVOURITES,
                    data: {
                      getFavourites: newItems,
                    },
                  });
                }, 1000);
              },
            });
          } else {
            addToFavourites({
              variables: {
                input: {
                  productId: productId,
                  userId: auth?.id,
                },
              },
              update: (cache, { data }) => {
                const favourites: any = cache.readQuery({
                  query: GET_FAVOURITES,
                });

                let newFavourites;

                newFavourites = {
                  getFavourites: [
                    ...favourites.getFavourites,
                    data?.AddAsFavourite,
                  ],
                };
                cache.writeQuery({
                  query: GET_FAVOURITES,
                  data: newFavourites,
                });
              },
              onError: () => {
                setAlreadyExist(true);
              },
              onCompleted: () => {
                setOpen(true);
              },
            });
          }
        }}
      >
        {router?.asPath.includes("/favourites") ? (
          <Delete color="error" />
        ) : (
          <FavoriteBorderOutlined />
        )}
      </Button>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Product Added To Favourites
        </Alert>
      </Snackbar>
      <Snackbar
        open={alreadyExist}
        autoHideDuration={1000}
        onClose={handleAleardExistClose}
      >
        <Alert
          onClose={handleAleardExistClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Product Already Exist in Favourites
        </Alert>
      </Snackbar>
      <Snackbar
        open={removedSuccessfully}
        autoHideDuration={1000}
        onClose={handleRemovedSuccessfully}
      >
        <Alert
          onClose={handleRemovedSuccessfully}
          severity="error"
          sx={{ width: "100%" }}
        >
          Product Removed successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddToFavouriteButton;
