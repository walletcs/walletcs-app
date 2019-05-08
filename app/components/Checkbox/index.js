/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';

const Checkbox = ({ checked, label, onChange }) => (
  <Fragment>
    <input
      type="checkbox"
      checked={checked}
      className={styles.inpcbx}
      readOnly
    />
    <label className={styles.cbx}>
      <span onClick={() => onChange(!checked)}>
        <svg width="12px" height="10px" viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1" />
        </svg>
      </span>
      <span onClick={() => onChange(!checked)}>{label}</span>
    </label>
  </Fragment>
);

Checkbox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

Checkbox.defaultProps = {
  checked: false,
  label: ''
};

export default Checkbox;
