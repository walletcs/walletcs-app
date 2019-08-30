import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';

import Button from '../Button';
import DriveSelector from '../DriveSelector';
import FlashToDeviceIndicator from '../FlashToDeviceIndicator';
import { setActiveDrive } from '../../actions/drive';

import emptyDrive from '../../assets/empty_drive.png';
import device from '../../assets/Device.png';

import styles from '../App/index.css';

const CheckEmptyFlash = (props) => {
  const {
    drives, next, onCancel, setActiveDriveAction,
  } = props;
  let filteredDrives = [];

  if (drives) {
    filteredDrives = drives.filter(d => ['emptyDrive'].includes(d.driveType));
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
            title="Please choose drive for saving public key"
          />
        ) : (
          <>
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
          </>
        )}
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </Fade>
  );
};

CheckEmptyFlash.propTypes = {
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

CheckEmptyFlash.defaultProps = {
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
)(CheckEmptyFlash);
