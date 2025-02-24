import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { dbConnect } from "./db/dbConnect.js";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import friendRequestRoutes from './routes/friend-requests.routes.js'
import auth from "./auth.js";

const app = express();

dotenv.config();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 204,
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

const PORT = 3001;

dbConnect();

app.use("/api/auth", authRoutes);

app.get("/protected", auth, (req, res) => {
  console.log("I am protected");
});

app.use("/dashboard", dashboardRoutes);
app.use("/friend-request", friendRequestRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
