import React from 'react';
import PropTypes from 'prop-types';
import { RadioGroup, Radio } from 'react-radio-group';

import styles from '../App/index.css';

const DriveSelector = (props) => {
  const { drives, onCheckDrive, title } = props;

  return (
    <>
      <div>{title}</div>
      <RadioGroup name="blockchain" onChange={onCheckDrive}>
        {drives.map(d => (
          <label className={styles.radio}>
            <Radio value={d.path} />
            <span>{d.path}</span>
          </label>
        ))}
      </RadioGroup>
    </>
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
