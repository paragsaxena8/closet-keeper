import {
  createOne,
  deleteOne,
  getAll,
  getById,
  updateOne,
} from "../../services/handler.service";
import { Outfit } from "../model/outfit.model";

export const myOutfits = getAll(Outfit);

export const getOutfit = getById(Outfit);

export const createOutfit = createOne(Outfit);

export const updateOutfit = updateOne(Outfit);

export const deleteOutfit = deleteOne(Outfit);
