import React from 'react';
import { Link } from 'react-router-dom';


import { GetDriverStandings } from '@/domain/usecases';
import { Calendar } from '@/presentation/components';
import { DriverStanding } from '@/interface/driver-standing';

import styles from './item-styles.scss';

type Props = {
  driverStandings: DriverStanding[];
  season: string;
}

const Item: React.FC<Props> = ({ season, driverStandings }: Props) => {
  const driver = driverStandings.map(data => `${data.Driver.givenName} ${data.Driver.familyName}`);
  return (
    <li className={styles.driverStandingsItemWrap}>
      <div className={styles.driverStandingsContent}>
        <Calendar season={season} className={styles.calendarWrap} />
        <p data-testid="driver-full-name">{driver}</p>
      </div>
      <footer><Link className={styles.link} data-testid="link" to={`/seasons/${season}`}>View Details</Link></footer>
    </li>
  )
}

export default Item;