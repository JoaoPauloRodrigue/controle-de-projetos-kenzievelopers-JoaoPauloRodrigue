import { Router } from "express";
import {
  createDeveloperController,
  createDeveloperInfosController,
  deleteDeveloperController,
  retrieveDeveloperController,
  updateDeveloperController,
} from "../../controllers";
import {
  ensureIfDeveloperAlreadyHasInfosMiddleware,
  ensureIfEmailExistMiddleware,
  ensureIfIdOfDeveloperExistMiddleware,
  ensureIfPreferredOSIsCorrectMiddleware,
} from "../../middlewares";

const developersRouter: Router = Router();

developersRouter.post(
  "",
  ensureIfEmailExistMiddleware,
  createDeveloperController
);

developersRouter.get(
  "/:id",
  ensureIfIdOfDeveloperExistMiddleware,
  retrieveDeveloperController
);

developersRouter.patch(
  "/:id",
  ensureIfIdOfDeveloperExistMiddleware,
  ensureIfEmailExistMiddleware,
  updateDeveloperController
);

developersRouter.delete(
  "/:id",
  ensureIfIdOfDeveloperExistMiddleware,
  deleteDeveloperController
);

developersRouter.post(
  "/:id/infos",
  ensureIfIdOfDeveloperExistMiddleware,
  ensureIfDeveloperAlreadyHasInfosMiddleware,
  createDeveloperInfosController
);

export default developersRouter;
