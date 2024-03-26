import { Document, Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  verified: boolean;
}

interface IUserMethods {}

interface UserModel extends Model<IUser, {}, IUserMethods> {
  isEmailTaken(email: string): Promise<Boolean>;
}

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
// UserSchema.plugin(toJSON);

// Change _id into id, remove __v
UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

UserSchema.static(
  "isEmailTaken",
  async function isEmailTaken(email: string, excludeUserId) {
    const user = await this.findOne({
      email,
    });
    return !!user;
  }
);

export const User = model<IUser, UserModel>("User", UserSchema);
