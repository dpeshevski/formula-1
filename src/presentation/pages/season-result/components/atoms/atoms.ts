import { atom } from 'recoil';

import { GetChampionForYear, GetResultsForYear } from '@/domain/usecases';
import { Driver } from '@/interface/driver';

const state = {
  key: 'getSeasonResultState',
  default: {
    isLoading: false,
    seasonResult: null as GetResultsForYear.Model,
    seasonChampion: null as GetChampionForYear.Model,
    error: '',
    reload: false,
  }
}

export const getSeasonResultState = atom(state);
