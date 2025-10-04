import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  username: string;
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  preferences: object;
  createdAt: Date;
  updatedAt: Date;
  passwordHash?: string;
  googleId?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
    confirmPassword: { type: String, required: false },
    preferences: { type: Object, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    passwordHash: { type: String, required: false },
    googleId: { type: String, required: false },
  },
  { timestamps: true }
);

userSchema.pre("validate", async function (next) {
  if (this.password && this.isModified("password")) {
    const salt = await bcrypt.genSalt(10); // Adjust salt rounds as needed
    this.passwordHash = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  // If no password hash (e.g., Google auth user), cannot compare
  if (!this.passwordHash) {
    return false;
  }
  // Compare the provided password with the hashed password
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};
export const User = model<IUser>("Users", userSchema);
