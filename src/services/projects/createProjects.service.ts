import format from "pg-format";
import { IProjects, TProjectsRequest } from "../../interfaces";
import { QueryResult } from "pg";
import { client } from "../../database/database";

const createProjectsService = async (
  payload: TProjectsRequest
): Promise<IProjects> => {
  const queryFormat: string = format(
    `
        INSERT INTO
            projects(%I)
        VALUES
            (%L)
        RETURNING *;
        `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: QueryResult<IProjects> = await client.query(queryFormat);

  return queryResult.rows[0];
};

export default createProjectsService;
