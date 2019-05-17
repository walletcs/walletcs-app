/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import fs from 'fs';
import { EtherKeyPair, BitcoinCheckPair } from 'walletcs/src/index';
import PropTypes from 'prop-types';

import Button from '../Button';
import Checkbox from '../Checkbox';
import Table from '../Table';

import { writeFile } from '../../utils/helpers';
import { setPublicKeys, setGeneratedFlag } from '../../actions/account';

import { PUBLIC_KEY_PREFIX } from '../../utils/constants';

import styles from '../App/index.css';

class DetectPublicAddresses extends Component {
  state = { generate: true };

  componentWillMount() {
    this.setupPublicKeys();
  }

  onGenerateChange = () => {
    const { generate } = this.state;

    this.setState({ generate: !generate });
  };

  restorePublicKeys = () => {
    const { generate } = this.state;
    const {
      publicKeys, drives, setGeneratedFlagAction, next,
    } = this.props;

    if (generate) {
      const keysForGenerate = publicKeys.filter(f => !f.found);
      const { publicDrive, emptyDrive } = drives;
      const drive = publicDrive || emptyDrive;

      keysForGenerate.forEach((k) => {
        let address;

        try {
          if (k.keyType === 'ETH') {
            address = EtherKeyPair.recoveryPublicKey(k.privateKey);
          } else {
            address = BitcoinCheckPair.recoveryPublicKey(k.privateKey, k.keyNetwork);
          }
        } catch (error) {
          console.log('Invalid public key');
        }

        const { account } = k;
        const path = `${drive}/${PUBLIC_KEY_PREFIX}${account}.txt`;
        writeFile(path, address, { txt: true });
      });
    }

    setGeneratedFlagAction(generate);
    next();
  };

  setupPublicKeys = () => {
    let publicKeysFiles = [];
    const { setPublicKeysAction, drives, keys } = this.props;
    const { publicDrive, emptyDrive } = drives;
    const drive = publicDrive || emptyDrive;

    try {
      publicKeysFiles = fs.readdirSync(drive) || [];
    } catch (error) {
      console.error(error);
    }

    const publicKeys = publicKeysFiles
      .filter(f => f.startsWith(PUBLIC_KEY_PREFIX))
      .map((pkfile) => {
        let res;

        try {
          res = fs.readFileSync(`${drive}/${pkfile}`, 'utf-8');
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
    const { generate } = this.state;

    const keys = publicKeys || [];
    const data = keys.map((item) => {
      const found = item.found ? 'Yes' : 'No';
      return {
        id: item.publicKey,
        fields: [item.account, item.publicKey, found],
      };
    });

    return (
      <Fragment>
        <Table data={data} headers={['ACCOUNT', 'ADDRESS', 'FOUND']} />
        <div className={styles.generateCheckboxContainer}>
          <Checkbox
            checked={generate}
            onChange={this.onGenerateChange}
            label="Generate missing keys"
          />
        </div>
        <div className={styles.rowControls}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={this.restorePublicKeys} primary>
            Next
          </Button>
        </div>
      </Fragment>
    );
  }
}

DetectPublicAddresses.propTypes = {
  next: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  setGeneratedFlagAction: PropTypes.func.isRequired,
  setPublicKeysAction: PropTypes.func.isRequired,
  drives: PropTypes.shape({
    emptyDrive: PropTypes.string,
    publicDrive: PropTypes.string,
    privateDrive: PropTypes.string,
  }),
  keys: PropTypes.array,
  publicKeys: PropTypes.array,
};

DetectPublicAddresses.defaultProps = {
  drives: {},
  keys: [],
  publicKeys: [],
};

const mapStateToProps = state => ({
  publicKeys: state.account.publicKeys,
  keys: state.account.keys,
  drives: state.drive.drives,
});

const mapDispatchToProps = dispatch => ({
  setPublicKeysAction: keys => dispatch(setPublicKeys(keys)),
  setGeneratedFlagAction: flag => dispatch(setGeneratedFlag(flag)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetectPublicAddresses);
