import express, { Express, } from 'express';
import { registerRoutes } from './httpRoutes.config';

export const createServer = () => {
  const app: Express = express();

  app.use(express.json());

  registerRoutes(app);

  return app;
}
