import React from "react";
import { UserCard } from "./UserCard";

function Sidebar() {
  return (
    <div
      style={{
        borderRight: "1px solid #E6E7EA",
        height: "100%",
        boxShadow: "0 1px 3px rgba(11, 20, 26, 0.2)",
      }}
    >
      <div style={{ padding: "12px", borderBottom: '1px solid #E6E7EA' }}>
        <input
          type="search"
          placeholder="Search for a user"
          style={{
            height: "40px",
            width: "100%",
            borderRadius: "8px",
            border: "1px solid #E6E7EA",
            padding: "12px",
            fontFamily: "jetbrains",
            outline: "none",
          }}
        />
      </div>

      <div>
        <UserCard />
      </div>
    </div>
  );
}

export default Sidebar;
