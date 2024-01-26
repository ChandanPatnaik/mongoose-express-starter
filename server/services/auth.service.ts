import bcrypt from "bcryptjs";
import {
  Conflict,
  Forbidden,
  InternalServerError,
  NotFound,
} from "http-errors";
import { JwtHelper } from "../helpers";
import { UserSchema } from "../schemas";
import { UserType } from "../types/user.type";

export default class AuthService extends JwtHelper {
  /**
   * Handles user registration.
   * @param input - User input for registration.
   * @throws Conflict - Throws Conflict error if the user already exists.
   * @throws InternalServerError - Throws InternalServerError if user creation fails.
   */
  async register(input: UserType) {
    const isUserExist = await UserSchema.findOne({ email: input.email });

    // Check if the user already exists and throw a Conflict error if true.
    if (isUserExist) throw new Conflict("Account already exists");

    // Destructure password from input, hash it, and create a new user.
    const { password, ...rest } = input;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await UserSchema.create({
      ...rest,
      password: hashPassword,
      role: "USER",
    });

    // Throw InternalServerError if user creation fails.
    if (!user) throw new InternalServerError("User creation failed!");
  }

  /**
   * Handles user login.
   * @param email - User email for login.
   * @param password - User password for login.
   * @returns An object containing accessToken and user data.
   * @throws NotFound - Throws NotFound error if the user is not found.
   * @throws Error - Throws an Error if authentication fails.
   * @throws Forbidden - Throws Forbidden error for blocked or unverified accounts.
   */
  async login(email: string, password: string) {
    const isUserExist = await UserSchema.findOne({ email });

    // Throw NotFound error if the user is not found.
    if (!isUserExist) throw new NotFound("User not found");

    // Check if the password is valid using bcrypt.
    const isPasswordValid = await bcrypt.compare(
      password,
      isUserExist.password!
    );

    // Throw an Error if authentication fails.
    if (!isPasswordValid) {
      throw new Error(
        "Authentication failed. Please check your email and password combination."
      );
    }

    // Handle account status and generate an access token.
    if (!isUserExist?.emailVerified) {
      throw new Forbidden(
        "Email Verification Required: Your email is not verified yet. Please verify your email to access your account."
      );
    } else if (isUserExist.isBlocked) {
      throw new Forbidden(
        "Account Blocked: Your account has been temporarily blocked. Please contact support for assistance."
      );
    }

    // Generate access token and update last login timestamp.
    const accessToken = await this.accessTokenGenerator(
      JSON.stringify({ userId: isUserExist.id })
    );
    const user = await UserSchema.findByIdAndUpdate(isUserExist?._id, {
      lastLogin: new Date().toISOString(),
    }).select("-password");

    return { accessToken, user };
  }
}
