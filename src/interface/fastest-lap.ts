import { Time } from './time';
import { AverageSpeed } from './average-speed';

export interface FastestLap {
  rank: string;
  lap: string;
  Time: Time;
  AverageSpeed: AverageSpeed;
}