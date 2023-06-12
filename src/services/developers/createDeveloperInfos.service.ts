import { IDevelopersInfos, TDevelopersInfosRequest } from "../../interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database/database";

const createDeveloperInfosService = async (
  developerId: number,
  payload: TDevelopersInfosRequest
): Promise<IDevelopersInfos> => {
  const queryFormatDeveloperInfos: string = `
        INSERT INTO 
            "developerInfos"
            ("developerSince", "preferredOS", "developerId")
        VALUES
            ($1, $2, $3)  
        RETURNING *;
        `;

  const queryConfig: QueryConfig = {
    text: queryFormatDeveloperInfos,
    values: [payload.developerSince, payload.preferredOS, developerId],
  };

  const queryResultDeveloperInfos: QueryResult<IDevelopersInfos> =
    await client.query(queryConfig);

  return queryResultDeveloperInfos.rows[0];
};

export default createDeveloperInfosService;
