import { GetResultsForYearModel } from '@/domain/models';

export interface GetResultsForYear {
  getResultsForYear: () => Promise<GetResultsForYear.Model>;
}

export namespace GetResultsForYear {
  export type Model = GetResultsForYearModel;
}