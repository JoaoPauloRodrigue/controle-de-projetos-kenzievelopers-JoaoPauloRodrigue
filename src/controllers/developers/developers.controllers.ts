import { Request, Response } from "express";
import {
  IDevelopers,
  IDevelopersInfos,
  TDevelopersInfosRequest,
  TDevelopersRequest,
} from "../../interfaces";
import {
  createDeveloperInfosService,
  createDeveloperService,
  deleteDeveloperService,
  retrieveDeveloperService,
  updateDeveloperService,
} from "../../services";

const createDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: TDevelopersRequest = req.body;

  const newDeveloper: IDevelopers = await createDeveloperService(payload);

  return res.status(201).json(newDeveloper);
};

const retrieveDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = res.locals.developerId.id;

  const dataDeveloperInfos = await retrieveDeveloperService(id);

  return res.status(200).json(dataDeveloperInfos);
};

const updateDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developerId = res.locals.developerId.id;
  const payloadUpdate: Partial<TDevelopersRequest> = req.body;

  const updatedDeveloper: IDevelopers = await updateDeveloperService(
    developerId,
    payloadUpdate
  );

  return res.status(200).json(updatedDeveloper);
};

const deleteDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developerId = res.locals.developerId.id;

  await deleteDeveloperService(developerId);

  return res.status(204).send();
};

const createDeveloperInfosController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developerId = res.locals.developerId.id;
  const payload: TDevelopersInfosRequest = req.body;

  const newDeveloperInfos: IDevelopersInfos = await createDeveloperInfosService(
    developerId,
    payload
  );

  return res.status(201).json(newDeveloperInfos);
};
export {
  createDeveloperController,
  retrieveDeveloperController,
  updateDeveloperController,
  deleteDeveloperController,
  createDeveloperInfosController,
};
