import { body } from "express-validator";

export class AuthValidation {
  /**
   * Validation rules for user registration.
   * @returns An array of validation middleware functions.
   */
  register() {
    return [
      // Validate name field.
      body("name")
        .trim()
        .notEmpty()
        .withMessage("Please provide a Name")
        .isLength({ min: 5 })
        .withMessage("Invalid name. Name must be at least 5 characters long"),

      // Validate email field.
      body("email")
        .trim()
        .notEmpty()
        .withMessage("Please provide an Email")
        .isEmail()
        .withMessage("Invalid email. Please provide a valid email"),

      // Validate password field.
      body("password")
        .trim()
        .notEmpty()
        .withMessage("Please provide a password.")
        .bail()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .custom((value) => {
          // Custom validator for password complexity.
          const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
          if (!passwordRegex.test(value)) return false;
          return true;
        })
        .withMessage(
          "Password must contain at least one uppercase letter, one number, and one special character."
        )
        .custom((value, { req }) => {
          // Custom validator to check if password contains part of the email username.
          const emailParts = req.body.email.split("@");
          const username = emailParts[0];
          if (value.includes(username)) return false;
          return true;
        })
        .withMessage(
          "Password should not contain the part of your email before the @ symbol."
        ),

      // Validate optional avatar field if provided.
      body("avatar")
        .optional()
        .exists()
        .isURL()
        .withMessage("Invalid avatar link"),
    ];
  }

  /**
   * Validation rules for user login.
   * @returns An array of validation middleware functions.
   */
  login() {
    return [
      // Validate email field.
      body("email")
        .trim()
        .notEmpty()
        .withMessage("Please provide an Email")
        .isEmail()
        .withMessage("Invalid email. Please provide a valid email"),

      // Validate password field.
      body("password")
        .trim()
        .notEmpty()
        .withMessage("Please provide a password.")
        .bail()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .custom((value) => {
          // Custom validator for password complexity.
          const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
          if (!passwordRegex.test(value)) return false;
          return true;
        })
        .withMessage(
          "Password must contain at least one uppercase letter, one number, and one special character."
        )
        .custom((value, { req }) => {
          // Custom validator to check if password contains part of the email username.
          const emailParts = req.body.email.split("@");
          const username = emailParts[0];
          if (value.includes(username)) return false;
          return true;
        })
        .withMessage(
          "Password should not contain the part of your email before the @ symbol."
        ),
    ];
  }
}
