//server.js

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';

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
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:4000',
  process.env.FRONTEND_DOMAIN,
].filter(Boolean);

app.use(logger);
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', authRouter);
app.use(userRouter);
app.use(recipesRouter);
app.use(ingredientsRouter);
app.use(categoriesRouter);

app.get('/api-docs-test', (req, res) => {
  res.json({ ok: true });
});

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
