import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Button from '../Button';
import FlashToDeviceIndicator from '../FlashToDeviceIndicator';

import device from '../../assets/Device.png';
import publicFlash from '../../assets/public_flash.png';
import styles from '../App/index.css';

const CheckPublicFlash = props => {
  const { drives, next } = props;

  if (drives.publicDrive || drives.emptyDrive) {
    next();
  }

  return (
    <Fragment>
      <div className={styles.icons}>
        <img src={publicFlash} className={styles.icon} alt="" />
        <FlashToDeviceIndicator flash="public" />
        <img src={device} className={styles.icon} alt="" />
      </div>
      <div style={{ padding: 10, bottom: '10%' }}>
        <div className={styles.publicPoints}>
          1. Remove PRIVATE key flash drive
        </div>
        <div className={styles.publicPoints}>
          2. Make sure you choose the right flash drive
        </div>
        <div className={styles.publicPoints}>
          3. Insert Public Address flash drive
        </div>
      </div>
      <Button onClick={props.onCancel}>Cancel</Button>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  drives: state.drive.drives
});

export default connect(mapStateToProps)(CheckPublicFlash);
