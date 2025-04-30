import { Card, Typography } from "@mui/material";
import React from "react";
import LazyLoadImagee from "../LazyLoadImage/LazyLoadImage";
import { useTheme } from "@emotion/react";

const CategoriesContainer = ({ category, selectTargetCategory }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        textAlign: "center",
        maxWidth: 120,
        m: 2,
        "&:hover": { bgcolor: theme.palette.activeLink.main, color: "white" },
      }}
      onClick={() => selectTargetCategory(category._id)}
    >
      <Typography variant="h5">{category.name}</Typography>

      <LazyLoadImagee
        alt={category.name}
        height="100"
        width="120"
        effect="blur"
        src={category.image}
      />
    </Card>
  );
};

export default CategoriesContainer;
