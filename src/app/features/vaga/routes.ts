import { Router } from "express";
import { authenticatedMiddleware } from "../../shared/middlewares/authenticatedMiddleware";
import { createVagaController, listVagasController } from "./controller";
import { isRecrutadorMiddleware } from "../../shared/middlewares/isRecrutadorMiddleware";

const vagaRouter = Router();

vagaRouter.get('/', listVagasController);

vagaRouter.post(
  '/',
  [authenticatedMiddleware, isRecrutadorMiddleware],
  createVagaController,
);

export { vagaRouter };
