import { loginMiddleware } from './../controllers/auth.controller';
import { Router } from "express";
import {
  login,
  registerUser,
  googleAuth,
  googleAuthCallback,
  googleAuthToken,
  logout,
  protectedR
} from "../controllers/auth.controller";

const AuthRoute = Router();

AuthRoute.post("/login", loginMiddleware, login);
AuthRoute.post("/register", registerUser);
AuthRoute.post("/google/token", googleAuthToken);
AuthRoute.get("/protected", protectedR, (req, res) => res.json({ message: "You are authenticated", user: req.user }));
AuthRoute.get("/logout", logout);
AuthRoute.get("/google", googleAuth);
AuthRoute.get("/google/callback", googleAuthCallback);

export { AuthRoute };
