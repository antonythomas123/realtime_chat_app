import React from "react";
import styles from "./styles.module.css";
import { Grid2 } from "@mui/material";
import { UserCard } from "./UserCard";

function UserList() {
  return (
    <Grid2 container sx={{ flex: 1 }}>
      <Grid2 item size={4} sx={{flex: 1}}>
        <UserCard />
      </Grid2>
    </Grid2>
  );
}

export default UserList;
