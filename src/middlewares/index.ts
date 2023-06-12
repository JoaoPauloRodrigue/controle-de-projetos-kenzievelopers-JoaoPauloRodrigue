import handleError from "./handleErrors,middlewares";
import ensureIfEmailExistMiddleware from "./ensureIfEmailExist.middleware";
import ensureIfIdOfDeveloperExistMiddleware from "./ensureIfIdOfDeveloperExist.middleware";
import ensureIfPreferredOSIsCorrectMiddleware from "./ensureIfPreferredOSIsCorrect.middleware";
import ensureIfIdOfProjectExistMiddleware from "./ensureIfIdOfProjectExist.middleware";
import ensureIfDeveloperAlreadyHasInfosMiddleware from "./ensureIfDeveloperAlreadyHasInfos.middleware";

export {
  handleError,
  ensureIfEmailExistMiddleware,
  ensureIfIdOfDeveloperExistMiddleware,
  ensureIfPreferredOSIsCorrectMiddleware,
  ensureIfIdOfProjectExistMiddleware,
  ensureIfDeveloperAlreadyHasInfosMiddleware,
};
