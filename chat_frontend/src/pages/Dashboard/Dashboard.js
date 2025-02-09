import React, { useRef, useEffect, useState } from "react";
import { ChatSection, Navbar, Sidebar } from "../../components";
import { Grid2 } from "@mui/material";
import { getAllFriends } from "../../services.js/dashboard.services";

function Dashboard() {
  const fileRef = useRef(null);

  const [friends, setFriends] = useState([])

  const handleFileClick = () => {
    if (fileRef.current) fileRef.current.click();
  };

  const handleFileChange = (e) => {};

  const getFriends = async () => {
    try {
      const response = await getAllFriends();
      setFriends(response?.data?.friends)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFriends()
  }, [])
console.log({friends})
  return (
    <Grid2 container>
      <Grid2 item size={12}>
        <Navbar showAddFriend={true} />
      </Grid2>

      <Grid2
        item
        size={12}
        sx={{
          // height: "100vh",
          display: "flex",
        }}
      >
        <Grid2
          container
          size={12}
          sx={{ display: "flex", overflow: "hidden", padding: "12px" }}
        >
          <Grid2
            item
            size={4}
            sx={{
              height: "100%",
            }}
          >
            <Sidebar users={friends} />
          </Grid2>

          <Grid2
            item
            size={8}
            sx={{
              height: "100%",
            }}
          >
            <ChatSection />
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

export default Dashboard;
