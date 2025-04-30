import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import Field from "../Field/Field";
import Select from "../Select/Select";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SaveIcon from "@mui/icons-material/Save";
import {
  insertNewProduct,
  updateProduct,
  uploadProductPicture,
} from "../../redux/productSlice";
import { retriveCategories } from "../../redux/categorySlice";
import { useSelector } from "react-redux";
import { retriveUnits } from "../../redux/unitSlice";

const AddProduct = ({ isUpdateForm, itemToUpdate, setShowModal, dispatch }) => {
  const { categories } = useSelector((state) => state.category);
  const { units } = useSelector((state) => state.unit);
  const [image, setImage] = useState(
    itemToUpdate && isUpdateForm ? itemToUpdate.image : null
  );
  const [isChangedImage, setIsChangedImage] = useState(false);

  const categoryNames = categories.map((c) => c.name);
  const categoryIds = categories.map((c) => c._id);
  const unitNames = units.map((c) => c.name);
  const unitIds = units.map((u) => u._id);
  const formik = useFormik({
    initialValues: {
      name: itemToUpdate && isUpdateForm ? itemToUpdate.name : "",
      code: itemToUpdate && isUpdateForm ? itemToUpdate.code : "",
      price: itemToUpdate && isUpdateForm ? itemToUpdate.price : "",
      category: itemToUpdate && isUpdateForm ? itemToUpdate.category._id : "",
      image: itemToUpdate && isUpdateForm ? itemToUpdate.image : "",
      unitOfMeasure:
        itemToUpdate && isUpdateForm ? itemToUpdate.unitOfMeasure._id : "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      code: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      category: Yup.string().oneOf(categoryIds).required("Required"),
      unitOfMeasure: Yup.string().oneOf(unitIds).required("Required"),
      price: Yup.number().required("Required"),
      image: Yup.string()
        .max(150, "Must be 150 characters or less")
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      const productPicture = values.image;
      if (isUpdateForm) {
        const id = itemToUpdate._id;
        if (isChangedImage) {
          values.image = "Q";
          dispatch(updateProduct({ id, updatedProduct: values }));
          await dispatch(uploadProductPicture({ productPicture }));
        } else {
          dispatch(updateProduct({ id, updatedProduct: values }));
        }
      } else {
        values.image = "Q";
        const result = await dispatch(insertNewProduct(values));
        await dispatch(uploadProductPicture({ productPicture }));
      }
      resetForm();
      setShowModal(false);
    },
  });
  useEffect(() => {
    dispatch(retriveCategories());
    dispatch(retriveUnits());
  }, [dispatch]);
  return (
    <form
      id="addProduct"
      onSubmit={formik.handleSubmit}
      style={{
        padding: "10px",
        width: "100%",
      }}
    >
      <div>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          {isUpdateForm ? "Update " : "Add "} product
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
            name="code"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.code}
          />
          <ErrorMessage
            isTouched={formik.touched.code}
            errors={formik.errors.code}
          />
        </div>
        <div>
          <Field
            name="price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          <ErrorMessage
            isTouched={formik.touched.price}
            errors={formik.errors.price}
          />
        </div>
        <div></div>
        <div>
          <Select
            name="category"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            values={formik.values.category}
            options={categoryNames}
            optionValues={categoryIds}
          />
          <ErrorMessage
            isTouched={formik.touched.category}
            errors={formik.errors.category}
          />
        </div>

        <div>
          <Select
            name="unitOfMeasure"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            values={formik.values.unitOfMeasure}
            options={unitNames}
            optionValues={unitIds}
          />
          <ErrorMessage
            isTouched={formik.touched.unitOfMeasure}
            errors={formik.errors.unitOfMeasure}
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
        type="submit"
        sx={{ m: 1 }}
        endIcon={<SaveIcon />}
      >
        save
      </Button>
    </form>
  );
};

export default AddProduct;
