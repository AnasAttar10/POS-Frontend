import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import SaveIcon from "@mui/icons-material/Save";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Field from "../Field/Field";
import {
  insertNewCategory,
  uploadCategoryPicture,
} from "../../redux/categorySlice";
import { updateCategory } from "../../redux/categorySlice";
const AddCategories = ({
  isUpdateForm,
  itemToUpdate,
  dispatch,
  setShowModal,
}) => {
  const [image, setImage] = useState(
    itemToUpdate && isUpdateForm ? itemToUpdate.image : null
  );
  const [isChangedImage, setIsChangedImage] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: itemToUpdate && isUpdateForm ? itemToUpdate.name : "",
      image: itemToUpdate && isUpdateForm ? itemToUpdate.image : "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      image: Yup.string()
        .max(200, "Must be 200 characters or less")
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      const categoryPicture = values.image;
      if (isUpdateForm) {
        const id = itemToUpdate._id;
        if (isChangedImage) {
          values.image = "Q";
          dispatch(updateCategory({ id, newCategory: values }));
          await dispatch(uploadCategoryPicture({ categoryPicture }));
        } else {
          dispatch(updateCategory({ id, newCategory: values }));
        }
      } else {
        values.image = "Q";
        const result = await dispatch(insertNewCategory(values));
        await dispatch(uploadCategoryPicture({ categoryPicture }));
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
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "100%" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          {isUpdateForm ? "Update " : "Add "} category
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
      </div>
      <div>
        <img
          style={{
            width: "100%",
            height: "400px",
            objectFit: "contain",
            boxShadow: 3,
            border: "1px solid #8888",
          }}
          src={image === null ? require("../../assets/empty.jpg") : image}
          alt="empty_image"
        />
        <label> Upload File</label>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(URL.createObjectURL(e.target.files[0]));
            }
            setIsChangedImage(true);
            formik.setFieldValue("image", e.currentTarget.files[0]);
          }}
        />
        <ErrorMessage
          isTouched={formik.touched.image}
          errors={formik.errors.image}
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

export default AddCategories;
