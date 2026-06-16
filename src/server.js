import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';

import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import recipesRouter from './routes/recipesRoutes.js';
import ingredientsRouter from './routes/ingredientsRoutes.js';
import categoriesRouter from './routes/categoriesRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(authRouter);
app.use(userRouter);
app.use(recipesRouter);
app.use(ingredientsRouter);
app.use(categoriesRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
