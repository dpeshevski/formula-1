import React from 'react';

import { makeRemoteGetDriverStandings } from '@/main/factories/usecases';
import { SeasonList } from '@/presentation/pages';

export const makeSeasonList: React.FC = () => {
  return (
    <SeasonList loadSeasonList={makeRemoteGetDriverStandings(55, 11)}/>
  )
}