import { SendOutlined } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React from "react";
import { ChatWallpaper } from "../assets";

const ChatHeader = ({ username, fname, lname, profileImg }) => {
  return (
    <header
      style={{
        padding: "12px",
        background: "#E4F0FE",
        boxShadow: "0 1px 3px rgba(11, 20, 26, 0.2)",
      }}
    >
      <div style={{ display: "flex", gap: "12px" }}>
        <Avatar src={profileImg} alt="" />

        <div
          style={{
            display: "flex",
            gap: "4px",
            flexDirection: "column",
            textAlign: "start",
          }}
        >
          <span
            style={{ color: "#02142E", fontSize: "14px", fontWeight: "500" }}
          >
            {fname} {lname}
          </span>
          <span
            style={{ color: "#5B6675", fontWeight: "400", fontSize: "12px" }}
          >
            {username}
          </span>
        </div>
      </div>
    </header>
  );
};

const ChatInput = () => {
  return (
    <footer
      style={{
        borderTop: "1px solid #E6E7EA",
        padding: "12px",
      }}
    >
      <div style={{ width: "100%", display: "flex" }}>
        <input
          type="text"
          placeholder="Type a message"
          style={{
            border: "1px solid #E6E7EA",
            outline: "none",
            padding: "12px",
            fontFamily: "jetbrains",
            width: "100%",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: 2,
          }}
        />

        <IconButton>
          <SendOutlined
            sx={{ color: "#0B69F4", height: "25px", width: "25px" }}
          />
        </IconButton>
      </div>
    </footer>
  );
};

function ChatSection({ selectedUser }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "80vh" }}>
      <ChatHeader
        username={selectedUser?.username}
        fname={selectedUser?.fname}
        lname={selectedUser?.lname}
        profileImg={selectedUser?.profileImg}
      />

      <div
        style={{
          height: "90%",
          background: `url(${ChatWallpaper})`,
          backgroundColor: "#efeae2",
          flexGrow: 1,
          overflowY: "auto",
        }}
      >
        fdsk
      </div>

      <ChatInput />
    </div>
  );
}

export default ChatSection;
