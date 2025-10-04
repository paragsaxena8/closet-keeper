import { connect } from "mongoose";
import express, { Request, Response } from "express";
import "dotenv/config";
import { WardrobeRoute } from "./components/routes/wardrobe.route";
import passport from "./utils/passport-auth.config";
import session from "express-session";
import cors from "cors";
import { AuthRoute } from "./components/routes/auth.route";
import { OutfitRoutes } from "./components/routes/outfit.route";
import { CategoryRoutes } from "./components/routes/category.route";
import cookieParser from "cookie-parser";
const app = express();

const mongoUri = process.env.DB_SERVER_HOST;
const port = process.env.PORT || 3000;
if (!mongoUri) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

 connect(mongoUri).then(() => {
    console.log("Connected to MongoDB");
  }).catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

// Express middleware setup
app.use(cors({
  origin: "http://localhost:8080",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(
  session({
    name: process.env.session_name as string, // Name of the session cookie
    secret: process.env.session_secret as string, // Keep this secret!
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "lax",
      maxAge: 3600000, // 1 hour in milliseconds
      secure: false,
      httpOnly: true,
      path: "/"
    }, // 1 hour
    genid: () => {
      return Math.random().toString();
    },
    store: new session.MemoryStore(),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send(
    "Hello World" +
    ` ${req.isAuthenticated() ? "Authenticated User" : "Unauthenticated User"
    }`
  );
});
app.use("/auth", AuthRoute);
app.use("/api/wardrobe", WardrobeRoute);
app.use("/api/outfits", OutfitRoutes);
app.use("/api/categories", CategoryRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
