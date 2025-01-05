import { NextFunction, Request, Response } from "express";
import passport from "../../utils/passport-auth.config";
import { User } from "../model/users.model";
import { catchAsync } from "../../utils/catchAsync";

export const loginMiddleware = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", {
    authInfo: true,
    keepSessionInfo: true,
  });
};

export const login = (req: Request, res: Response) => {
  res.send("Login successful");
};

export const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      // Create and save the user (implement your logic here)
      if (!username || !password) {
        return res.status(400).send("Username and password are required");
      }

      const newUser = new User({ username, password });
      await newUser.save();

      res.status(201).send("User created successfully");
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Error creating user");
    }
  }
);

export const protectedR = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("Unauthorized, please login");
  }
};

export const googleAuth = (req: Request, res: Response) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
};

export const googleAuthCallback = (req: Request, res: Response) => {
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/login",
  })(req, res);
};

export const logout = (req: Request, res: Response): any => {
  // check if the user is authenticated
  if (req.isAuthenticated()) {
    req.logout((err: any) => {
      if (err) {
        return res.status(500).send("Failed to log out");
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).send("Failed to destroy session");
        }
        res.clearCookie("connect.sid"); // Clear the session cookie
        res.status(200).send("Logged out successfully");
      });
    });
  } else {
    return res.status(401).send("You are not logged in");
  }
};
