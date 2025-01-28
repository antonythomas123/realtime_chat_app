export const styles = {
  mainContainer: {
    width: { xs: "300px", lg: "500px" },
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  title: {
    color: "#02142E",
    fontWeight: 600,
    fontSize: "20px",
    textAlign: "start",
  },
  fieldContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    marginTop: "16px",
    display: "flex",
    gap: "12px",
    flexDirection: "column",
  },
  haveAccount: {
    color: "#0B69F4",
    cursor: "pointer",
    textDecoration: "none",
  },

  uploadedImageContainer: {
    position: "relative",
    width: "60px",
    height: "60px",
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "100px",
  },
  closeIcon: {
    position: "absolute",
    top: "5px",
    right: "5px",
    background: "rgba(0, 0, 0, 0.5)",
    color: "white",
    borderRadius: "50%",
    cursor: "pointer",
  },
};
