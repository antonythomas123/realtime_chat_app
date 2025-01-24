import { Card, Grid2, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import { CustomButton, CustomTextField } from "../../components";
import {
  RemoveRedEyeOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";

function SignUp() {
  const [isShowPassword, setIsShowPassword] = useState({
    password: false,
    confirm: false,
  });

  return (
    <Grid2
      container
      component={Card}
      elevation={1}
      sx={{
        width: { xs: "300px", lg: "500px" },
        padding: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "12px",
        borderRadius: "16px",
      }}
    >
      <Typography sx={{ color: "#02142E", fontWeight: 600, fontSize: "20px" }}>
        Sign Up
      </Typography>

      <Grid2
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "100%",
        }}
      >
        <CustomTextField label={"Username or email"} value={""} />

        <CustomTextField
          label={"Password"}
          type={isShowPassword?.password ? "text" : "password"}
          endIcon={
            isShowPassword?.password ? (
              <VisibilityOffOutlined />
            ) : (
              <RemoveRedEyeOutlined />
            )
          }
        />

        <CustomTextField
          label={"Confirm password"}
          type={isShowPassword?.confirm ? "text" : "password"}
          endIcon={
            isShowPassword?.confirm ? (
              <VisibilityOffOutlined />
            ) : (
              <RemoveRedEyeOutlined />
            )
          }
        />
      </Grid2>

      <Grid2
        item
        xs={12}
        sx={{
          width: "100%",
          marginTop: "16px",
          display: "flex",
          gap: "12px",
          flexDirection: "column",
        }}
      >
        <CustomButton buttonText={"Sign up"} />

        <Link
          style={{
            color: "#0B69F4",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          Have an account ? Login.
        </Link>
      </Grid2>
    </Grid2>
  );
}

export default SignUp;
