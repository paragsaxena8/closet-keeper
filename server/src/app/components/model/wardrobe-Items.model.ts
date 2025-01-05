import { model, Schema } from "mongoose";

export interface IWardrobeItem {
  name: string;
  type: string;
  category: string;
  color: string;
  size: string;
  brand: string;
  material: string;
  tags: Array<string>;
  image: string;
  lastWorn: Date;
  createdAt: Date;
  updatedAt: Date;
}

const wardrobeItemSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    brand: { type: String, required: true },
    material: { type: String, required: true },
    tags: { type: Array, required: false },
    image: { type: String, required: false },
    lastWorn: { type: Date, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const WardrobeItem = model<IWardrobeItem>("WardrobeItem", wardrobeItemSchema);
