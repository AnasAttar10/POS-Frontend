import { Box, Grid } from "@mui/material";
import React from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import RegistryContainer from "../../components/RegistryContainer/RegistryContainer";
import { Link } from "react-router-dom";
// import "./register.css";

const RegisterPage = () => {
  return (
    <RegistryContainer>
      <RegisterForm />
      <p style={{ margin: "auto" }}>
        if you have an account , <Link to={"/login"}>login</Link>
      </p>
    </RegistryContainer>
  );
};

export default RegisterPage;
