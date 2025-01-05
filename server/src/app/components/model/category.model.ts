import { model, Schema } from "mongoose";

export interface ICategory {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", categorySchema);
