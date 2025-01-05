import { Router } from "express";
import { protectedR } from "../controllers/auth.controller";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/category.controller";

export const CategoryRoutes = Router();

CategoryRoutes.route("/")
  .all(protectedR)
  .get(getAllCategories)
  .post(createCategory);

CategoryRoutes.route("/:id")
  .all(protectedR)
  .patch(updateCategory)
  .delete(deleteCategory);
