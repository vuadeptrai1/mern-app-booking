import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

async function connectMongodb() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    console.log("Connecting successfully");
  } catch (error) {
    console.log("having error...");
  }
}

connectMongodb();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req, res) => {
  res.json({ message: "Hello" });
});

app.listen(7000, () => {
  console.log("Sever running on local host 7000");
});
