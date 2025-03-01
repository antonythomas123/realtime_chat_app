import React from "react";
import { UserCard } from "./UserCard";
import { CustomSearch } from "./CustomSearch";

function Sidebar({ users, setSelectedUser }) {
  return (
    <div
      style={{
        borderRight: "1px solid #E6E7EA",
        height: "100%",
        boxShadow: "0 1px 3px rgba(11, 20, 26, 0.2)",
      }}
    >
      <div style={{ padding: "12px", borderBottom: "1px solid #E6E7EA" }}>
        <CustomSearch placeholder={"Search for a user"} />
      </div>

      {users?.length > 0 ? (
        <div>
          {users?.map((user) => {
            return (
              <UserCard
                user={user}
                profile={user?.profileImg}
                name={user?.username}
                onUserSelect={(user) => setSelectedUser(user)}
              />
            );
          })}
        </div>
      ) : (
        <div style={{ padding: "12px", textAlign: "start" }}>
          <span style={{ color: "#5B6675", fontSize: "12px", fontWeight: 400 }}>
            You dont have any friends added. Please add a friend to start
            chatting!
          </span>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
