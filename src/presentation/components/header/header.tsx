import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { Logo } from '@/presentation/components';

import useStyles from './header-styles.scss';

const Header: React.FC = () => {
  return (
    <header className={useStyles.headerWrap}>
      <div className={useStyles.headerContent}>
        <Link to="/seasons">
          <Logo />
        </Link>
      </div>
    </header>
  )
  
}
const memoizedHeader = memo(Header);
export default memoizedHeader;