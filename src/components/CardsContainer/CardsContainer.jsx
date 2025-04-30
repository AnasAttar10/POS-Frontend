import React, { useContext } from "react";
import Cardui from "../Cardui/Cardui";
import { ContainerContext } from "../Containerr/Container";
import { Box, Grid } from "@mui/material";
const CardsContainer = ({ filterdProducts }) => {
  const { targetItems } = useContext(ContainerContext);
  const displayProducts = () => {
    return targetItems?.map((p, index) => (
      <Cardui key={p._id} product={p} index={index} />
    ));
  };
  return (
    <Grid lg={12} item container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          flexWrap: "wrap",
        }}
      >
        {displayProducts()}
      </Box>
    </Grid>
  );
};

export default CardsContainer;
