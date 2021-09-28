import { StandingsTable } from '@/interface/standings-table';

export type RemoteGetChampionForYearModel = {
  MRData: {
    StandingsTable: StandingsTable
  };
}
