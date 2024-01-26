import { Application, NextFunction, Request, Response } from "express";
import { NotFound } from "http-errors";

interface IError extends Error {
  status?: number;
  meta?: { cause?: string; target?: string };
  code?: string;
  response?: {
    status?: number;
    data: {
      message?: string;
    };
  };
}

export default class BottomMiddleware {
  constructor(app: Application) {
    app.use(this.routeNotFoundErrorHandler);
    app.use(this.fromRouteErrorHandler);
  }
  public routeNotFoundErrorHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    next(new NotFound("No route found, Please check your urls."));
  }

  public fromRouteErrorHandler(
    err: IError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log(err, "error");
    let message = err?.message || "Something went wrong!";
    let status = err?.status || 500;
    res.status(status).json({ success: false, error: { message } });
  }
}
