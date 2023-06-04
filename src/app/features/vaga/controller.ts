import { Request, Response } from "express";
import { handleControllerError } from "../../shared/exceptions";
import { VagaRepository } from "./repository";
import { CreateVagaUsecase } from "./usecases/createVagaUsecase";
import { validateCreateVaga } from "./validators";
import { UnauthorizedError } from "../../shared/exceptions/unauthorizedError";
import { ForbiddenError } from "../../shared/exceptions/forbiddenError";
import { User } from "../../models/user";

export const listVagasController = async (req: Request, res: Response) => {
  try {
    const repository = new VagaRepository();
    const allVagas = await repository.listAllVagas();
    return res.status(200).send(allVagas);
  } catch (error) {
    handleControllerError(error, res);
  }
}

export const createVagaController = async (req: Request, res: Response) => {
  try {
    const { authenticatedUser } = req.body;
    if (!(authenticatedUser instanceof User)) throw new UnauthorizedError('Usuário não autenticado');

    const vagaToCreate = validateCreateVaga(req.body);

    const vagaRepository = new VagaRepository();
    const createVagaUsecase = new CreateVagaUsecase(vagaRepository);
    const createdVaga = await createVagaUsecase.execute(vagaToCreate, authenticatedUser);

    return res.status(201).send(createdVaga);
  } catch (error) {
    handleControllerError(error, res);
  }
}
