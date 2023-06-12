import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database/database";
import { IProjects, TProjectsUpdated } from "../../interfaces";
import format from "pg-format";

const updateProjectsService = async (
  projectId: number,
  payloadUpdate: Partial<TProjectsUpdated>
): Promise<IProjects> => {
  const queryString: string = format(
    `
            UPDATE 
              projects
            SET(%I) = ROW(%L)
            WHERE 
                id = $1
            RETURNING *;
            `,
    Object.keys(payloadUpdate),
    Object.values(payloadUpdate)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [projectId],
  };

  const queryResult: QueryResult<IProjects> = await client.query(queryConfig);

  return queryResult.rows[0];
};

export default updateProjectsService;
