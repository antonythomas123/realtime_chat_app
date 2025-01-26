const BASE_URL = process.env.REACT_APP_BASE_URL;

export const register = async (payload) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
};

export const login = async (payload) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
};
