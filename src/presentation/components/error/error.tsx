import React from 'react';

import useStyles from './error-styles.scss';

type Props = {
  error: string
  reload: () => void
}

const Error: React.FC<Props> = ({ error, reload }: Props) => {
  return (
    <div className={useStyles.errorWrap}>
      <span data-testid="error">{error}</span>
      <button data-testid="reload" onClick={reload}>Try again</button>
    </div>
  )
}

export default Error;