/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';

import Button from '../Button';

import { writeFile } from '../../utils/helpers';
import { PRIVATE_KEY_PREFIX } from '../../utils/constants';

import styles from '../App/index.css';

class Final extends Component {
  componentWillMount() {
    this.backupPrivateKeys();
  }

  backupPrivateKeys = () => {
    const { activeDrive = {}, keys } = this.props;
    const { path } = activeDrive;

    const keysForRestore = keys;

    keysForRestore.forEach((k) => {
      const { account, privateKeyParsedData } = k;
      const filePath = `${path}/${PRIVATE_KEY_PREFIX}${account}.json`;

      writeFile(filePath, privateKeyParsedData);
    });
  };

  render() {
    const { onCancel } = this.props;

    return (
      <Fade>
        <div className={styles.contentWrapper}>
          <div className={styles.message}>
            You have successfully backed up your drive with private key
          </div>
        </div>
        <div className={styles.rowControls}>
          <Button onClick={onCancel} primary>
            Done
          </Button>
        </div>
      </Fade>
    );
  }
}

Final.propTypes = {
  onCancel: PropTypes.func.isRequired,
  activeDrive: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
  keys: PropTypes.array,
};

Final.defaultProps = {
  keys: [],
};

const mapStateToProps = state => ({
  keys: state.account.keys,
  activeDrive: state.drive.activeDrive,
});

export default connect(mapStateToProps)(Final);
