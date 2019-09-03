/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { RadioGroup, Radio } from 'react-radio-group';

import styles from '../App/index.module.css';

const DriveSelector = (props) => {
  const { drives, onCheckDrive, title } = props;

  return (
    <div className={styles.chooseDrive}>
      <div>{title}</div>
      <RadioGroup name="blockchain" onChange={onCheckDrive}>
        {drives.map(d => (
          <label className={styles.radio}>
            <Radio value={d.path} />
            <span>{d.description}</span>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
};

DriveSelector.propTypes = {
  drives: PropTypes.arrayOf(
    PropTypes.shape({
      driveType: PropTypes.string,
      path: PropTypes.string,
    }),
  ),
  title: PropTypes.string.isRequired,
  onCheckDrive: PropTypes.func.isRequired,
};

DriveSelector.defaultProps = {
  drives: {},
};

export default DriveSelector;
