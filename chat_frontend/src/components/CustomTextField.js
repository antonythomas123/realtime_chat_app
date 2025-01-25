import React from "react";
import { InputAdornment, TextField } from "@mui/material";

export const CustomTextField = ({
  label,
  name,
  value,
  onChange,
  type,
  endIcon,
  endIconClick,
  helperText,
  error,
}) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      type={type}
      helperText={helperText}
      variant="filled"
      error={error}
      slotProps={{
        input: {
          disableUnderline: true,
          endAdornment: endIcon ? (
            <InputAdornment
              onClick={endIconClick}
              sx={{ color: "#0B69F4", cursor: "pointer" }}
            >
              {endIcon}
            </InputAdornment>
          ) : null,
          sx: {
            background: "#FFFFFF",
            border: error ? "1px solid #d32f2f" : "1px solid #E6E7EA",
            borderRadius: "4px",
          },
        },
      }}
      sx={{
        "& .MuiInputLabel-root": {
          color: "#5B6677",
          fontSize: "14px",
          fontWeight: 500,
        },
      }}
    />
  );
};
