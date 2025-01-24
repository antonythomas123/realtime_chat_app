import React from "react";
import { InputAdornment, TextField } from "@mui/material";

export const CustomTextField = ({
  label,
  value,
  onChange,
  type,
  endIcon,
  endIconClick,
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      type={type}
      variant="filled"
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
            border: "1px solid #E6E7EA",
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
