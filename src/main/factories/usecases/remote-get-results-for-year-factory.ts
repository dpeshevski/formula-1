import { makeApiUrl } from '@/main/factories/http';
import { makeHttpClientDecorator } from '@/main/factories/decorators';

import { GetResultsForYear } from '@/domain/usecases';
import { RemoteGetResultsForYear } from '@/data/usecases';

export const getResultsForYear = (year: number): GetResultsForYear =>
  new RemoteGetResultsForYear(makeApiUrl(`${year}/results/1.json`), makeHttpClientDecorator());
