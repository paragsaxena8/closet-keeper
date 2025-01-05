import { protectedR } from "./../controllers/auth.controller";
import { Router } from "express";
import {
  addWardrobeItem,
  deleteWardrobeItem,
  openWardrobe,
  updateWardrobeItem,
} from "../controllers/wardrobe.controller";

export const WardrobeRoute = Router();

WardrobeRoute.route("/")
  .all(protectedR)
  .get(openWardrobe)
  .post(addWardrobeItem);

WardrobeRoute.route("/:id")
  .all(protectedR)
  .patch(updateWardrobeItem)
  .delete(deleteWardrobeItem);
