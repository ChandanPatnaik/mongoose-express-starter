import jwt from "jsonwebtoken";
import { configs } from "../configs";
import { JwtPayload } from "../types/core";

export class JwtHelper {
  // The secret string used for generating and verifying access tokens.
  private accessSecretString = configs.JWT_SECRET;

  /**
   * Generates an access token with the given audience.
   * @param audience - The audience for the access token.
   * @returns A Promise that resolves to the generated access token.
   */
  public accessTokenGenerator(audience: string): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      // Payload with standard and additional information for the token.
      const payload = {
        name: "Your trust.",
        iss: "starter.com",
      };

      // Sign the payload to create the access token.
      jwt.sign(
        payload,
        this.accessSecretString,
        {
          audience,
        },
        (err, token) => {
          if (err) return reject(err);
          return resolve(token);
        }
      );
    });
  }

  /**
   * Verifies the provided access token and returns its payload.
   * @param token - The access token to be verified.
   * @returns A Promise that resolves to the decoded payload or an error object.
   */
  public accessTokenVerify(token: string): Promise<JwtPayload> | void {
    return jwt.verify(token, this.accessSecretString, (err, payload) => {
      if (err) {
        // Return an object with an 'error' property if verification fails.
        return {
          error: err,
        };
      }

      // Return the decoded payload if verification is successful.
      return payload as JwtPayload;
    });
  }
}
