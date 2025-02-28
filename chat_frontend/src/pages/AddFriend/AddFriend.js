import { Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  AddFriendCard,
  CustomSearch,
  CustomSkeleton,
  Navbar,
} from "../../components";
import {
  acceptOrRejectRequest,
  getAllFriendRequests,
  getAllUsers,
  sendFriendRequest,
} from "../../services.js/add-friend.services";

function AddFriend() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [friendRequests, setFriendRequests] = useState([]);

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
      const response = await getAllUsers();

      setUsers(response?.data?.users);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const getFriendRequests = async () => {
    try {
      const response = await getAllFriendRequests();
      setFriendRequests(response?.data?.receivedRequests);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendFriendRequest = async (friendId) => {
    try {
      setLoading(true);

      const payload = {
        from: localStorage.userId,
        to: friendId,
        status: "pending",
      };
      const response = await sendFriendRequest(payload);

      getFriendRequests();
      getUsers()
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptOrRejectRequest = async (id, status) => {
    try {
      setLoading(true);
      const payload = {
        requestId: id,
        status: status,
      };
      const response = await acceptOrRejectRequest(payload);
      getFriendRequests();
      getUsers()
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
    getFriendRequests();
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
            fontSize: "24px",
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
          sx={{
            margin: "24px 0px 24px 0px",
            borderTop: "1px solid #E6E7EA",
            padding: "12px 0px 12px 0px",
            borderBottom: "1px solid #E6E7EA",
          }}
        >
          <Typography
            sx={{ color: "#02142E", fontSize: "18px", fontWeight: 600 }}
          >
            Friend Requests
          </Typography>

          <Grid2 container>
            {loading && (
              <CustomSkeleton
                variant={"rectangular"}
                height={"200px"}
                width={"150px"}
                borderRadius={"8px"}
              />
            )}

            {!loading && friendRequests?.length === 0 && (
              <div style={{ marginTop: "24px" }}>
                <span
                  style={{
                    color: "#5B6675",
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                >
                  No friend request found!
                </span>
              </div>
            )}

            {!loading &&
              friendRequests?.map((request) => {
                return (
                  <AddFriendCard
                    key={request?._id}
                    friendRequestId={request?._id}
                    fname={request?.from?.fname}
                    lname={request?.from?.lname}
                    username={request?.from?.username}
                    avatar={request?.from?.profileImg}
                    status={request?.status}
                    onAcceptOrReject={handleAcceptOrRejectRequest}
                  />
                );
              })}
          </Grid2>
        </Grid2>

        <Typography
          sx={{ color: "#02142E", fontSize: "18px", fontWeight: 600 }}
        >
          Available users
        </Typography>

        <Grid2
          item
          size={12}
          sx={{
            mt: "12px",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
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
                  key={user?._id}
                  id={user?._id}
                  friendRequestId={user?.friendRequestId}
                  fname={user?.fname}
                  lname={user?.lname}
                  username={user?.username}
                  avatar={user?.profileImg}
                  loading={loading}
                  status={user?.friendRequestStatus}
                  onSendFriendRequest={handleSendFriendRequest}
                  onAcceptOrReject={handleAcceptOrRejectRequest}
                />
              );
            })}

          {!loading && filteredUsers?.length === 0 && (
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
