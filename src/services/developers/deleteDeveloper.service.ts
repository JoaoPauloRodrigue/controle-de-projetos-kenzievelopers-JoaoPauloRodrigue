import { QueryConfig } from "pg";
import { client } from "../../database/database";

const deleteDeveloperService = async (developerId: number): Promise<void> => {
  const queryString: string = `
    DELETE
    FROM
      developers
    WHERE 
        id = $1;
   `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [developerId],
  };

  await client.query(queryConfig);
};

export default deleteDeveloperService;
