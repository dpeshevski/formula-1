import React from 'react';

import styles from './list-styles.scss';

import { GetDriverStandings } from '@/domain/usecases';
import { Item } from '@/presentation/pages/season-list/components' 

import { Loading } from '@/presentation/components'

type Props = {
  mrData: GetDriverStandings.Model,
}

const List: React.FC<Props> = ({ mrData }: Props) => {
  return (
    <ul className={styles.listWrap} data-testid="seasons-list">
      {
        mrData.MRData?.StandingsTable?.StandingsLists.length
        ?
          mrData.MRData?.StandingsTable?.StandingsLists.map((standingList) => <Item key={standingList.season} season={standingList.season} driverStandings={standingList.DriverStandings} />)
        : 
          <Loading />
      }
    </ul>
  )
}

export default List;