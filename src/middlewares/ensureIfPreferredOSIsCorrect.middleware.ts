import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database/database";
import { AppError } from "../error";

const ensureIfPreferredOSIsCorrectMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = res.locals.developerId.id;
  const preferredOS: string = req.body.preferredOS;

  const queryString: string = `
  SELECT
    "preferredOS"
  FROM
    "developerInfos"
  WHERE
    "preferredOS" = $1
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [preferredOS],
  };

  await client.query(queryConfig);

  if (preferredOS != "Windows" || "Linux" || "MacOS") {
    throw new AppError("Invalid OS option.", 400);
  }

  return next();
};

export default ensureIfPreferredOSIsCorrectMiddleware;
