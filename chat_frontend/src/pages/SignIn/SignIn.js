import React, { useState } from "react";
import { Card, Grid2, Link, Typography } from "@mui/material";
import { CustomButton, CustomTextField } from "../../components";
import {
  RemoveRedEyeOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";

function SignIn() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <Grid2
      container
      component={Card}
      elevation={1}
      sx={{
        // height: { xs: "300px", lg: "400px" },
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
        Sign In
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
        <CustomTextField label={"Username or Email"} />
        <CustomTextField
          label={"Password"}
          type={isShowPassword ? "text" : "password"}
          endIcon={
            isShowPassword ? (
              <VisibilityOffOutlined />
            ) : (
              <RemoveRedEyeOutlined />
            )
          }
          endIconClick={() => setIsShowPassword(!isShowPassword)}
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
        <CustomButton buttonText={"Sign in"} />

        <Link
          style={{
            color: "#0B69F4",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          Don't have an account ? Create one.
        </Link>

        <Link
          sx={{ textDecoration: "none", cursor: "pointer", color: "#0B69F4" }}
        >
          Forgot Password
        </Link>
      </Grid2>
    </Grid2>
  );
}

export default SignIn;
