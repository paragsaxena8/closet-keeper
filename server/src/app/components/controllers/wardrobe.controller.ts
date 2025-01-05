import {
  createOne,
  deleteOne,
  getAll,
  updateOne,
} from "../../services/handler.service";
import { WardrobeItem } from "../model/wardrobe-Items.model";

export const openWardrobe = getAll(WardrobeItem);

export const addWardrobeItem = createOne(WardrobeItem);

export const updateWardrobeItem = updateOne(WardrobeItem);

export const deleteWardrobeItem = deleteOne(WardrobeItem);
