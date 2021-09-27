import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import { GetResultsForYear, GetChampionForYear } from '@/domain/usecases';
import { SeasonResultItem } from '@/presentation/pages/season-result/components'
import styles from './list-styles.scss';
import { Race } from '@/interface/race'
import { Loading, SubmitButton } from '@/presentation/components';
import { Driver } from '@/interface/driver';
import { IconName, Icon } from '@/presentation/components';

type Props = {
  seasonResult: GetResultsForYear.Model
  seasonChampion: GetChampionForYear.Model
}

const Result: React.FC<Props> = ({ seasonResult, seasonChampion }: Props) => {
  const { goBack } = useHistory();
  const iconName = IconName.home;

  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} to="/seasons">
        <Icon className={styles.iconWrap} iconName={iconName} />
      </Link>
      <ul data-testid="season-results" className={styles.resultList}>
        {
          seasonResult?.MRData?.RaceTable.Races.length
          ?
          seasonResult?.MRData?.RaceTable?.Races.map(race => <SeasonResultItem key={race.round} race={race} driver={seasonChampion?.MRData?.StandingsTable?.StandingsLists.map(r => r.DriverStandings.map(r => r.Driver)).flat(1) } />)
          :
          <Loading />
          }
      </ul>
    </div>
  )
}

export default Result;