import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database/database";
import { AppError } from "../error";

const ensureIfDeveloperAlreadyHasInfosMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let devId: number = parseInt(req.params.id);

  const queryString: string = `
  SELECT *
  FROM 
  "developerInfos" AS devinfo
  INNER JOIN "developers" AS dev ON dev."id" = devinfo."developerId" 
  WHERE 
    devinfo."id" = $1;  
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [devId],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (queryResult.rows[0]) {
    throw new AppError("Developer infos already exists.", 409);
  }

  return next();
};

export default ensureIfDeveloperAlreadyHasInfosMiddleware;
