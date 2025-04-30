import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { ChevronRight, Visibility, VisibilityOff } from "@mui/icons-material";
import Field from "../../components/Field/Field";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { signIn } from "../../redux/authSlice";
const Login = () => {
  const { isAdmin, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      dispatch(signIn(values));
      console.log(error);
      setTimeout(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo?.isAdmin) {
          navigate("/");
        } else if (userInfo?._id) {
          navigate("/pos");
        }
      }, 2000);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <Field
          name="userName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userName}
        />
        <ErrorMessage
          isTouched={formik.touched.userName}
          errors={formik.errors.userName}
        />
      </div>
      <div>
        <Field
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <ErrorMessage
          isTouched={formik.touched.email}
          errors={formik.errors.email}
        />
      </div>
      <div>
        <FormControl
          position="start"
          fullWidth
          variant="outlined"
          sx={{ p: 1, height: 60 }}
        >
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            name={"password"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <ErrorMessage
          isTouched={formik.touched.password}
          errors={formik.errors.password}
        />
      </div>
      <div
        style={{ margin: "15px", display: "flex", justifyContent: "center" }}
      >
        <Button
          variant="contained"
          sx={{ margin: "auto" }}
          type="submit"
          endIcon={<ChevronRight />}
        >
          SignIn
        </Button>
      </div>
    </form>
  );
};

export default Login;
