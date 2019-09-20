/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import fs from 'fs';
import { EtherWalletHD, BitcoinWalletHD } from '@exiliontech/walletcs';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';

import Button from '../Button';
import Table from '../Table';

import { PRIVATE_KEY_PREFIX } from '../../utils/constants';
import { setPrivateKeys } from '../../actions/account';

import styles from '../App/index.module.css';

class DetectPrivateKeys extends Component {
  componentWillMount() {
    this.setupPrivateKeys();
  }

  setupPrivateKeys = () => {
    let dir = [];
    const { activeDrive, setPrivateKeysAction } = this.props;
    const { path } = activeDrive;

    if (!path) {
      return;
    }

    try {
      dir = fs.readdirSync(path) || [];
    } catch (error) {
      console.error(error);
    }

    const res = dir
      .filter(file => file.startsWith(PRIVATE_KEY_PREFIX))
      .map((file) => {
        let xPrv;
        let xPub;
        let keyData;
        let keyNetwork;
        let keyBlockchain;

        try {
          const privateKeyData = fs.readFileSync(`${path}/${file}`, 'utf-8');
          const privateKeyParsedData = JSON.parse(privateKeyData) || {};
          xPrv = privateKeyParsedData.xPrv;
          xPub = privateKeyParsedData.xPub;
          keyNetwork = privateKeyParsedData.network;
          keyBlockchain = privateKeyParsedData.blockchain;
          let wallet;

          if (keyBlockchain === 'ETH') {
            wallet = new EtherWalletHD();
          } else {
            wallet = new BitcoinWalletHD(keyNetwork);
          }
          keyData = wallet.getAddressWithPrivateFromXprv(xPrv, 0);
        } catch (error) {
          console.error(error);
        }

        return {
          xPrv,
          xPub,
          publicKey: keyData.address,
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
      flex: [1, 2, 1],
      fields: [item.account, item.publicKey, item.keyNetwork],
    }));

    return (
      <Fade>
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
  keys: PropTypes.array,
};

DetectPrivateKeys.defaultProps = {
  keys: [],
};

const mapStateToProps = state => ({
  keys: state.account.keys,
  activeDrive: state.drive.activeDrive,
});

const mapDispatchToProps = dispatch => ({
  setPrivateKeysAction: keys => dispatch(setPrivateKeys(keys)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetectPrivateKeys);
