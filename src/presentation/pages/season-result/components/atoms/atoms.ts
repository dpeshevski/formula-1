import { atom } from 'recoil';

import { GetChampionForYear, GetResultsForYear } from '@/domain/usecases';

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
