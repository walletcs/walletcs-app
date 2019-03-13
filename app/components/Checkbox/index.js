import React, { Fragment } from 'react';

import styles from './index.css';

const Checkbox = props => (
  <Fragment>
    <input
      type="checkbox"
      checked={props.checked}
      className={styles.inpcbx}
      readOnly
    />
    <label className={styles.cbx}>
      <span onClick={() => props.onChange(!props.checked)}>
        <svg width='12px' height='10px' viewBox='0 0 12 10'>
          <polyline points='1.5 6 4.5 9 10.5 1'></polyline>
        </svg>
      </span>
      <span onClick={() => props.onChange(!props.checked)}>{props.label}</span>
    </label>
  </Fragment>
);

export default Checkbox;
