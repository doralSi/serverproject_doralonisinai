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
    console.log("[LOGIN] user from DB:", user);
    if (!user) {
      console.log("[LOGIN] User not found for email:", email);
      throw new Error("User not found");
    }
    // בדוק אם המשתמש חסום
    if (user.blockExpires && user.blockExpires > new Date()) {
      console.log("[LOGIN] User is blocked until:", user.blockExpires);
      throw new Error("User blocked for 24 hours due to failed logins");
    }
    const passwordMatch = comparePassword(password, user?.password);
    console.log("[LOGIN] Password match:", passwordMatch);
    if (passwordMatch) {
      // איפוס ניסיונות כושלים
      user.failedLoginAttempts = 0;
      user.blockExpires = null;
      await user.save();
      console.log("[LOGIN] Login successful for:", email);
      return generateToken(user);
    } else {
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      // אם הגיע ל-3 ניסיונות, חסום ל-24 שעות
      if (user.failedLoginAttempts >= 3) {
        user.blockExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await user.save();
        console.log("[LOGIN] User blocked after 3 failed attempts:", email);
        throw new Error("User blocked for 24 hours due to failed logins");
      }
      await user.save();
      console.log("[LOGIN] Password incorrect for:", email);
      throw new Error("password incorrect");
    }
  } catch (error) {
    console.log("[LOGIN] Error:", error.message);
    throw new Error(error.message);
  }
};
