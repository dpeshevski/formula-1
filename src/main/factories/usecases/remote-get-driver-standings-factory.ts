import { makeApiUrl } from '@/main/factories/http';
import { makeHttpClientDecorator } from '@/main/factories/decorators';

import { RemoteGetDriverStandings } from '@/data/usecases';
import { GetDriverStandings } from '@/domain/usecases';

export const makeRemoteGetDriverStandings = (offset: number, limit: number): GetDriverStandings =>
  new RemoteGetDriverStandings(makeApiUrl(`/driverStandings/1.json?offset=${offset}&limit=${limit}`), makeHttpClientDecorator());
  