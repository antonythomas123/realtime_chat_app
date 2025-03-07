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
