import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllUsers = async (payload) => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/get-all-users`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllNonFriends = async () => {
  const userId = localStorage.getItem("userId") || "679a48c7a473ee8514526800";
  try {
    const response = await axios.get(
      `${BASE_URL}/dashboard/non-friends/${userId}`,
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
