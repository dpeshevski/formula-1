import { Standing } from './standing';

export interface StandingsTable {
  season: string;
  driverStandings: string;
  StandingsLists: Standing[];
}