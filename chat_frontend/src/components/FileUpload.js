import { AttachFile } from "@mui/icons-material";
import React, { useRef } from "react";

export const FileUpload = ({ ref, handleFileClick, handleFileChange }) => {
  return (
    <div style={styles.fileUploadContainer} onClick={handleFileClick}>
      <div style={styles.fileInside}>
        <AttachFile />
        <span>Add profile picture </span>
      </div>

      <input
        type="file"
        style={{ display: "none" }}
        ref={ref}
        onChange={handleFileChange}
      />
    </div>
  );
};

const styles = {
  fileUploadContainer: {
    background: "#F0F1FF",
    borderRadius: "8px",
    width: "100%",
    height: "80px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    cursor: "pointer",
  },
  fileInside: {
    color: "#02142E",

    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
};
