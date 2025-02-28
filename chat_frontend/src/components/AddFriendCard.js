import { PersonAddAlt1Outlined } from "@mui/icons-material";
import { Avatar, Card, Grid2, IconButton, Typography } from "@mui/material";
import React from "react";

function AddFriendCard({
  id,
  username,
  fname,
  lname,
  avatar,
  loading,
  status,
  onSendFriendRequest,
  onAcceptOrReject,
  friendRequestId,
}) {
  return (
    <Card
      elevation={2}
      sx={{
        minHeight: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "150px",
        flexDirection: "column",
        position: "relative",
        border: "1px solid #E6E7EA",
      }}
    >
      <Grid2
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ height: "60px", width: "60px" }} src={avatar} alt="" />

        <Typography>
          {fname} {lname}
        </Typography>

        <Grid2
          sx={{
            padding: "0px 12px 8px 12px",
            textAlign: "center",
            wordBreak: "break-all",
          }}
        >
          <Typography
            sx={{
              color: "#5B6675",
              fontSize: "12px",
            }}
          >
            @ {username}
          </Typography>
        </Grid2>
      </Grid2>

      {!loading && (
        <Grid2
          item
          size={12}
          sx={{
            borderTop: "1px solid #E6E7EA",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
          }}
        >
          {(!status || status === "rejected") && (
            <IconButton onClick={() => onSendFriendRequest(id)}>
              <PersonAddAlt1Outlined />
            </IconButton>
          )}
          {status === "pending" && (
            <div style={{ display: "flex", gap: "4px", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "50%",
                  padding: "8px",
                  borderRight: "1px solid #E6E7EA",
                  cursor: "pointer",
                }}
                onClick={() => onAcceptOrReject(friendRequestId, "accepted")}
              >
                <span style={{ color: "#0B69F4", fontSize: "12px" }}>
                  Accept
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "50%",
                  padding: "8px",
                  cursor: "pointer",
                }}
                onClick={() => onAcceptOrReject(friendRequestId, "rejected")}
              >
                <span style={{ color: "red", fontSize: "12px" }}>Reject</span>
              </div>
            </div>
          )}
        </Grid2>
      )}
    </Card>
  );
}

export default AddFriendCard;
