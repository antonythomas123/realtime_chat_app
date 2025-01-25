import React, { useState } from "react";
import { Card, Grid2, Link, Typography } from "@mui/material";
import { CustomButton, CustomTextField } from "../../components";
import {
  RemoveRedEyeOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import { styles } from "./SignIn.styles";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = () => {
    if (!credentials?.username || !credentials?.password) {
      setErrors({
        username: !credentials?.username ? "Username is required" : "",
        password: !credentials?.password ? "Password is required" : "",
      });
      return;
    }
  };

  return (
    <Grid2 container component={Card} elevation={1} sx={styles.mainContainer}>
      <Typography sx={styles.title}>Sign In</Typography>
      <Grid2 item xs={12} sx={styles.fieldContainer}>
        <CustomTextField
          label={"Username or Email"}
          name={"username"}
          value={credentials?.username}
          onChange={handleChange}
          error={!!errors?.username}
          helperText={errors?.username}
        />
        <CustomTextField
          label={"Password"}
          name={"password"}
          value={credentials?.password}
          onChange={handleChange}
          type={isShowPassword ? "text" : "password"}
          endIcon={
            isShowPassword ? (
              <VisibilityOffOutlined />
            ) : (
              <RemoveRedEyeOutlined />
            )
          }
          error={!!errors?.password}
          endIconClick={() => setIsShowPassword(!isShowPassword)}
          helperText={errors?.password}
        />
      </Grid2>

      <Grid2 item xs={12} sx={styles.buttonContainer}>
        <CustomButton buttonText={"Sign in"} onClick={() => handleSignIn()} />

        <Link style={styles.dontHave} onClick={() => navigate("/sign-up")}>
          Don't have an account ? Create one.
        </Link>

        <Link sx={styles.dontHave}>Forgot Password</Link>
      </Grid2>
    </Grid2>
  );
}

export default SignIn;
