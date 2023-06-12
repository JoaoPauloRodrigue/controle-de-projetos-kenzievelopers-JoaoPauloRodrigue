import { Router } from "express";
import {
  createProjectsController,
  retrieveProjectsController,
  updateProjectsController,
} from "../../controllers";
import {
  ensureIfIdOfDeveloperExistMiddleware,
  ensureIfIdOfProjectExistMiddleware,
} from "../../middlewares";

const projectRouter: Router = Router();

projectRouter.post(
  "",
  ensureIfIdOfDeveloperExistMiddleware,
  createProjectsController
);

projectRouter.get(
  "/:id",
  ensureIfIdOfProjectExistMiddleware,
  retrieveProjectsController
);

projectRouter.patch(
  "/:id",
  ensureIfIdOfProjectExistMiddleware,
  ensureIfIdOfDeveloperExistMiddleware,
  updateProjectsController
);

export default projectRouter;
