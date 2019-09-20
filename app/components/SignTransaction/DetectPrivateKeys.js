/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import fs from 'fs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';

import Button from '../Button';

import { setPrivateKeys } from '../../actions/account';
import { PRIVATE_KEY_PREFIX } from '../../utils/constants';

import styles from '../App/index.module.css';

class DetectPrivateKeys extends Component {
  componentWillMount() {
    this.setupPrivateKeys();
  }

  setupPrivateKeys = () => {
    let dir = [];
    const { activeDrive, setPrivateKeysAction } = this.props;
    const { path } = activeDrive;

    try {
      dir = fs.readdirSync(path) || [];
    } catch (error) {
      console.error(error);
    }

    const privateKeys = dir
      .filter(file => file.startsWith(PRIVATE_KEY_PREFIX))
      .map((file) => {
        let privateKeyParsedData;

        try {
          const privateKeyData = fs.readFileSync(`${path}/${file}`, 'utf-8');
          privateKeyParsedData = JSON.parse(privateKeyData) || {};
        } catch (error) {
          console.error(error);
        }

        return privateKeyParsedData;
      })
      .filter(f => !!f);

    setPrivateKeysAction(privateKeys);
  };

  render() {
    const { privateKeys = [], next, onCancel } = this.props;

    return (
      <Fade>
        <div className={styles.contentWrapper}>
          {privateKeys.length ? (
            <div className={styles.message}>{`Found ${privateKeys.length} private keys`}</div>
          ) : (
            <div className={styles.message}>Private keys for signing transactions not found</div>
          )}
        </div>
        <div className={styles.rowControls}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={next} primary>
            Sign
          </Button>
        </div>
      </Fade>
    );
  }
}

DetectPrivateKeys.propTypes = {
  next: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  setPrivateKeysAction: PropTypes.func.isRequired,
  activeDrive: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
  privateKeys: PropTypes.array,
};

DetectPrivateKeys.defaultProps = {
  privateKeys: [],
};

const mapStateToProps = state => ({
  activeDrive: state.drive.activeDrive,
  transactions: state.account.transactions,
  privateKeys: state.account.keys,
});

const mapDispatchToProps = dispatch => ({
  setPrivateKeysAction: keys => dispatch(setPrivateKeys(keys)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetectPrivateKeys);
