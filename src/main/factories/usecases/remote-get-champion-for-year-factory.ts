import { makeApiUrl } from '@/main/factories/http';
import { makeHttpClientDecorator } from '@/main/factories/decorators';

import { GetChampionForYear } from '@/domain/usecases';
import { RemoteGetChampionForYear } from '@/data/usecases';

export const makeRemoteGetChampionForYear = (year: string): GetChampionForYear =>
  new RemoteGetChampionForYear(makeApiUrl(`/${year}/driverStandings/1.json`), makeHttpClientDecorator());
