import { QueryConfig, QueryResult } from "pg";
import { TDevelopersInfosRetrieve } from "../../interfaces";
import { client } from "../../database/database";

const retrieveDeveloperService = async (
  id: number
): Promise<TDevelopersInfosRetrieve> => {
  const queryString: string = `
  SELECT 
	dev. "id" "developerId",
	dev. "name" "developerName",
	dev. "email" "developerEmail",
	devinfo. "developerSince" "developerInfoDeveloperSince",
	devinfo. "preferredOS" "developerInfoPreferredOS"
	FROM
	"developers" dev
	LEFT JOIN
	"developerInfos" devinfo ON dev. "id" = devinfo. "developerId"
  WHERE 
		dev."id" = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<TDevelopersInfosRetrieve> = await client.query(
    queryConfig
  );

  return queryResult.rows[0];
};

export default retrieveDeveloperService;
