/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import appInfo from '../../../package.json';

import styles from '../App/index.module.css';

const StatusBar = ({ online, drives }) => {
  let driveStatus = [];

  drives.map((d, i) => {
    if (driveStatus.length) {
      driveStatus.push(<span key={i}>|</span>);
    }

    if (d.driveType === 'privateDrive') {
      driveStatus.push(
        <span key={shortid.generate()} className={styles.redStatusLabel}>
          private keys
        </span>,
      );
    } else if (d.driveType === 'publicDrive') {
      driveStatus.push(
        <span key={shortid.generate()} className={styles.greenStatusLabel}>
          public
        </span>,
      );
    } else {
      driveStatus.push(<span key={shortid.generate()}>unknown</span>);
    }
  });

  if (!driveStatus.length) {
    driveStatus = [<span key={shortid.generate()}>none</span>];
  }

  return (
    <div className={styles.statusBar}>
      <div className={styles.statusWidget}>
        <b>Network status:</b>
        {' '}
        {online ? (
          <span className={styles.redStatusLabel}>online</span>
        ) : (
          <span className={styles.greenStatusLabel}>offline</span>
        )}
      </div>
      <div className={styles.statusWidget}>
        <b>Drives:</b>
        <div style={{ display: 'inline', marginLeft: 2 }}>{driveStatus}</div>
      </div>
      <div className={styles.statusWidget}>
        <b>Version:</b>
        <div style={{ display: 'inline', marginLeft: 2 }}>{appInfo.version}</div>
      </div>
    </div>
  );
};

StatusBar.propTypes = {
  drives: PropTypes.arrayOf(
    PropTypes.shape({
      driveType: PropTypes.string,
      path: PropTypes.string,
    }),
  ),
  online: PropTypes.bool,
};

StatusBar.defaultProps = {
  online: true,
  drives: [],
};

const mapStateToProps = state => ({
  drives: state.drive.drives,
});

export default connect(mapStateToProps)(StatusBar);
