interface IDevelopers {
  id: number;
  name: string;
  email: string;
}

interface IDevelopersInfos {
  id: number;
  developerSince: Date;
  preferredOS: "Windows" | "Linux" | "MacOS";
  developerId: number;
}

type TDevelopersRequest = Omit<IDevelopers, "id">;

type TDevelopersInfosRequest = Omit<IDevelopersInfos, "id" | "developerId">;

type TDevelopersInfosRetrieve = {
  developerId: number;
  developerName: string;
  developerEmail: string;
  developerInfoDeveloperSince: Date | null;
  developerInfoPreferredOS: string | null;
};

export {
  IDevelopers,
  IDevelopersInfos,
  TDevelopersRequest,
  TDevelopersInfosRequest,
  TDevelopersInfosRetrieve,
};
