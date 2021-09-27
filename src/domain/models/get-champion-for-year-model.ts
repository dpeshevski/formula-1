import { Driver } from '@/interface/driver';
import { DriverStanding } from '@/interface/driver-standing';
import { StandingsTable } from '@/interface/standings-table';

export type GetChampionForYearModel = {
  MRData: {
    StandingsTable: StandingsTable
  };
}
