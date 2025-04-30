import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Field from "../Field/Field";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddCart = ({ addCart }) => {
  const formik = useFormik({
    initialValues: {
      cartName: "",
    },
    validationSchema: Yup.object({
      cartName: Yup.string()
        .required("Required")
        .max(100, "should be less than 100 "),
    }),
    onSubmit: (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      addCart(values);

      resetForm();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Field
          name="cartName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.cartName}
        />

        <Button
          variant="contained"
          endIcon={<AddIcon />}
          sx={{ m: "8px" }}
          type="submit"
        >
          Add
        </Button>
      </Box>

      <ErrorMessage
        isTouched={formik.touched.cartName}
        errors={formik.errors.cartName}
      />
    </form>
  );
};

export default AddCart;
