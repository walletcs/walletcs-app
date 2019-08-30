/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import fs from 'fs';
import { EtherKeyPair, BitcoinCheckPair } from 'walletcs/src/index';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';

import Button from '../Button';
import Checkbox from '../Checkbox';
import Table from '../Table';

import { writeFile } from '../../utils/helpers';
import { setPublicKeys, setGeneratedFlag } from '../../actions/account';

import { PUBLIC_KEY_PREFIX } from '../../utils/constants';

import styles from '../App/index.css';

class DetectPublicAddresses extends Component {
  state = { generateAddreses: true, generateXpubs: false };

  componentWillMount() {
    this.setupPublicKeys();
  }

  onGenerateChange = () => {
    const { generateAddreses } = this.state;

    this.setState({ generateAddreses: !generateAddreses });
  };

  onGenerateXpubsChange = () => {
    const { generateXpubs } = this.state;

    this.setState({ generateXpubs: !generateXpubs });
  }

  restorePublicKeys = () => {
    const { generateAddreses } = this.state;
    const {
      publicKeys, activeDrive, setGeneratedFlagAction, next,
    } = this.props;
    const { path } = activeDrive;

    if (generateAddreses) {
      const keysForGenerate = publicKeys.filter(f => !f.found);

      keysForGenerate.forEach((k) => {
        let address;

        try {
          if (k.keyBlockchain === 'ETH') {
            address = EtherKeyPair.recoveryPublicKey(k.privateKey);
          } else {
            address = BitcoinCheckPair.recoveryPublicKey(k.privateKey, k.keyNetwork);
          }
        } catch (error) {
          console.log('Invalid public key');
        }

        const { account } = k;
        const filePath = `${path}/${PUBLIC_KEY_PREFIX}${account}.txt`;
        writeFile(filePath, address, { txt: true });
      });
    }

    setGeneratedFlagAction(generateAddreses);
    next();
  };

  setupPublicKeys = () => {
    let publicKeysFiles = [];
    const { setPublicKeysAction, activeDrive, keys } = this.props;
    const { path } = activeDrive;

    try {
      publicKeysFiles = fs.readdirSync(path) || [];
    } catch (error) {
      console.error(error);
    }

    const publicKeys = publicKeysFiles
      .filter(f => f.startsWith(PUBLIC_KEY_PREFIX))
      .map((pkfile) => {
        let res;

        try {
          res = fs.readFileSync(`${path}/${pkfile}`, 'utf-8');
        } catch (error) {
          console.error(error);
        }

        return res;
      });

    const preparedPublicKeys = keys.map(item => ({
      ...item,
      found: publicKeys.includes(item.publicKey),
    }));

    setPublicKeysAction(preparedPublicKeys);
  };

  render() {
    const { onCancel, publicKeys } = this.props;
    const { generateAddreses, generateXpubs } = this.state;

    const keys = publicKeys || [];
    const data = keys.map((item) => {
      const found = item.found ? 'Yes' : 'No';
      return {
        id: item.publicKey,
        fields: [item.account, item.publicKey, found],
      };
    });

    const isGenerateNeedeed = keys.some(k => !k.found);

    return (
      <Fade>
        <div className={styles.contentWrapper}>
          <Table data={data} headers={['ACCOUNT', 'ADDRESS', 'FOUND']} />
          <div className={styles.generateCheckboxContainer}>
            {isGenerateNeedeed && (
              <Checkbox
                checked={generateAddreses}
                onChange={this.onGenerateChange}
                label="Generate missing addresses"
              />
            )}
          </div>
          <div className={styles.generateCheckboxContainer}>
            <Checkbox
              checked={generateXpubs}
              onChange={this.onGenerateXpubsChange}
              label="Generate xPUBs"
            />
          </div>
        </div>
        <div className={styles.rowControls}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={this.restorePublicKeys} primary>
            Next
          </Button>
        </div>
      </Fade>
    );
  }
}

DetectPublicAddresses.propTypes = {
  next: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  setGeneratedFlagAction: PropTypes.func.isRequired,
  setPublicKeysAction: PropTypes.func.isRequired,
  activeDrive: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
  keys: PropTypes.array,
  publicKeys: PropTypes.array,
};

DetectPublicAddresses.defaultProps = {
  keys: [],
  publicKeys: [],
};

const mapStateToProps = state => ({
  publicKeys: state.account.publicKeys,
  keys: state.account.keys,
  activeDrive: state.drive.activeDrive,
});

const mapDispatchToProps = dispatch => ({
  setPublicKeysAction: keys => dispatch(setPublicKeys(keys)),
  setGeneratedFlagAction: flag => dispatch(setGeneratedFlag(flag)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetectPublicAddresses);
