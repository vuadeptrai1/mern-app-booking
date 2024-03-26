import { IUser, User } from "./../models/User";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

const createUser = async (userBody: any): Promise<IUser> => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  return User.create(userBody);
};

export { createUser };
