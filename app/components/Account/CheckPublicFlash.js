/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../Button';
import FlashToDeviceIndicator from '../FlashToDeviceIndicator';

import device from '../../assets/Device.png';
import publicFlash from '../../assets/public_flash.png';
import styles from '../App/index.css';

const CheckPublicFlash = (props) => {
  const { drives, next, onCancel } = props;

  if (drives.publicDrive || drives.emptyDrive) {
    next();
  }

  return (
    <Fragment>
      <div className={styles.contentWrapper}>
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
      </div>
      <Button onClick={onCancel}>Cancel</Button>
    </Fragment>
  );
};

CheckPublicFlash.propTypes = {
  drives: PropTypes.shape({
    emptyDrive: PropTypes.string,
    publicDrive: PropTypes.string,
    privateDrive: PropTypes.string,
  }),
  next: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

CheckPublicFlash.defaultProps = {
  drives: {},
};

const mapStateToProps = state => ({
  drives: state.drive.drives,
});

export default connect(mapStateToProps)(CheckPublicFlash);
