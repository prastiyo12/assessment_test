import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import  {sendBirthdayGreeting } from "./cron";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Start Cron Job
sendBirthdayGreeting();

app.use("/api", userRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to database ✅");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("Database connection error: ", error));
