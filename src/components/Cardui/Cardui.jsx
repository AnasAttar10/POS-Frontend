import { useTheme } from "@emotion/react";
import { Button, Card, Grid, IconButton, Typography } from "@mui/material";
import "./CardUi.css";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import LazyLoadImagee from "../LazyLoadImage/LazyLoadImage";
import { useDispatch, useSelector } from "react-redux";
import { insertProductToCart } from "../../redux/cartSlice";

const Cardui = ({ product }) => {
  const theme = useTheme();
  const { currentCart, products1 } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const isProductInCart =
    products1 && products1.some((p) => p.product._id === product._id);
  return (
    <Grid>
      <Card
        className="cart"
        sx={{
          textAlign: "center",
          position: "relative",
          maxWidth: 240,
          mx: "auto",
          m: 2,
          "&:hover": { bgcolor: theme.palette.activeLink.main, color: "white" },
        }}
      >
        <Typography variant="h5">{product.name}</Typography>

        <LazyLoadImagee
          alt={product.name}
          height="100"
          width="150"
          effect="blur"
          src={product.image}
        />
        <Typography variant="h6">${product.price}</Typography>
        <div className="overlay">
          <Button
            sx={{ fontSize: "90px", color: "white" }}
            onClick={() => {
              currentCart &&
                dispatch(
                  insertProductToCart({
                    cartId: currentCart,
                    productId: product._id,
                  })
                );
            }}
            disabled={isProductInCart || !currentCart}
          >
            +
          </Button>
        </div>
      </Card>
    </Grid>
  );
};
export default Cardui;
