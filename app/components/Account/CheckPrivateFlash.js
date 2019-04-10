import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Button from '../Button';

import privateFlash from '../../assets/private_flash.png';
import arrow from '../../assets/Arrow.png';
import device from '../../assets/Device.png';
import styles from '../App/index.css';

const CheckPrivateFlash = props => {
  const { drives, next } = props;
  const drive = props.onlyPrivate
    ? drives.privateDrive
    : drives.privateDrive || drives.emptyDrive;

  if (drive) {
    next();
  }

  return (
    <Fragment>
      <div className={styles.icons}>
        <img src={privateFlash} className={styles.icon} alt="" />
        <img src={arrow} className={styles.icon} alt="" />
        <img src={device} className={styles.icon} alt="" />
      </div>
      <div className={styles.insertPrivate}>
        Insert <span className={styles.private}>Private</span> key flash drive
      </div>
      <Button onClick={props.onCancel}>Cancel</Button>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  drives: state.drive.drives
});

export default connect(mapStateToProps)(CheckPrivateFlash);
