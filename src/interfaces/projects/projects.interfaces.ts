interface IProjects {
  id: number;
  name: string;
  description: string;
  repository: string;
  startDate: Date;
  endDate: Date | null;
  developerId: number | null;
}

type TProjectsRequest = Omit<IProjects, "id" | "developerId">;

type TProjectsUpdated = Omit<IProjects, "id">;

type TProjectsRetrieve = {
  projectId: number;
  projectName: string;
  projectDescription: string;
  projectRepository: string;
  projectStartDate: Date;
  projectEndDate: Date | null;
  projectDeveloperName: string;
};

export { IProjects, TProjectsRequest, TProjectsRetrieve, TProjectsUpdated };
