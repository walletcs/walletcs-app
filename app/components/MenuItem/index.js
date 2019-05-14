/* eslint-disable react/forbid-prop-types */
import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import styles from './index.css';

const MenuItem = ({
  children, onClick, primary, className, icon,
}) => (
  <div
    className={cx(styles.menuItem, className, {
      [styles.primary]: primary,
    })}
    onClick={onClick}
    onKeyPress={onClick}
    role="button"
    tabIndex={0}
  >
    <img src={icon} className={styles.icon} alt="" />
    <div className={styles.text}>{children}</div>
  </div>
);

MenuItem.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  primary: PropTypes.bool,
  icon: PropTypes.string.isRequired,
};

MenuItem.defaultProps = {
  primary: false,
  className: '',
};

export default MenuItem;
