import { NextFunction, Request, Response } from "express";
import passport from "../../utils/passport-auth.config";
import { User } from "../model/users.model";
import { catchAsync } from "../../utils/catchAsync";

export const loginMiddleware = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", {
    authInfo: true,
    keepSessionInfo: true,
  });
  next();
};

export const login = (req: Request, res: Response, next: any) => {
  passport.authenticate('local', (err: any, user: any, info: any) => {

    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log("User logged in:", user.username);
      //Send the user data here.
      const userData = {
        username: user.username,
        email: user.email,
        name: user.name,
        id: user._id,
      };
      return res.json({ message: 'Login successful', data: userData });
    });
  })(req, res, next);
};


export const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, name, password, confirmPassword } = req.body;

      // check the input
      if (!username || !password || !email || !name || !confirmPassword) {
        return res.status(400).json({
          message: "Please provide all required fields",
        })
      }

      // check the password length and password matches with confirm password
      if (password.length < 6) {
        return res.status(400).json({
          message: "Password should be at least 6 characters long",
        })
      }

      if(password !== confirmPassword) {
        return res.status(400).json({
          message: "Password and confirm password do not match",
        })
      }

      // check if the user already exists
      const user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({
          message: "User already exists",
        })
      }

      const newUser = new User({ username, email, name, password });

      await newUser.save();

      res.status(201).json({
        message: "User created successfully",
        data: {
          username: newUser.username,
          email: newUser.email,
          name: newUser.name,
        },
      })
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
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
        res.clearCookie("clothify.sid"); // Clear the session cookie
        res.status(200).send("Logged out successfully");
      });
    });
  } else {
    return res.status(401).send("You are not logged in");
  }
};
