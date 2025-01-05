import { Router } from "express";
import {
  login,
  registerUser,
  googleAuth,
  googleAuthCallback,
  logout,
  loginMiddleware,
} from "../controllers/auth.controller";
import passport from "passport";

const AuthRoute = Router();

AuthRoute.post("/login",passport.authenticate('local', { failureRedirect: '/' }) ,login);
AuthRoute.post("/signup", registerUser);
AuthRoute.get("/logout", logout);
AuthRoute.get("/auth/google", googleAuth);
AuthRoute.get("/auth/google/callback", googleAuthCallback);

export { AuthRoute };
