import { IDevelopers, TDevelopersRequest } from "../../interfaces";
import format from "pg-format";
import { QueryResult } from "pg";
import { client } from "../../database/database";

const createDeveloperService = async (
  payload: TDevelopersRequest
): Promise<IDevelopers> => {
  const formatString = format(
    `
        INSERT INTO 
            developers(%I)
        VALUES
            (%L)
        RETURNING *;
        `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: QueryResult<IDevelopers> = await client.query(
    formatString
  );

  return queryResult.rows[0];
};

export default createDeveloperService;
