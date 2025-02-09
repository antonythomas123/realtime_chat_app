import { Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  AddFriendCard,
  CustomSearch,
  CustomSkeleton,
  Navbar,
} from "../../components";
import {
  getAllNonFriends,
} from "../../services.js/add-friend.services";

function AddFriend() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const filteredUsers =
    users?.filter(
      (x) =>
        x?.fname?.toLowerCase().includes(search?.toLowerCase()) ||
        x?.lname?.toLowerCase().includes(search?.toLowerCase()) ||
        x?.username?.toLowerCase().includes(search?.toLowerCase())
    ) || [];

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllNonFriends();

      setUsers(response?.data?.users);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Grid2 container>
      <Grid2 item size={12}>
        <Navbar showAddFriend={false} showDashboard={true} />
      </Grid2>

      <Grid2 item size={12} sx={{ padding: "16px", textAlign: "start" }}>
        <Typography
          sx={{
            color: "#02142E",
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "12px",
          }}
        >
          Add friends
        </Typography>

        <CustomSearch
          placeholder={"Search for a user"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Grid2
          item
          size={12}
          sx={{ mt: "12px", display: "flex", gap: "12px", flexWrap: "wrap" }}
        >
          {loading && (
            <CustomSkeleton
              variant={"rectangular"}
              height={"200px"}
              width={"150px"}
              borderRadius={"8px"}
            />
          )}
          {!loading &&
            filteredUsers?.map((user) => {
              return (
                <AddFriendCard
                  fname={user?.fname}
                  lname={user?.lname}
                  username={user?.username}
                  avatar={user?.profileImg}
                  loading={loading}
                  status={user?.status}
                />
              );
            })}

          {filteredUsers?.length === 0 && (
            <div>
              <span
                style={{ color: "#5B6675", fontSize: "12px", fontWeight: 400 }}
              >
                No users found!
              </span>
            </div>
          )}
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

export default AddFriend;
