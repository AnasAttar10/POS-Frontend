import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import LazyLoadImagee from "../LazyLoadImage/LazyLoadImage";
const CartItem = ({
  product,
  increseQuantity,
  decreseQuantity,
  removeProduct,
}) => {
  return (
    <Card
      sx={{
        my: 1,
        mx: "auto",
        textAlign: "center",
        maxWidth: "90%",
        position: "relative",
      }}
    >
      <IconButton
        onClick={() => removeProduct(product._id)}
        sx={{ p: 0, position: "absolute", top: "5px", right: "5px" }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="p" sx={{ m: 1 }}>
        {product.product.name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <LazyLoadImagee
          alt={product.product.name}
          height="60"
          width="60"
          effect="blur"
          src={product.product.image}
        />

        <CardContent>
          <Typography variant="h5">${product.product.price}</Typography>
        </CardContent>
        <div>
          <IconButton
            disabled={product.quantity === 1}
            onClick={() => decreseQuantity(product._id, product.quantity)}
          >
            <IndeterminateCheckBoxIcon color="primary" />
          </IconButton>
          <Typography variant="span" sx={{ m: 1 }}>
            {product.quantity}
          </Typography>
          <IconButton
            onClick={() => increseQuantity(product._id, product.quantity)}
          >
            <AddBoxIcon color="primary" />
          </IconButton>
        </div>
      </Box>
    </Card>
  );
};

export default CartItem;
