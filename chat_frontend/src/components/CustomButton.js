import { Button } from "@mui/material";

export const CustomButton = ({
  buttonText,
  onClick,
  variant = "contained",
  disabled
}) => {
  return (
    <Button
      fullWidth
      variant={variant}
      disabled={disabled}
      sx={{
        textTransform: "none",
        background: "#0B69F4",
        height: "40px",
        fontSize: "14px",
        fontWeight: 500,
        borderRadius: "8px",
        color: "#FFFFFF",
      }}
      onClick={() => onClick()}
    >
      {buttonText}
    </Button>
  );
};
