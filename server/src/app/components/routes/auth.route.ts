import { loginMiddleware } from './../controllers/auth.controller';
import { Router } from "express";
import {
  login,
  registerUser,
  googleAuth,
  googleAuthCallback,
  logout
} from "../controllers/auth.controller";

const AuthRoute = Router();

AuthRoute.post("/login", loginMiddleware, login);
AuthRoute.post("/signup", registerUser);
AuthRoute.get("/logout", logout);
AuthRoute.get("/auth/google", googleAuth);
AuthRoute.get("/auth/google/callback", googleAuthCallback);

export { AuthRoute };
