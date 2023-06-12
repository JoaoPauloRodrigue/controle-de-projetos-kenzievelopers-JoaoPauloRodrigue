import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database/database";
import { AppError } from "../error";

const ensureIfEmailExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const email = req.body.email;

  const queryString: string = `
    SELECT *
    FROM 
        developers
    WHERE 
        email = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  const emailExist: string = queryResult.rows[0];

  if (emailExist) {
    throw new AppError("Email already exists.", 409);
  }

  return next();
};

export default ensureIfEmailExistMiddleware;
