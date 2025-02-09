import { PersonAdd } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";

export const UserCard = ({ profile, name, onClick }) => {
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
        <Avatar src={profile} alt=""/>

        <div>
          <span style={{ color: "#02142E", fontSize: "14px" }}>{name}</span>
        </div>
      </div>

    </div>
  );
};
