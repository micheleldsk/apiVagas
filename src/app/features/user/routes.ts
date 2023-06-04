import { Router } from "express";
import { createUserController, findUserController, listUsersController } from "./controller";
import { authenticatedMiddleware } from "../../shared/middlewares/authenticatedMiddleware";

const userRouter = Router();

userRouter.use('/', authenticatedMiddleware);

userRouter.post('/', createUserController);

userRouter.get('/', listUsersController);

userRouter.get('/:uuid', findUserController);

export { userRouter };
