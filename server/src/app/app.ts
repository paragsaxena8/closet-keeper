import { connect } from "mongoose";
import express from "express";
import "dotenv/config";
import { WardrobeRoute } from "./components/routes/wardrobe.route";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use('/api/wardrobe', WardrobeRoute);

const mongoUri = process.env.DB_SERVER_HOST;
if (!mongoUri) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

try {
  connect(mongoUri).then(() => {
    console.log("Connected to MongoDB");
  });
} catch (error) {
  console.error("Error connecting to MongoDB", error);
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
