import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Button from '../Button';
import FlashToDeviceIndicator from '../FlashToDeviceIndicator';

import device from '../../assets/Device.png';
import transactionFlash from '../../assets/transaction_drive.png';

import styles from '../App/index.css';

const CheckTransactionFlash = ({ drives, onCancel, next }) => {
  const { emptyDrive } = drives;

  if (emptyDrive) {
    next();
  }

  return (
    <Fragment>
      <div className={styles.icons}>
        <img src={transactionFlash} className={styles.icon} alt="" />
        <FlashToDeviceIndicator flash="transaction" />
        <img src={device} className={styles.icon} alt="" />
      </div>
      <div className={styles.insertPrivate}>
        Insert flash drive with Transactions to sign
      </div>
      <Button onClick={onCancel}>Cancel</Button>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  drives: state.drive.drives
});

export default connect(mapStateToProps)(CheckTransactionFlash);
