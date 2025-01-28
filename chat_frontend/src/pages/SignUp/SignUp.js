import { Card, Grid2, Link, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { CustomButton, CustomTextField, FileUpload } from "../../components";
import {
  AttachFile,
  Close,
  RemoveRedEyeOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { styles } from "./SignUp.styles";
import { register } from "../../services.js/auth.services";
import { LandingGif } from "../../assets";

function SignUp() {
  const navigate = useNavigate();

  const fileRef = useRef(null);

  const [credentials, setCredentials] = useState({
    username: "",
    fname: "",
    lname: "",
    password: "",
    confirmPass: "",
    image: "",
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

  const handleFileClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setCredentials((prev) => ({ ...prev, image: e.target.result }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setCredentials((prev) => ({ ...prev, image: "" }));
    if (fileRef.current) {
      fileRef.current.value = "";
    }
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

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(credentials);
  return (
    <Grid2 container>
      <Grid2 item lg={12}>
        <img src={LandingGif} alt="" />
      </Grid2>

      <Grid2
        item
        lg={12}
        sx={{ display: "flex", alignItems: "center", gap: "24px" }}
      >
        <Grid2 container sx={styles.mainContainer}>
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

            {credentials?.image ? (
              <div style={styles.uploadedImageContainer}>
                <img
                  src={credentials?.image}
                  alt="Uploaded"
                  style={styles.uploadedImage}
                />
                <Close
                  style={styles.closeIcon}
                  onClick={handleRemoveFile} 
                />
              </div>
            ) : (
              <FileUpload
                ref={fileRef}
                handleFileClick={handleFileClick}
                handleFileChange={handleFileChange}
              />
            )}
          </Grid2>

          <Grid2 item xs={12} sx={styles.buttonContainer}>
            <CustomButton
              buttonText={"Sign up"}
              onClick={() => handleSignUp()}
            />

            <Link style={styles.haveAccount} onClick={() => navigate("/login")}>
              Have an account ? Login.
            </Link>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

export default SignUp;
