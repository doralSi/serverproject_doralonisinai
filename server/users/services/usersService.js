import _ from "lodash";
import { generateToken } from "../../auth/providers/jwtProvider.js";
import { comparePassword, generatePassword } from "../helpers/bcrypt.js";
import { createUser, getUserByEmail } from "./usersDataService.js";

export const createNewUser = async (user) => {
  try {
    let hashPass = generatePassword(user.password);
    user.password = hashPass;
    const newUser = await createUser(user);
    const DTOuser = _.pick(newUser, ["email", "name", "_id"]);
    return DTOuser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    // בדוק אם המשתמש חסום
    if (user.blockExpires && user.blockExpires > new Date()) {
      throw new Error("User blocked for 24 hours due to failed logins");
    }
    const passwordMatch = comparePassword(password, user?.password);
    if (passwordMatch) {
      // איפוס ניסיונות כושלים
      user.failedLoginAttempts = 0;
      user.blockExpires = null;
      await user.save();
      return generateToken(user);
    } else {
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      // אם הגיע ל-3 ניסיונות, חסום ל-24 שעות
      if (user.failedLoginAttempts >= 3) {
        user.blockExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await user.save();
        throw new Error("User blocked for 24 hours due to failed logins");
      }
      await user.save();
      throw new Error("password incorrect");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
