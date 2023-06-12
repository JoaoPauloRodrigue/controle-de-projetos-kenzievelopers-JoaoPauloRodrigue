import { Request, Response } from "express";
import {
  IProjects,
  TProjectsRequest,
  TProjectsUpdated,
} from "../../interfaces";
import {
  createProjectsService,
  retrieveProjectsService,
  updateProjectsService,
} from "../../services";

const createProjectsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: TProjectsRequest = req.body;

  const newProjects: IProjects = await createProjectsService(payload);

  return res.status(201).json(newProjects);
};

const retrieveProjectsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const projectId: number = parseInt(req.params.id);

  const dataProjects = await retrieveProjectsService(projectId);

  return res.status(200).json(dataProjects);
};

const updateProjectsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const projectId: number = parseInt(req.params.id);
  const payloadUpdate: Partial<TProjectsUpdated> = req.body;

  const updatedDeveloper: IProjects = await updateProjectsService(
    projectId,
    payloadUpdate
  );

  return res.status(200).json(updatedDeveloper);
};

export {
  createProjectsController,
  retrieveProjectsController,
  updateProjectsController,
};
