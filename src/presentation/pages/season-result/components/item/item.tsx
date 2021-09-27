import React from 'react';

import { Race } from '@/interface/race';
import { Result } from '@/interface/result';
import { Driver } from '@/interface/driver';

import { IconName, Icon } from '@/presentation/components';

import styles from './item-styles.scss';

type Props = {
  race: Race
  driver: Driver[]
}

const Item: React.FC<Props> = ({ driver, race }: Props) => {
  const results: Result[] = race.Results;
  
  const makeItemAsChampion = results.find(r => r.Driver.driverId === driver[0].driverId);
  const driverFullName = results.map(data => `${data.Driver.givenName} ${data.Driver.familyName}`);

  const dateOfRace = new Date(race.date).toDateString();
  const iconName = makeItemAsChampion && IconName.trophy;

  return (
    <li className={styles.itemWrap}>

      <div className={styles.heading}>
        <p>
          <a className={styles.link} href={race.url}>{race.raceName}</a> 
          <span> - </span>
          <span>{race.Circuit.circuitName}</span>
        </p>

        <span className={styles.round}>Round {race.round}</span>
      </div>

      {makeItemAsChampion && <Icon className={styles.iconWrap} iconName={iconName} />}

      <div className={styles.content}>
        <div className={styles.center}>
          <span>Date</span>
          <span>{dateOfRace}</span>
        </div>
        
        <div className={styles.center}>
          <span>Winner</span>
          <a data-testid="driver-full-name" className={styles.link} href={results[0].Driver.url}>{driverFullName}</a>
        </div>

        <div className={styles.center}>
          <span>Finish Time</span>
          <span>{results[0].Time.time}</span>
        </div>
      </div>
    </li>
  )
}

export default Item;