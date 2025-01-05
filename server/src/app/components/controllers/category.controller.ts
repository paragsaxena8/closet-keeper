import {
  createOne,
  deleteOne,
  getAll,
  getById,
  updateOne,
} from "../../services/handler.service";
import { Category } from "../model/category.model";

export const getAllCategories = getAll(Category);
export const getCategory = getById(Category);

export const createCategory = createOne(Category);

export const updateCategory = updateOne(Category);
export const deleteCategory = deleteOne(Category);
