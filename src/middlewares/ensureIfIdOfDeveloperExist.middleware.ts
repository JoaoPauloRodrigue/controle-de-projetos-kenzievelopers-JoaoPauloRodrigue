import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database/database";
import { AppError } from "../error";

const ensureIfIdOfDeveloperExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let devId: number | null | undefined = parseInt(req.params.id);

  if (
    req.method === "POST" &&
    req.baseUrl === "/projects" &&
    req.body.developerId == undefined
  ) {
    devId = 8;
  } else if (
    req.method === "POST" &&
    req.baseUrl === "/projects" &&
    req.body.developerId !== undefined
  ) {
    devId = req.body.developerId;
  } else if (
    req.method === "PATCH" &&
    req.baseUrl === "/projects" &&
    req.body.developerId !== undefined
  ) {
    devId = req.body.developerId;
  }

  const queryString: string = `
  SELECT *
  FROM 
    developers
  WHERE 
    id = $1;  
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [devId],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("Developer not found.", 404);
  }

  res.locals.developerId = {
    id: devId,
  };

  return next();
};

export default ensureIfIdOfDeveloperExistMiddleware;
