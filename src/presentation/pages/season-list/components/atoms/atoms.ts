import { atom } from 'recoil';

import { GetDriverStandings } from '@/domain/usecases';

const state = {
  key: 'getDriverStandingsState',
  default: {
    seasons: {} as GetDriverStandings.Model,
    error: '',
    reload: false,
    isLoading: false
  }
}

export const getDriverStandingsState = atom(state);