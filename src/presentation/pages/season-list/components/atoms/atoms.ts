import { atom } from 'recoil';

import { GetDriverStandings } from '@/domain/usecases';

const state = {
  key: 'getDriverStandingsState',
  default: {
    seasons: {} as GetDriverStandings.Model,
    erros: '',
    reload: false
  }
}

export const getDriverStandingsState = atom(state);