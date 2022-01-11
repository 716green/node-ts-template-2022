import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import router from "./api/v1";
import favicon from "serve-favicon";

//* Env Var Setup
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "../.env") });
const { TEST, PORT } = process.env;
const port: number = (PORT as undefined) || 3000;
console.log(!!TEST ? TEST : "⛔️ ENVIRONMENT VARIABLES NOT LOADED");

const app = express();

//* Static
const publicPath = path.resolve(__dirname + "/../public");
app.use(express.static(publicPath));
app.use(favicon(path.join(publicPath, "favicon.ico")));

//* Middleware
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//* Routes
//? All non-admin routes should come from /api/v1
app.use("/api/v1", router);

//* Root Handler
app.get("/", (_req: Request, res: Response) => {
  res.sendFile(publicPath + "/index.html", () => console.log("Root Handler"));
});

//* 404 - Catch All
app.get("*", (_req: Request, res: Response) => {
  res.sendFile(publicPath + "/404.html", () =>
    console.error("404 Page Not Found")
  );
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
