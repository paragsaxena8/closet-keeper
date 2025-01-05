import { model, Schema } from "mongoose";

export interface IOutfit extends Document {
  name: string;
  items: Array<string>;
  occasion: string;
  weather: string;
  tags: Array<string>;
  image: string;
  lastWorn: Date;
  createdAt: Date;
  updatedAt: Date;
}

const outfitModel = new Schema(
  {
    name: { type: String, required: true },
    items: { type: Array, required: true },
    occasion: { type: String, required: true },
    weather: { type: String, required: true },
    tags: { type: Array, required: false },
    image: { type: String, required: false },
    lastWorn: { type: Date, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Outfit = model<IOutfit>("Outfit", outfitModel);
