import { PersonAddAlt1Outlined, PersonOutlined } from "@mui/icons-material";
import { Avatar, Card, Grid2, IconButton, Typography } from "@mui/material";
import React from "react";
import { CustomSkeleton } from "./CustomSkeleton";

function AddFriendCard({ username, fname, lname, avatar, loading, status }) {
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
        {loading ? (
          <CustomSkeleton
            variant={"rounded"}
            height={"60px"}
            width={"60px"}
            borderRadius={"100%"}
          />
        ) : (
          <Avatar sx={{ height: "60px", width: "60px" }} src={avatar} alt="" />
        )}

        {loading ? (
          <CustomSkeleton
            variant={"rectangular"}
            height={"16px"}
            width={"100%"}
            borderRadius={"4px"}
          />
        ) : (
          <Typography>
            {fname} {lname}
          </Typography>
        )}

        {loading ? (
          <CustomSkeleton
            variant={"rectangular"}
            height={"16px"}
            width={"100%"}
            borderRadius={"4px"}
          />
        ) : (
          <Typography sx={{ color: "#5B6675", fontSize: "12px" }}>
            @ {username}
          </Typography>
        )}
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
          {(status === "not_friends" || status === "rejected") && (
            <IconButton>
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
