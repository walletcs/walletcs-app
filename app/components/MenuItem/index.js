import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import arrow from '../../assets/arrow.svg';

import styles from './index.css';

const MenuItem = props => (
  <div
    className={cx(styles.menuItem, props.className, {
      [styles.primary]: props.primary
    })}
    onClick={props.onClick}
  >
    <img src={arrow} className={styles.arrow} />
    <div className={styles.text}>{props.children}</div>
  </div>
);

MenuItem.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  onClick: PropTypes.func,
  primary: PropTypes.bool
};

export default MenuItem;
