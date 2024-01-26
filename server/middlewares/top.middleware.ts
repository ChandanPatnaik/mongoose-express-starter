import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";

export default class TopMiddleware {
  constructor(app: Application) {
    app
      .use(cors())
      .use(express.json({ limit: "50mb" }))
      .use(express.urlencoded({ extended: true }))
      .use(fileUpload())
      .use(this.cacheClear);
  }
  private cacheClear(req: Request, res: Response, next: NextFunction) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", "0");
    next();
  }
}
