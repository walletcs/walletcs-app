import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import fs from 'fs';
import { EtherKeyPair } from 'walletcs/src/index';

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
    this.setState({ generate: !this.state.generate });
  };

  restorePublicKeys = () => {
    if (this.state.generate) {
      const keysForGenerate = this.props.publicKeys.filter(f => !f.found);
      const { publicDrive, emptyDrive } = this.props.drives;
      const drive = publicDrive || emptyDrive;

      keysForGenerate.forEach(k => {
        const address = EtherKeyPair.recoveryPublicKey(k.privateKey);
        const { account } = k;
        const path = `${drive}/${PUBLIC_KEY_PREFIX}${account}.txt`;
        writeFile(path, address);
      });
    }

    this.props.setGeneratedFlag(this.state.generate);
    this.props.next();
  };

  setupPublicKeys = () => {
    let publicKeysFiles = [];
    const { publicDrive, emptyDrive } = this.props.drives;
    const drive = publicDrive || emptyDrive;

    try {
      publicKeysFiles = fs.readdirSync(drive) || [];
    } catch (error) {
      console.error(error);
    }

    const publicKeys = publicKeysFiles
      .filter(f => f.startsWith(PUBLIC_KEY_PREFIX))
      .map(pkfile => {
        let res;

        try {
          res = fs.readFileSync(`${drive}/${pkfile}`, 'utf-8');
        } catch (error) {
          console.error(error);
        }

        return res;
      });

    const preparedPublicKeys = this.props.keys.map(item => ({
      ...item,
      found: publicKeys.includes(item.publicKey)
    }));

    this.props.setPublicKeys(preparedPublicKeys);
  };

  render() {
    const keys = this.props.publicKeys || [];
    const data = keys.map(item => {
      const found = item.found ? 'Yes' : 'No';
      return {
        id: item.publicKey,
        fields: [item.account, item.publicKey, found]
      };
    });

    return (
      <Fragment>
        <Table data={data} headers={['ACCOUNT', 'ADDRESS', 'FOUND']} />
        <div className={styles.generateCheckboxContainer}>
          <Checkbox
            checked={this.state.generate}
            onChange={this.onGenerateChange}
            label="Generate missing keys"
          />
        </div>
        <div className={styles.rowControls}>
          <Button onClick={this.props.onCancel}>Cancel</Button>
          <Button onClick={this.restorePublicKeys} primary>
            Next
          </Button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    publicKeys: state.account.publicKeys,
    keys: state.account.keys,
    drives: state.drive.drives
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPublicKeys: keys => dispatch(setPublicKeys(keys)),
    setGeneratedFlag: flag => dispatch(setGeneratedFlag(flag))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetectPublicAddresses);
