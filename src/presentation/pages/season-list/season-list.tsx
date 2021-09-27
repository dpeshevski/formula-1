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
    erros: '',
    reload: !state.reload
  }));

  const handleError = useErrorHandler((error: Error) => {
    setState(state => ({
      ...state,
      erros: error.message
    }));
  });
  
  const resetSeasonListState = useResetRecoilState(getDriverStandingsState);
  
  useEffect(() => resetSeasonListState(), []);

  useEffect(() => {
    loadSeasonList.getDriverStandings()
      .then(seasons => setState(state => ({ ...state, seasons })))
      .catch(handleError);
  }, [state.reload]);

  return (
    <div className={styles.seasonsListWrap}>
      <Header />
      <div className={styles.contentWrap}>
        <h1>Formula One World Championship</h1>
        {
          state.erros
          ? <Error error={state.erros} reload={reload} />
          : <List mrData={state.seasons} /> 
        }
      </div>
      <Footer />
    </div>
  )
}

export default SeasonList;