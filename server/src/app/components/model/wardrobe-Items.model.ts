import { model, Schema } from "mongoose";

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

export const WardrobeItem = model("WardrobeItem", wardrobeItemSchema);
