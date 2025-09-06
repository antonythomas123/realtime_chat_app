import React, { useEffect, useContext, useState, useRef } from "react";
import { SendOutlined } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { ChatWallpaper } from "../assets";
import { getAllMessages, sendMessage } from "../services.js/dashboard.services";
import { store } from "../providers/AuthProvider";
import "./styles.css";

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
            @{username}
          </span>
        </div>
      </div>
    </header>
  );
};

const ChatInput = ({ message, setMessage, handleMessageSend }) => {
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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

        <IconButton onClick={handleMessageSend}>
          <SendOutlined
            sx={{ color: "#0B69F4", height: "25px", width: "25px" }}
          />
        </IconButton>
      </div>
    </footer>
  );
};

function ChatSection({ selectedUser }) {
  const { socket } = useContext(store);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messageEndRef = useRef(null);

  function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  const handleMessageSend = async () => {
    try {
      const response = await sendMessage(selectedUser?._id, message);
      setMessage("");
      setMessages((prev) => [...prev, response?.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      const response = await getAllMessages(selectedUser?._id);
      setMessages(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages();

      console.log({ socket });
      socket.on("newMessage", (newMessage) => {
        console.log({ newMessage });
        if (newMessage?.sender !== selectedUser?._id) return;
        setMessages((prev) => [...prev, newMessage]);
      });
    }

    return () => {
      socket.off("newMessage");
    };
  }, [selectedUser, socket]);

  useEffect(() => {
    if (messageEndRef.current && messages)
      messageEndRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "80vh" }}>
      <ChatHeader
        username={selectedUser?.username}
        fname={selectedUser?.fname}
        lname={selectedUser?.lname}
        profileImg={selectedUser?.profileImg}
      />

      {/* <div
        style={{
          height: "90%",
          background: `url(${ChatWallpaper})`,
          backgroundColor: "#efeae2",
          flexGrow: 1,
          overflowY: "auto",
        }}
      >
        {messages?.map((message) => {
          return (
            <div
              key={message?._id}
              className={`chat ${
                message?.sender === localStorage.getItem("userId")
                  ? "chat-end"
                  : "chat-start"
              }`}
              ref={messageEndRef}
            >
              <div style={{ color: "#111111" }}>{message?.message}</div>
            </div>
          );
        })}
      </div> */}

      <div className="chat-container">
        {messages.map((message) => (
          <div
            key={message?._id}
            className={`chat ${
              message.sender === localStorage.getItem("userId")
                ? "chat-end"
                : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-header">
              <time>{formatMessageTime(message?.createdAt)}</time>
            </div>
            <div className="chat-bubble">
              {message?.image && (
                <img
                  src={message?.image}
                  alt="Attachment"
                  className="chat-image"
                />
              )}
              {message?.message && <p style={{color: '#111'}}>{message?.message}</p>}
            </div>
          </div>
        ))}
      </div>

      <ChatInput
        message={message}
        setMessage={setMessage}
        handleMessageSend={handleMessageSend}
      />
    </div>
  );
}

export default ChatSection;
