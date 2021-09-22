import React, { memo } from 'react';

import styles from './footer-styles.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} />
  )
}

const MemoizedFooter = memo(Footer);
export default MemoizedFooter;