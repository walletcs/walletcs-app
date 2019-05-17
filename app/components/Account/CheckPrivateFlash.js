import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../Button';
import FlashToDeviceIndicator from '../FlashToDeviceIndicator';

import privateFlash from '../../assets/private_flash.png';
import device from '../../assets/Device.png';
import styles from '../App/index.css';

const CheckPrivateFlash = (props) => {
  const {
    drives, next, onlyPrivate, onCancel,
  } = props;
  const drive = onlyPrivate ? drives.privateDrive : drives.privateDrive || drives.emptyDrive;

  if (drive) {
    next();
  }

  return (
    <Fragment>
      <div className={styles.contentWrapper}>
        <div className={styles.icons}>
          <img src={privateFlash} className={styles.icon} alt="" />
          <FlashToDeviceIndicator flash="private" />
          <img src={device} className={styles.icon} alt="" />
        </div>
        <div className={styles.insertPrivate}>
          Insert
          {' '}
          <span className={styles.private}>Private</span>
          {' '}
key flash drive
        </div>
      </div>
      <Button onClick={onCancel}>Cancel</Button>
    </Fragment>
  );
};

CheckPrivateFlash.propTypes = {
  drives: PropTypes.shape({
    emptyDrive: PropTypes.string,
    publicDrive: PropTypes.string,
    privateDrive: PropTypes.string,
  }),
  next: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onlyPrivate: PropTypes.bool,
};

CheckPrivateFlash.defaultProps = {
  drives: {},
  onlyPrivate: false,
};

const mapStateToProps = state => ({
  drives: state.drive.drives,
});

export default connect(mapStateToProps)(CheckPrivateFlash);
