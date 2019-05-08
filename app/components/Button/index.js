/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import styles from './index.css';

const Button = ({ primary, className, children, onClick }) => (
  <div
    className={cx(
      styles.button,
      {
        [styles.primary]: primary,
        [styles.default]: !primary
      },
      className
    )}
    onClick={onClick}
    onKeyPress={onClick}
    role="button"
    tabIndex={0}
  >
    <div
      className={cx(styles.text, {
        [styles.primaryText]: primary,
        [styles.defaultText]: !primary
      })}
    >
      {children}
    </div>
  </div>
);

Button.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  primary: PropTypes.bool
};

Button.defaultProps = {
  className: '',
  primary: false
};

export default Button;
