import { GetChampionForYearModel } from '@/domain/models';

export interface GetChampionForYear {
  getChampionForYear: () => Promise<GetChampionForYear.Model>;
}

export namespace GetChampionForYear {
  export type Model = GetChampionForYearModel;
}
