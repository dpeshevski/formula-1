import { makeApiUrl } from '@/main/factories/http';
import { makeHttpClientDecorator } from '@/main/factories/decorators';

import { GetChampionForYear } from '@/domain/usecases';
import { RemoteGetChampionForYear } from '@/data/usecases';

export const getChampionForYear = (year: number): GetChampionForYear =>
  new RemoteGetChampionForYear(makeApiUrl(`/${year}/driverStandings/1.json`), makeHttpClientDecorator());
