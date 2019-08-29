import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';

import Button from '../Button';
import DriveSelector from '../DriveSelector';
import FlashToDeviceIndicator from '../FlashToDeviceIndicator';
import { setActiveDrive } from '../../actions/drive';

import device from '../../assets/Device.png';
import transactionFlash from '../../assets/transaction_drive.png';

import styles from '../App/index.css';

const CheckTransactionFlash = ({
  drives, onCancel, next, setActiveDriveAction,
}) => {
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
            title="Please choose private key drive"
          />
        ) : (
          <>
            <div className={styles.icons}>
              <img src={transactionFlash} className={styles.icon} alt="" />
              <FlashToDeviceIndicator flash="transaction" />
              <img src={device} className={styles.icon} alt="" />
            </div>
            <div className={styles.insertPrivate}>Insert flash drive with Transactions to sign</div>
          </>
        )}
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </Fade>
  );
};

CheckTransactionFlash.propTypes = {
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

CheckTransactionFlash.defaultProps = {
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
)(CheckTransactionFlash);
