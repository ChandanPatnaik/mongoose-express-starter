import express, { Application, NextFunction, Request, Response } from "express";
import { readdirSync } from "fs";
import http from "http";
import mongoose from "mongoose";
import path from "path";
import { configs } from "../configs";

class App {
  public app: Application;
  public server: http.Server;

  // Constructor initializes Express app and HTTP server.
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
  }

  // Method to start the server and initialize necessary components.
  public listen(appInt: { port: number }) {
    this.app.listen(appInt.port, (): void => {
      const middleware = readdirSync(path.join(__dirname, "../middlewares"));

      // Connect to MongoDB.
      this.connectDb();

      // Log incoming requests.
      this.printRequests();

      // Load top and bottom middlewares.
      this.middleware(middleware, "top.");
      this.routes();
      this.middleware(middleware, "bottom.");

      console.log(`App listening on port ${appInt.port}`);
    });
  }

  // Private method to load middlewares dynamically based on type.
  private middleware(middleware: string[], type: "bottom." | "top.") {
    middleware.forEach((middle) => {
      if (middle.includes(type)) {
        import(
          path.join(__dirname + "/server/../../" + "/middlewares/" + middle)
        ).then((middleReader) => {
          new middleReader.default(this.app);
        });
      }
    });
  }

  // Private method to load routes dynamically.
  private routes() {
    const subRoutes = readdirSync(path.join(__dirname, "../routes"));
    subRoutes.forEach((file: string): void => {
      if (file.includes(".routes.")) {
        import(path.join(__dirname + "../../" + "/routes/" + file)).then(
          (route) => {
            const rootPath = `${configs.API_VERSION}/${
              new route.default().path
            }`;
            console.log(rootPath);
            this.app.use(rootPath, new route.default().router);
          }
        );
      }
    });
  }

  // Private method to connect to MongoDB using Mongoose.
  private connectDb() {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(configs.DATABASE_URL)
      .then(() => console.log("MongoDB connected 👀👀"))
      .catch((err) => console.log("MongoDB connection error:", err));
  }

  // Private method to log incoming requests in a tabular format.
  private printRequests() {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      console.table({
        METHOD: req.method,
        PATH: req.path,
        ip: req.ip,
        BROWSER: req.headers["user-agent"] || "Unknown Browser",
        TIME: new Date().toISOString(),
      });
      next();
    });
  }
}

export default App;
