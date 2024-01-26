import { Router } from "express";
import { AuthController } from "../controllers";
import { ValidationMiddleware } from "../middlewares";
import { AuthValidation } from "../validations";

export default class AuthRoutes {
  // Express router instance for handling authentication routes.
  public router: Router;

  // Base path for authentication routes.
  public path = "auth";

  // Instances of necessary middleware and controllers.
  private validationMiddleware: ValidationMiddleware;
  private authController: AuthController;
  private authValidation: AuthValidation;

  // Constructor to initialize instances and set up routes.
  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.validationMiddleware = new ValidationMiddleware();
    this.authValidation = new AuthValidation();
    this.routes();
  }

  // Private method to define authentication routes.
  private routes() {
    // Register route with email.
    this.router.post(
      "/register",
      this.authValidation.register(),
      this.validationMiddleware.validate,
      this.authController.register
    );

    // Login route with email.
    this.router.post(
      "/login",
      this.authValidation.login(),
      this.validationMiddleware.validate,
      this.authController.login
    );
  }
}
