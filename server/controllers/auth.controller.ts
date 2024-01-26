import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services";

export default class AuthController {
  /**
   * Handles user registration.
   * @param req - Express Request object.
   * @param res - Express Response object.
   * @param next - Express NextFunction for error handling.
   */
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      // Call the register method from the AuthService to handle registration.
      await new AuthService().register(req.body);

      // Respond with a success message if registration is successful.
      res.json({
        success: true,
        message: "Account created successfully",
      });
    } catch (error) {
      // Pass any caught errors to the Express error handling middleware.
      next(error);
    }
  }

  /**
   * Handles user login.
   * @param req - Express Request object.
   * @param res - Express Response object.
   * @param next - Express NextFunction for error handling.
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // Call the login method from the AuthService to handle user login.
      const { accessToken, user } = await new AuthService().login(
        req.body.email,
        req.body.password
      );

      // Respond with a success message and user data if login is successful.
      res.json({
        success: true,
        message: "Login successfully",
        data: {
          user,
          accessToken,
        },
      });
    } catch (error) {
      // Pass any caught errors to the Express error handling middleware.
      next(error);
    }
  }
}
