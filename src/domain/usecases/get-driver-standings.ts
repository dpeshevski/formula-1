import { GetDriverStandingsModel } from '@/domain/models';

export interface GetDriverStandings {
  getDriverStandings: () => Promise<GetDriverStandings.Model[]>;
}

export namespace GetDriverStandings {
  export type Model = GetDriverStandingsModel;
}