/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';

import Button from '../Button';
import DriveSelector from '../DriveSelector';
import FlashToDeviceIndicator from '../FlashToDeviceIndicator';
import { setActiveDrive } from '../../actions/drive';

import device from '../../assets/Device.png';
import publicFlash from '../../assets/public_flash.png';
import styles from '../App/index.module.css';

const CheckPublicFlash = (props) => {
  const {
    drives, next, onCancel, setActiveDriveAction,
  } = props;
  let filteredDrives = [];

  if (drives) {
    filteredDrives = drives.filter(d => ['publicDrive', 'emptyDrive'].includes(d.driveType));
  }

  const chooseDrive = (path) => {
    setActiveDriveAction(path);
    next();
  };

  if (filteredDrives.length === 1) {
    chooseDrive(filteredDrives[0].path);
  }

  return (
    <Fade>
      <div className={styles.contentWrapper}>
        {filteredDrives.length >= 1 ? (
          <DriveSelector
            drives={filteredDrives}
            onCheckDrive={chooseDrive}
            title="Select public key drive"
          />
        ) : (
          <>
            <div className={styles.icons}>
              <img src={publicFlash} className={styles.icon} alt="" />
              <FlashToDeviceIndicator flash="public" />
              <img src={device} className={styles.icon} alt="" />
            </div>
            <div style={{ padding: 10, bottom: '10%' }}>
              <div className={styles.publicPoints}>
                1. Remove PRIVATE key flash drive and store it securely
              </div>
              <div className={styles.publicPoints}>2. Insert Public Address flash drive</div>
            </div>
            <Button onClick={onCancel}>Cancel</Button>
          </>
        )}
      </div>
    </Fade>
  );
};

CheckPublicFlash.propTypes = {
  drives: PropTypes.arrayOf(
    PropTypes.shape({
      driveType: PropTypes.string,
      path: PropTypes.string,
    }),
  ),
  next: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  setActiveDriveAction: PropTypes.func.isRequired,
};

CheckPublicFlash.defaultProps = {
  drives: [],
};

const mapStateToProps = state => ({
  drives: state.drive.drives,
});

const mapDispatchToProps = dispatch => ({
  setActiveDriveAction: path => dispatch(setActiveDrive(path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckPublicFlash);
