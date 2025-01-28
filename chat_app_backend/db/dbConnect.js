import mongoose from "mongoose";


export const dbConnect = async () => {
  mongoose
    .connect(process.env.AUTH_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to the db");
    })
    .catch((error) => {
      console.log("Error connecting db", error);
    });
};

