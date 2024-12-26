import { create, getAll } from "../../services/handler.service";
import { WardrobeItem } from "../model/wardrobe-Items.model";

export const openWardrobe = getAll(WardrobeItem);

export const addWardrobeItem = create(WardrobeItem);