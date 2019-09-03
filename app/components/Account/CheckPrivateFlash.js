import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';

import Button from '../Button';
import DriveSelector from '../DriveSelector';
import FlashToDeviceIndicator from '../FlashToDeviceIndicator';
import { setActiveDrive } from '../../actions/drive';

import privateFlash from '../../assets/private_flash.png';
import device from '../../assets/Device.png';
import styles from '../App/index.module.css';

const CheckPrivateFlash = (props) => {
  const {
    drives, next, onlyPrivate, onCancel, setActiveDriveAction,
  } = props;

  let filteredDrives = [];

  if (drives) {
    filteredDrives = onlyPrivate
      ? drives.filter(d => d.driveType === 'privateDrive')
      : drives.filter(d => ['privateDrive', 'emptyDrive'].includes(d.driveType));
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
            title="Choose drive to store your private key"
          />
        ) : (
          <>
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
          </>
        )}
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </Fade>
  );
};

CheckPrivateFlash.propTypes = {
  drives: PropTypes.arrayOf(
    PropTypes.shape({
      driveType: PropTypes.string,
      path: PropTypes.string,
    }),
  ),
  next: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  setActiveDriveAction: PropTypes.func.isRequired,
  onlyPrivate: PropTypes.bool,
};

CheckPrivateFlash.defaultProps = {
  drives: [],
  onlyPrivate: false,
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
)(CheckPrivateFlash);
