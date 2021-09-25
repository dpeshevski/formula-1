import { RaceTable } from './race-table';
import { StandingsTable } from './standings-table';

export interface MRData {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  StandingsTable?: StandingsTable;
  RaceTable?: RaceTable;
}