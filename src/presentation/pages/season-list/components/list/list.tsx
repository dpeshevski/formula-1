import React from 'react';

import useStyles from './list-styles.scss';

import { GetDriverStandings } from '@/domain/usecases';
import { Item } from '@/presentation/pages/season-list/components';

type Props = {
  mrData: GetDriverStandings.Model,
}

const List: React.FC<Props> = ({ mrData }: Props) => {
  return (
    <div>
      <ul className={useStyles.listWrap} data-testid="seasons-list">
        {
          mrData.MRData?.StandingsTable?.StandingsLists.map((standingList) => <Item key={standingList.season} season={standingList.season} driverStandings={standingList.DriverStandings} />)
        }
      </ul>
    </div>
  )
}

export default List;