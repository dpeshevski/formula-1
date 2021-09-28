import { Standing } from '@/interface/standing';
import { Response } from '@/interface/response';
import { MRData} from '@/interface/data';
import { DriverStanding } from '@/interface/driver-standing';


export type RemoteGetDriverStandingsModel = {
  // standing: Standing;
  // data: Response;
  MRData: MRData;
  // driverStandings: DriverStanding[];
}