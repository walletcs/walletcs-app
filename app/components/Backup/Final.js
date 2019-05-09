/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../Button';

import { writeFile } from '../../utils/helpers';
import { PRIVATE_KEY_PREFIX } from '../../utils/constants';

import success from '../../assets/success.png';

import styles from '../App/index.css';

class Final extends Component {
  componentWillMount() {
    this.backupPrivateKeys();
  }

  backupPrivateKeys = () => {
    const { drives, keys } = this.props;

    const { emptyDrive } = drives;
    const keysForRestore = keys;

    keysForRestore.forEach(k => {
      const { account, privateKey } = k;
      const path = `${emptyDrive}/${PRIVATE_KEY_PREFIX}${account}.txt`;

      writeFile(path, privateKey);
    });
  };

  render() {
    const { onCancel } = this.props;

    return (
      <Fragment>
        <div className={styles.container}>
          <img src={success} className={styles.icon} alt="" />
          <div className={styles.message}>
            You have successfully created backed up your PRIVATE key Drive
          </div>
        </div>
        <div className={styles.rowControls}>
          <Button onClick={onCancel} primary>
            Done
          </Button>
        </div>
      </Fragment>
    );
  }
}

Final.propTypes = {
  onCancel: PropTypes.func.isRequired,
  drives: PropTypes.shape({
    emptyDrive: PropTypes.string,
    publicDrive: PropTypes.string,
    privateDrive: PropTypes.string
  }),
  keys: PropTypes.array
};

Final.defaultProps = {
  drives: {},
  keys: []
};

const mapStateToProps = state => ({
  keys: state.account.keys,
  drives: state.drive.drives
});

export default connect(mapStateToProps)(Final);
