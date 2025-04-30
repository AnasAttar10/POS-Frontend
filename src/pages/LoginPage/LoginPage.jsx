import React from "react";
import Login from "../../components/LoginForm/Login";
import RegistryContainer from "../../components/RegistryContainer/RegistryContainer";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <RegistryContainer>
      <Login />
      <p style={{ margin: "auto" }}>
        if you don't have an account , <Link to={"/register"}>Register</Link>
      </p>
    </RegistryContainer>
  );
};

export default LoginPage;
