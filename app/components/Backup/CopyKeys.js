/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import fs from 'fs';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';

import Button from '../Button';

import { PRIVATE_KEY_PREFIX } from '../../utils/constants';
import { setPrivateKeys } from '../../actions/account';

import styles from '../App/index.css';

class CopyKeys extends Component {
  componentWillMount() {
    this.setupPrivateKeys();
  }

  setupPrivateKeys = () => {
    let dir = [];
    const { activeDrive = {}, setPrivateKeysAction } = this.props;
    const { path } = activeDrive;

    try {
      dir = fs.readdirSync(path) || [];
    } catch (error) {
      console.error(error);
    }

    const res = dir
      .filter(file => file.startsWith(PRIVATE_KEY_PREFIX))
      .map((file) => {
        let privateKeyParsedData;

        try {
          const privateKeyData = fs.readFileSync(`${path}/${file}`, 'utf-8');
          privateKeyParsedData = JSON.parse(privateKeyData) || {};
        } catch (error) {
          console.error(error);
        }

        return {
          privateKeyParsedData,
          account: file.replace(PRIVATE_KEY_PREFIX, '').replace('.json', ''),
        };
      });

    setPrivateKeysAction(res);
  };

  render() {
    const { onCancel, next } = this.props;

    return (
      <Fade>
        <div className={styles.contentWrapper}>
          <div className={styles.insertPrivate}>Private Key flash drive copied</div>
        </div>
        <div className={styles.rowControls}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={next} primary>
            Next
          </Button>
        </div>
      </Fade>
    );
  }
}

CopyKeys.propTypes = {
  next: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  setPrivateKeysAction: PropTypes.func.isRequired,
  activeDrive: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  keys: state.account.keys,
  activeDrive: state.drive.activeDrive,
});

const mapDispatchToProps = dispatch => ({
  setPrivateKeysAction: k => dispatch(setPrivateKeys(k)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CopyKeys);
