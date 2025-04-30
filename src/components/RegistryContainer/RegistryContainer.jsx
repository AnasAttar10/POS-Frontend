import { Grid } from "@mui/material";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import "./register.css";

const RegistryContainer = ({ children }) => {
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Grid
        container
        sx={{
          display: "flex",
          width: "90%",
          height: "100vh",
          alignItems: "center",
          margin: "0 auto",
          border: "1px solid #8888",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          position: "relative",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            width: "100%",
            height: "100%",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          className="parent-box-form"
        >
          <div
            className="img-container"
            style={{
              width: "50%",
              margin: "auto",
              height: "200px",
              border: "1px solid #8888 ",
            }}
          >
            <img
              src="https://img.freepik.com/free-vector/cute-shopping-cart-logo_23-2148453859.jpg"
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          {children}
        </Grid>

        <Grid item xs={0} md={6} className="imageContainer">
          <div className="bg-shopping-list"></div>
        </Grid>
      </Grid>
    </>
  );
};

export default RegistryContainer;
