import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  username: string;
  name: string;
  email: string;
  password: string;
  preferences: object;
  createdAt: Date;
  updatedAt: Date;
  passwordHash: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: true },
    preferences: { type: Object, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("validate", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10); // Adjust salt rounds as needed
    this.passwordHash = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};
export const User = model<IUser>("Users", userSchema);
