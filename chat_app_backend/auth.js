//To protect the routes from unauthenticated users

import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];

    const decodedToken = await jwt.verify(token, "RANDOM_KEY");

    const user = await decodedToken;

    req.user = user;

    next()
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

export default auth;
