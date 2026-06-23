//import express from "express";
//import cors from "cors";
//import cookieParser from "cookie-parser";

//import { logger } from "./middleware/logger.js";
//import { notFoundHandler } from "./middleware/notFoundHandler.js";
//import { errorHandler } from "./middleware/errorHandler.js";
//import { errors } from "celebrate";

//import authRouter from "./routes/authRoutes.js";
//import recipesRouter from "./routes/recipesRoutes.js";


//const app = express();

//app.use(cors({
  //origin: "*",
  //methods: ["GET", "POST", "PATCH", "DELETE"],
//}));

//app.use(express.json());
//app.use(cookieParser());
//app.use(logger);

// routes
//app.use("/auth", authRouter);
//app.use("/recipes", recipesRouter);

// celebrate errors
//app.use(errors());

//app.get("/", (req, res) => {
  //res.json({ message: "API working" });
//});

//app.use(notFoundHandler);
//app.use(errorHandler);

//export default app;

