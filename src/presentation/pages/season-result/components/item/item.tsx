import React from 'react';

import { Race } from '@/interface/race';
import { Result } from '@/interface/result';
import { Driver } from '@/interface/driver';

import { IconName, Icon } from '@/presentation/components';

import useStyles from './item-styles.scss';

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
    <li className={useStyles.itemWrap}>

      <div className={useStyles.heading}>
        <p>
          <a data-testid="race-name" className={useStyles.link} href={race.url}>{race.raceName}</a> 
          <span> - </span>
          <span data-testid="circuit-name">{race.Circuit.circuitName}</span>
        </p>

        <span data-testid="race-round" className={useStyles.round}>Round {race.round}</span>
      </div>

      {makeItemAsChampion && <Icon className={useStyles.iconWrap} iconName={iconName} />}

      <div className={useStyles.content}>
        <div className={useStyles.center}>
          <span>Date</span>
          <span data-testid="date-of-race">{dateOfRace}</span>
        </div>
        
        <div className={useStyles.center}>
          <span>Winner</span>
          <a data-testid="driver-full-name" className={useStyles.link} href={results[0].Driver.url}>{driverFullName}</a>
        </div>

        <div className={useStyles.center}>
          <span>Finish Time</span>
          <span data-testid="race-time">{results[0].Time.time}</span>
        </div>
      </div>
    </li>
  )
}

export default Item;