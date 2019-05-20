/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-console */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import fs from 'fs';
import { EtherKeyPair, BitcoinCheckPair } from 'walletcs/src/index';
import PropTypes from 'prop-types';

import Button from '../Button';
import Table from '../Table';

import { PRIVATE_KEY_PREFIX } from '../../utils/constants';
import { setPrivateKeys } from '../../actions/account';

import styles from '../App/index.css';

class DetectPrivateKeys extends Component {
  componentWillMount() {
    this.setupPrivateKeys();
  }

  setupPrivateKeys = () => {
    let dir = [];
    const { drives, setPrivateKeysAction } = this.props;
    const { privateDrive } = drives;

    if (!privateDrive) {
      return;
    }

    try {
      dir = fs.readdirSync(privateDrive) || [];
    } catch (error) {
      console.error(error);
    }

    const res = dir
      .filter(file => file.startsWith(PRIVATE_KEY_PREFIX))
      .map((file) => {
        let privateKey;
        let publicKey;
        let keyNetwork;
        let keyBlockchain;

        try {
          const privateKeyData = fs.readFileSync(`${privateDrive}/${file}`, 'utf-8');
          const privateKeyParsedData = JSON.parse(privateKeyData) || {};
          privateKey = privateKeyParsedData.key;
          keyNetwork = privateKeyParsedData.network;
          keyBlockchain = privateKeyParsedData.blockchain;

          if (keyBlockchain === 'ETH') {
            publicKey = EtherKeyPair.recoveryPublicKey(privateKey);
          } else {
            publicKey = BitcoinCheckPair.recoveryPublicKey(privateKey, keyNetwork);
          }
        } catch (error) {
          console.error(error);
        }

        return {
          privateKey,
          publicKey,
          keyNetwork,
          keyBlockchain,
          account: file.replace(PRIVATE_KEY_PREFIX, '').replace('.json', ''),
        };
      });

    setPrivateKeysAction(res);
  };

  render() {
    const { keys = [], next, onCancel } = this.props;
    const isKeysExists = !!keys.length;

    const data = keys.map(item => ({
      id: item.publicKey,
      fields: [item.account, item.publicKey, item.keyNetwork],
    }));

    return (
      <Fragment>
        <div className={styles.contentWrapper}>
          {isKeysExists ? (
            <Table data={data} headers={['NAME', 'ADDRESS', 'NETWORK']} />
          ) : (
            <div className={styles.message}>Private keys not found</div>
          )}
        </div>
        <div className={styles.rowControls}>
          <Button onClick={onCancel}>Cancel</Button>
          {isKeysExists && (
            <Button onClick={next} primary>
              Next
            </Button>
          )}
        </div>
      </Fragment>
    );
  }
}

DetectPrivateKeys.propTypes = {
  next: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  setPrivateKeysAction: PropTypes.func.isRequired,
  drives: PropTypes.shape({
    emptyDrive: PropTypes.string,
    publicDrive: PropTypes.string,
    privateDrive: PropTypes.string,
  }),
  keys: PropTypes.array,
};

DetectPrivateKeys.defaultProps = {
  drives: {},
  keys: [],
};

const mapStateToProps = state => ({
  keys: state.account.keys,
  drives: state.drive.drives,
});

const mapDispatchToProps = dispatch => ({
  setPrivateKeysAction: keys => dispatch(setPrivateKeys(keys)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetectPrivateKeys);
