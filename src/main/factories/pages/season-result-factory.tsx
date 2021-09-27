import React from 'react';
import { useParams } from 'react-router-dom';

import { makeRemoteGetResultsForYear, makeRemoteGetChampionForYear } from '@/main/factories/usecases';
import { SeasonResult } from '@/presentation/pages';


export const makeSeasonResult: React.FC = () => {
  type Props = {
    year: string;
  }

  const { year } = useParams<Props>();

  return (
    <SeasonResult
      loadSeasonResult={makeRemoteGetResultsForYear(year)}
      loadSeasonChampion={makeRemoteGetChampionForYear(year)}
    />
  )
}