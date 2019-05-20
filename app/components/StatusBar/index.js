/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../App/index.css';

const StatusBar = ({ online, drives }) => {
  let driveStatus = [];
  if (drives.privateDrive) {
    driveStatus.push(<span className={styles.redStatusLabel}>private keys</span>);
  }

  if (drives.publicDrive) {
    driveStatus.push(<span className={styles.greenStatusLabel}>public</span>);
  }

  if (drives.emptyDrive) {
    driveStatus.push(<span>unknown</span>);
  }

  if (!driveStatus.length) {
    driveStatus = [<span>none</span>];
  }

  return (
    <div className={styles.statusBar}>
      <div className={styles.statusWidget}>
        Network status:
        {' '}
        {online ? (
          <span className={styles.redStatusLabel}>online</span>
        ) : (
          <span className={styles.greenStatusLabel}>offline</span>
        )}
      </div>
      <div className={styles.statusWidget}>
        Drives:
        <div style={{ display: 'inline', marginLeft: 2 }}>{driveStatus}</div>
      </div>
    </div>
  );
};

StatusBar.propTypes = {
  drives: PropTypes.shape({
    emptyDrive: PropTypes.string,
    publicDrive: PropTypes.string,
    privateDrive: PropTypes.string,
  }),
  online: PropTypes.bool,
};

StatusBar.defaultProps = {
  online: true,
  drives: {},
};

const mapStateToProps = state => ({
  drives: state.drive.drives,
});

export default connect(mapStateToProps)(StatusBar);
