import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { EtherKeyPair } from 'walletcs/src/index';

import { setAccountName, setAddress } from '../../actions/account';
import { resetDrives } from '../../actions/drive';
import { writeFile } from '../../utils/helpers';
import { PRIVATE_KEY_PREFIX } from '../../utils/constants';

import Button from '../Button';

import styles from '../App/index.css';

class GeneratePrivate extends Component {
  state = {
    addressName: '',
    loadingMsg: null
  }

  handleChange = addressName => {
    this.setState({ addressName });
  }

  onSave = async () => {
    await this.savePrivateKey();
    this.props.setAccountName(this.state.addressName);
    this.props.next();
  }

  generatePair = () => {
    const { address, privateKey } = EtherKeyPair.generatePair();

    return new Promise(resolve => resolve({ address, privateKey }));
  }

  savePrivateKey = async () => {
    const { addressName } = this.state;
    if (!addressName) {
      return;
    }

    this.setState({ loadingMsg: 'Generating private key...' });
    const { privateDrive, emptyDrive } = this.props.drives;

    const res = await this.generatePair();

    const path = `${privateDrive || emptyDrive}/${PRIVATE_KEY_PREFIX}${this.state.addressName}.txt`;
    writeFile(path, res.privateKey);
    this.props.setAddress(res.address);
    this.props.resetDrives();
    this.setState({ loadingMsg: null });
  }

  render() {
    return (
      <Fragment>
        <div style={{ flex: 4 }}>
          <div className={styles.inputWrapper}>
            <div className={styles.label}>
              Account name
            </div>
            <input
              type='text'
              disabled={this.props.loadingMsg}
              className={styles.input}
              onChange={e => this.handleChange(e.target.value)}
              addressName={this.state.addressName || this.props.inputaddressName}
            />
          </div>
          <div className={styles.privateTextGen}>
            Private key is used to transfer funds or perform secure operations from your account. It must be kept secure at all times.
          </div>
          <div style={{ top: '20%', backgroundColor: '#E53838', borderRadius: 2 }}>
            <div style={{ color: '#FFF', fontSize: 18, textAlign: 'center', padding: 20 }}>
              Do not plug in flash drive with the Private Key into any online device
            </div>
          </div>
        </div>
        <div className={styles.rowControls}>
          {this.props.loadingMsg ?
            <div>{this.props.loadingMsg}</div>
          :
            <Fragment>
              <Button onClick={this.props.onCancel}>
                Cancel
              </Button>
              <Button onClick={this.onSave} primary>
                Save private key
              </Button>
            </Fragment>
          }
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    drives: state.drive.drives
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setAccountName: name => dispatch(setAccountName(name)),
    setAddress: address => dispatch(setAddress(address)),
    resetDrives: path => dispatch(resetDrives(path))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneratePrivate);