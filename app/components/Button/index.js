import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import styles from './index.css';

const Button = props => (
  <div
    {...props}
    className={cx(
      styles.button,
      {
        [styles.primary]: props.primary,
        [styles.default]: !props.primary
      },
      props.className
    )}
  >
    <div
      className={cx(styles.text, {
        [styles.primaryText]: props.primary,
        [styles.defaultText]: !props.primary
      })}
    >
      {props.children}
    </div>
  </div>
);

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  primary: PropTypes.bool
};

export default Button;
