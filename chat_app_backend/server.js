import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { dbConnect } from "./db/dbConnect.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

dotenv.config();

app.use(bodyParser.json());

const PORT = 3001;

dbConnect();

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
