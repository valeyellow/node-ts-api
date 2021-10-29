import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this as UserDocument;
  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

  const hashedPassword = await bcrypt.hashSync(user.password, salt);
  user.password = hashedPassword;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<Boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(user.password, candidatePassword).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
