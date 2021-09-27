import React from 'react'

import styles from './calendar-styles.scss'

type Props = {
  season: string
  className?: string
}

const Calendar: React.FC<Props> = ({ season, className }: Props) => {
  return (
    <time className={[styles.calendarWrap, className].join(' ')}>
      <span data-testid="year" className={styles.year}>
        {season}
      </span>
    </time>
  )
}

export default Calendar;
