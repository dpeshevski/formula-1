import { DriverStanding } from './driver-standing';
import { Race } from './race';

export interface RaceTable {
  season: string;
  position: string;
  Champion?: DriverStanding;
  Races: Race[];
}