import { Card, Grid2, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import { CustomButton, CustomTextField } from "../../components";
import {
  RemoveRedEyeOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { styles } from "./SignUp.styles";
import { register } from "../../services.js/auth.services";

function SignUp() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    fname: "",
    lname: "",
    password: "",
    confirmPass: "",
  });
  const [isShowPassword, setIsShowPassword] = useState({
    password: false,
    confirm: false,
  });
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async () => {
    if (
      !credentials?.username ||
      !credentials?.password ||
      !credentials?.fname ||
      !credentials?.lname ||
      !credentials?.confirmPass
    ) {
      setErrors({
        username: !credentials?.username ? "Username is required" : "",
        fname: !credentials?.fname ? "First name is required" : "",
        lname: !credentials?.lname ? "Last name is required" : "",
        password: !credentials?.password ? "Password is required" : "",
        confirmPass: !credentials?.confirmPass
          ? "Please enter the password again"
          : credentials?.confirmPass !== credentials?.password
          ? "Passwords does not match"
          : "",
      });
      return;
    }

    try {
      const payload = {
        username: credentials?.username,
        password: credentials?.password,
        fname: credentials?.fname,
        lname: credentials?.lname,
      };

      const response = await register(payload);

      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid2 container component={Card} elevation={1} sx={styles.mainContainer}>
      <Typography sx={styles.title}>Sign Up</Typography>

      <Grid2 item xs={12} sx={styles.fieldContainer}>
        <CustomTextField
          label={"Username or email"}
          name={"username"}
          value={credentials?.username}
          onChange={handleChange}
          error={!!errors?.username}
          helperText={errors?.username}
        />

        <CustomTextField
          label={"First name"}
          name={"fname"}
          value={credentials?.fname}
          onChange={handleChange}
          error={!!errors?.fname}
          helperText={errors?.fname}
        />

        <CustomTextField
          label={"Last name"}
          name={"lname"}
          value={credentials?.lname}
          onChange={handleChange}
          error={!!errors?.lname}
          helperText={errors?.lname}
        />

        <CustomTextField
          label={"Password"}
          name={"password"}
          value={credentials?.password}
          onChange={handleChange}
          type={isShowPassword?.password ? "text" : "password"}
          endIcon={
            isShowPassword?.password ? (
              <VisibilityOffOutlined />
            ) : (
              <RemoveRedEyeOutlined />
            )
          }
          endIconClick={() =>
            setIsShowPassword((prev) => ({
              ...prev,
              password: !prev?.password,
            }))
          }
          error={!!errors?.password}
          helperText={errors?.password}
        />

        <CustomTextField
          label={"Confirm password"}
          value={credentials?.confirmPass}
          name={"confirmPass"}
          onChange={handleChange}
          type={isShowPassword?.confirm ? "text" : "password"}
          endIcon={
            isShowPassword?.confirm ? (
              <VisibilityOffOutlined />
            ) : (
              <RemoveRedEyeOutlined />
            )
          }
          endIconClick={() =>
            setIsShowPassword((prev) => ({
              ...prev,
              confirm: !prev?.confirm,
            }))
          }
          error={!!errors?.confirmPass}
          helperText={errors?.confirmPass}
        />
      </Grid2>

      <Grid2 item xs={12} sx={styles.buttonContainer}>
        <CustomButton buttonText={"Sign up"} onClick={() => handleSignUp()} />

        <Link style={styles.haveAccount} onClick={() => navigate("/login")}>
          Have an account ? Login.
        </Link>
      </Grid2>
    </Grid2>
  );
}

export default SignUp;
