import { Router } from "express";
import {
  addWardrobeItem,
  openWardrobe,
} from "../controllers/wardrobe.controller";

export const WardrobeRoute = Router();

WardrobeRoute.route("/").get(openWardrobe).post(addWardrobeItem);
