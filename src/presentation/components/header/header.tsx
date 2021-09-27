import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { Logo } from '@/presentation/components';

import styles from './header-styles.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <Link to="/seasons">
          <Logo />
        </Link>
      </div>
    </header>
  )
  
}
const memoizedHeader = memo(Header);
export default memoizedHeader;