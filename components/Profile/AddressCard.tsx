import * as React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  Alert,
} from "@mui/material";
import { Address } from "../../types/address";
import { useMutation } from "@apollo/client";
import { DELETE_ADDRESS, GET_USER_ADDRESSES } from "../../apollo/queiries";
import { useConfirm } from "material-ui-confirm";
import { AuthVar } from "../../apollo/initialState";

type Props = {
  address: Address;
};
const AddressCard = (props: Props) => {
  const confirm = useConfirm();
  const { address } = props;
  const auth = AuthVar();
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);

  const [deleteAddress] = useMutation(DELETE_ADDRESS, {
    variables: {
      where: {
        id: address?.id,
      },
    },
    refetchQueries: [
      {
        query: GET_USER_ADDRESSES,
        variables: {
          where: { userId: auth?.id },
          skip: !auth,
        },
      },
    ],
  });

  const handleClick = () => {
    confirm({ description: "Are you sure you want to delete this!" })
      .then(() => {
        deleteAddress().catch((error) => {
          console.log(error);
          setIsAlertOpen(true);
          setTimeout(() => {
            setIsAlertOpen(false);
          }, 2000);
        });
      })
      .catch(() => {});
  };

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {address?.country}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="warning" size="small" onClick={handleClick}>
            Delete
          </Button>
        </CardActions>
      </Card>
      {isAlertOpen && (
        <Alert severity="error">
          Sorry This Address Is Being Used You Can not Delete
        </Alert>
      )}
    </>
  );
};

export default AddressCard;
