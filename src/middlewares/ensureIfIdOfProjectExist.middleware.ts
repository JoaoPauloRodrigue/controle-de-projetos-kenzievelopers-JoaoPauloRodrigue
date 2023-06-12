import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database/database";
import { AppError } from "../error";

const ensureIfIdOfProjectExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = parseInt(req.params.id);

  const queryString: string = `
    SELECT *
    FROM 
      projects
    WHERE 
      id = $1;  
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("Project not found.", 404);
  }

  return next();
};

export default ensureIfIdOfProjectExistMiddleware;
