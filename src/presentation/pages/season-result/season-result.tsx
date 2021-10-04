import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';

import { GetResultsForYear, GetChampionForYear } from '@/domain/usecases';
import { SeasonResultData, getSeasonResultState } from '@/presentation/pages/season-result/components';
import { useErrorHandler } from '@/presentation/hooks';
import { Header, Footer, Error, Loading } from '@/presentation/components';

import useStyles from './season-result-styles.scss';

type Props = {
  loadSeasonResult: GetResultsForYear
  loadSeasonChampion: GetChampionForYear
}

const SeasonResult: React.FC<Props> = ({ loadSeasonResult, loadSeasonChampion }: Props) => {
  const resetSeasonResultState = useResetRecoilState(getSeasonResultState);

  const handleError = useErrorHandler((error: Error) => {
    setState(state => ({ ...state, seasonResult: null, seasonChampion: null, isLoading: false, error: error.message }))
  })
  
  const [state, setState] = useRecoilState(getSeasonResultState);

  const reload = (): void => setState(state => ({ ...state, error: '', reload: !state.reload, isLoading: false}))

  useEffect(() => {
    resetSeasonResultState();
  }, []);

  useEffect(() => {
    setState(state => ({ ...state, isLoading: true }))
    loadSeasonResult
      .getResultsForYear()
      .then(seasonResult => setState(state => ({ ...state, seasonResult, isLoading: false })))
      .catch(handleError)
  }, [state.reload])

  useEffect(() => {
    setState(state => ({ ...state, isLoading: true }))
    loadSeasonChampion.getChampionForYear().then(seasonChampion => setState(state => ({ ...state, seasonChampion, isLoading: false })))
  }, [state.reload]);

  return (
    <div className={useStyles.surveyResultWrap}>
      <Header />
      <div data-testid="season-result" className={useStyles.contentWrap}>
        {state.seasonResult && state.seasonChampion && <SeasonResultData seasonResult={state.seasonResult} seasonChampion={state.seasonChampion}/>}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SeasonResult;