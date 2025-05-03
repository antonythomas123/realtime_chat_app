import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllFriends = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(
      `${BASE_URL}/dashboard/get-all-friends/${userId}`,
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

export const getAllMessages = async (receiverId) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(
      `${BASE_URL}/messages/get-messages/${receiverId}`,
      {
        headers: {
          "Content-Type": "application/json",
          userId: userId,
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (receiverId, text) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.post(
      `${BASE_URL}/messages/send-message/${receiverId}`,
      { text },
      {
        headers: {
          "Content-Type": "application/json",
          userId: userId,
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};
