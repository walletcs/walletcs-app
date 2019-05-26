/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import styles from '../App/index.css';

const StatusBar = ({ online, drives }) => {
  let driveStatus = [];
  if (drives.privateDrive) {
    driveStatus.push(
      <span key={shortid.generate()} className={styles.redStatusLabel}>
        private keys
      </span>,
    );
  }

  if (drives.publicDrive) {
    if (driveStatus.length) {
      driveStatus.push(<span>|</span>);
    }

    driveStatus.push(
      <span key={shortid.generate()} className={styles.greenStatusLabel}>
        public
      </span>,
    );
  }

  if (drives.emptyDrive) {
    if (driveStatus.length) {
      driveStatus.push(<span>|</span>);
    }

    driveStatus.push(<span key={shortid.generate()}>unknown</span>);
  }

  if (!driveStatus.length) {
    driveStatus = [<span key={shortid.generate()}>none</span>];
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
