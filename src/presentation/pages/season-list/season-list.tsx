import React, { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

import styles from './season-list-styles.scss'

import { Header, Footer, Error, Loading } from '@/presentation/components';

import { GetDriverStandings } from '@/domain/usecases';

import { List, getDriverStandingsState } from '@/presentation/pages/season-list/components';
import { useErrorHandler } from '@/presentation/hooks';

type Props = {
  loadSeasonList: GetDriverStandings,
}

const SeasonList: React.FC<Props> = ({ loadSeasonList }: Props) => {
  const [state, setState] = useRecoilState(getDriverStandingsState);

  const reload = (): void => setState(state => ({
    seasons: {} as GetDriverStandings.Model,
    error: '',
    reload: !state.reload,
    isLoading: true,
  }));

  const handleError = useErrorHandler((error: Error) => {
    setState(state => ({
      ...state,
      error: error.message
    }));
  });
  
  const resetSeasonListState = useResetRecoilState(getDriverStandingsState);
  
  useEffect(() => resetSeasonListState(), []);

  useEffect(() => {
    setState(state => ({ ...state, isLoading: true }));

    loadSeasonList.getDriverStandings()
      .then(seasons => setState(state => ({ ...state, seasons, isLoading: false})))
      .catch(handleError);
  }, [state.reload]);

  return (
    <div className={styles.seasonsListWrap}>
      <Header />
      <div className={styles.contentWrap}>
        {!state.isLoading && <h1>Formula One World Championship</h1>}
        {state.seasons && <List mrData={state.seasons}/>}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SeasonList;