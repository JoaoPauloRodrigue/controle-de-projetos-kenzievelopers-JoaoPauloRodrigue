import format from "pg-format";
import { IDevelopers, TDevelopersRequest } from "../../interfaces";
import { client } from "../../database/database";
import { QueryConfig, QueryResult } from "pg";

const updateDeveloperService = async (
  developerId: number,
  payloadUpdate: Partial<TDevelopersRequest>
): Promise<IDevelopers> => {
  const queryString: string = format(
    `
        UPDATE 
          developers
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
    values: [developerId],
  };

  const queryResult: QueryResult<IDevelopers> = await client.query(queryConfig);

  return queryResult.rows[0];
};

export default updateDeveloperService;
