import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import useStyles from './footer-styles.scss';

const Footer: React.FC = () => {
  return (
    <footer className={useStyles.footer}> 
      <span>Created by Daniel Peshevski</span>
      <a href="https://github.com/dpeshevski/formula-1" > Github </a>
    </footer>
  )
}

const MemoizedFooter = memo(Footer);
export default MemoizedFooter;