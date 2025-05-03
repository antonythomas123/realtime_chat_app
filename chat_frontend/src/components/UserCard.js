import { Avatar } from "@mui/material";
import React, { useContext } from "react";
import { store } from "../providers/AuthProvider";

export const UserCard = ({ profile, name, user, onUserSelect }) => {
  const { onlineUsers } = useContext(store);

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
      onClick={() => onUserSelect(user)}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ position: "relative" }}>
          <Avatar src={profile} alt="" />
          {onlineUsers?.includes(user?._id) && (
            <div
              style={{
                position: "absolute",
                background: "#0BDA51",
                width: "10px",
                height: "10px",
                borderRadius: "100px",
                bottom: 0,
                right: 2,
              }}
            ></div>
          )}
        </div>

        <div>
          <span style={{ color: "#02142E", fontSize: "12px" }}>{name}</span>
        </div>
      </div>
    </div>
  );
};
