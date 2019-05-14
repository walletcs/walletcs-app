import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../Button';
import FlashToDeviceIndicator from '../FlashToDeviceIndicator';

import emptyDrive from '../../assets/empty_drive.png';
import device from '../../assets/Device.png';

import styles from '../App/index.css';

const CheckEmptyFlash = (props) => {
  const { drives, next, onCancel } = props;

  if (drives.emptyDrive) {
    next();
  }

  return (
    <Fragment>
      <div className={styles.icons}>
        <img src={emptyDrive} className={styles.icon} alt="" />
        <FlashToDeviceIndicator flash="empty" />
        <img src={device} className={styles.icon} alt="" />
      </div>
      <div className={styles.insertPrivate}>
        Insert
        {' '}
        <span className={styles.private}>Empty</span>
        {' '}
key flash drive
      </div>
      <Button onClick={onCancel}>Cancel</Button>
    </Fragment>
  );
};

CheckEmptyFlash.propTypes = {
  drives: PropTypes.shape({
    emptyDrive: PropTypes.string,
    publicDrive: PropTypes.string,
    privateDrive: PropTypes.string,
  }),
  next: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

CheckEmptyFlash.defaultProps = {
  drives: {},
};

const mapStateToProps = state => ({
  drives: state.drive.drives,
});

export default connect(mapStateToProps)(CheckEmptyFlash);
