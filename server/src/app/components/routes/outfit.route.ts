import { Router } from "express";
import { protectedR } from "../controllers/auth.controller";
import {
  createOutfit,
  deleteOutfit,
  myOutfits,
  updateOutfit,
} from "../controllers/outfit.controller";

export const OutfitRoutes = Router();

OutfitRoutes.route("/").all(protectedR).get(myOutfits).post(createOutfit);

OutfitRoutes.route("/:id")
  .all(protectedR)
  .patch(updateOutfit)
  .delete(deleteOutfit);
