import { PersonAdd } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";

export const UserCard = ({ profile, name, onClick, isFriend = false }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px",
        borderBottom: "1px solid #E6E7EA",
        cursor: "pointer",
      }}
      onClick={() => onClick()}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Avatar src={profile} />

        <div>
          <span style={{ color: "#02142E", fontSize: "14px" }}>{name}</span>
        </div>
      </div>

      {!isFriend && (
        <PersonAdd
          sx={{
            color: "#ECECEC",
            height: "30px",
            width: "30px",
            cursor: "pointer",
          }}
        />
      )}
    </div>
  );
};
