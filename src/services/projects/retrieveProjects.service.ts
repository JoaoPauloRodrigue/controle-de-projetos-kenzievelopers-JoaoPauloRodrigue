import { QueryConfig, QueryResult } from "pg";
import { TProjectsRetrieve } from "../../interfaces";
import { client } from "../../database/database";

const retrieveProjectsService = async (
  projectId: number
): Promise<TProjectsRetrieve> => {
  const queryString = `
    SELECT
        proj. "id" "projectId",
        proj. "name" "projectName",
        proj. "description" "projectDescription",
        proj. "repository" "projectRepository",
        proj. "startDate" "projectStartDate",
        proj. "endDate" "projectEndDate",
        dev. "name" "projectDeveloperName"
    FROM
        "projects" proj
    JOIN
        "developers" dev ON proj."id" = dev. "id"
    WHERE 
        proj."id" = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [projectId],
  };

  const queryResult: QueryResult<TProjectsRetrieve> = await client.query(
    queryConfig
  );

  return queryResult.rows[0];
};

export default retrieveProjectsService;
