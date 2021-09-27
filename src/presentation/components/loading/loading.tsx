import React from 'react';

import { Spinner } from '@/presentation/components';

import styles from './loading-styles.scss';

const Loading: React.FC = () => {
  return (
    <div data-testid="loading" className={styles.loadingWrap}>
      <div className={styles.loading}>
        <span>Loading...</span>
        <Spinner isNegative />
      </div>
    </div>
  )
}

export default Loading;