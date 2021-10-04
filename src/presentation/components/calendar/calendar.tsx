import React from 'react'

import useStyles from './calendar-styles.scss'

type Props = {
  season: string
  className?: string
}

const Calendar: React.FC<Props> = ({ season, className }: Props) => {
  return (
    <time className={[useStyles.calendarWrap, className].join(' ')}>
      <span data-testid="year" className={useStyles.year}>
        {season}
      </span>
    </time>
  )
}

export default Calendar;
