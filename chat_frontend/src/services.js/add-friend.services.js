import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const userId = localStorage.getItem("userId");

export const getAllUsers = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/friend-request/get-all-users/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const sendFriendRequest = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/friend-request/send-friend-request`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllFriendRequests = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/friend-request/get-all-friend-requests/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const acceptOrRejectRequest = async (payload) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/friend-request/accept-or-reject-request`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};
