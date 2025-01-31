import React, { useRef } from "react";
import { ChatSection, Navbar, Sidebar } from "../../components";
import { Grid2 } from "@mui/material";

function Dashboard() {
  const fileRef = useRef(null);

  const handleFileClick = () => {
    if (fileRef.current) fileRef.current.click();
  };

  const handleFileChange = (e) => {};

  return (
    <Grid2 container>
      <Grid2 item size={12}>
        <Navbar />
      </Grid2>

      <Grid2
        item
        size={12}
        sx={{
          // height: "100vh",
          display: "flex",
        }}
      >
        <Grid2 container size={12} sx={{ display: "flex", overflow: "hidden", padding: '12px' }}>
          <Grid2
            item
            size={4}
            sx={{
              height: "100%",
            }}
          >
            <Sidebar />
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


