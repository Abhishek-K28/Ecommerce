import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
); // Disable minimize to keep empty objects

userSchema.methods.getjwt = async function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.isValidatePassword = async function (userEnterPassword) {
  const isPassword = await bcrypt.compare(userEnterPassword, this.password);
  return isPassword;
};

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
