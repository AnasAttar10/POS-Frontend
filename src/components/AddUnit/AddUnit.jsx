import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Field from "../Field/Field";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { insertNewUnit, updateUnit } from "../../redux/unitSlice";
const AddUnit = ({ isUpdateForm, itemToUpdate, dispatch, setShowModal }) => {
  const formik = useFormik({
    initialValues: {
      name: itemToUpdate && isUpdateForm ? itemToUpdate.name : "",
      baseUnit: itemToUpdate && isUpdateForm ? itemToUpdate.baseUnit : "",
      conversionFactor:
        itemToUpdate && isUpdateForm ? itemToUpdate.conversionFactor : "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      baseUnit: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      conversionFactor: Yup.number().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      if (isUpdateForm) {
        const id = itemToUpdate._id;
        dispatch(updateUnit({ id, newUnit: values }));
      } else {
        dispatch(insertNewUnit(values));
      }
      resetForm();
      setShowModal(false);
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        padding: "10px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {isUpdateForm ? "Update " : "Add "}unit
      </h2>
      <div>
        <Field
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <ErrorMessage
          isTouched={formik.touched.name}
          errors={formik.errors.name}
        />
      </div>
      <div>
        <Field
          name="baseUnit"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.baseUnit}
        />
        <ErrorMessage
          isTouched={formik.touched.baseUnit}
          errors={formik.errors.baseUnit}
        />
      </div>
      <div>
        <Field
          name="conversionFactor"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.conversionFactor}
          type="text"
        />
        <ErrorMessage
          isTouched={formik.touched.conversionFactor}
          errors={formik.errors.conversionFactor}
        />
      </div>
      <Button
        variant="contained"
        sx={{ m: 1 }}
        type="submit"
        endIcon={<SaveIcon />}
      >
        Save
      </Button>
    </form>
  );
};

export default AddUnit;
