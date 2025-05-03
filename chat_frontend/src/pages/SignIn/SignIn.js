import React, { useContext, useState } from "react";
import { Card, Grid2, Link, Typography } from "@mui/material";
import { CustomButton, CustomTextField } from "../../components";
import {
  RemoveRedEyeOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import { styles } from "./SignIn.styles";
import { useNavigate } from "react-router-dom";
import { login } from "../../services.js/auth.services";
import { store } from "../../providers/AuthProvider";
import { LandingCover, LandingGif } from "../../assets";
import { io } from "socket.io-client";

function SignIn() {
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn, socket, setSocket, setOnlineUsers } = useContext(store);

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

  const handleSignIn = async () => {
    if (!credentials?.username || !credentials?.password) {
      setErrors({
        username: !credentials?.username ? "Username is required" : "",
        password: !credentials?.password ? "Password is required" : "",
      });
      return;
    }

    try {
      const response = await login(credentials);

      if (response?.userId && response?.token) {
        setIsLoggedIn(true);
        localStorage.setItem("token", response?.token);
        localStorage.setItem("userId", response?.userId);

        const socket = io("http://localhost:3001", {
          query: {
            userId: response?.userId
          }
        });

        socket.on("getOnlineUsers", (usersIds) => {
          setOnlineUsers(usersIds)
        });

        socket.connect();
        setSocket(socket);

        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error, "er");
    }
  };

  return (
    <Grid2 container sx={{ display: "flex", gap: "24px" }}>
      <Grid2 item lg={12}>
        <img src={LandingGif} alt="" />
      </Grid2>

      <Grid2
        item
        lg={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid2 container elevation={1} sx={styles.mainContainer}>
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
            <CustomButton
              buttonText={"Sign in"}
              onClick={() => handleSignIn()}
            />

            <Link style={styles.dontHave} onClick={() => navigate("/sign-up")}>
              Don't have an account ? Create one.
            </Link>

            <Link sx={styles.dontHave}>Forgot Password</Link>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

export default SignIn;
