import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { EtherKeyPair, BitcoinCheckPair } from 'walletcs/src/index';
import { RadioGroup, Radio } from 'react-radio-group';
import PropTypes from 'prop-types';

import { setAccountName, setAddress } from '../../actions/account';
import { resetDrives } from '../../actions/drive';
import { writeFile } from '../../utils/helpers';
import { PRIVATE_KEY_PREFIX, BTC_NETWORK } from '../../utils/constants';

import Button from '../Button';

import styles from '../App/index.css';

class GeneratePrivate extends Component {
  state = {
    addressName: '',
    transactionType: null,
    loadingMsg: null
  };

  handleChange = addressName => {
    this.setState({ addressName });
  };

  handleTypeChange = transactionType => {
    this.setState({ transactionType });
  };

  onSave = async () => {
    const { transactionType, addressName } = this.state;

    if (!transactionType || !addressName) {
      return;
    }

    await this.savePrivateKey();
    this.props.setAccountName(this.state.addressName);
    this.props.next();
  };

  generatePair = () => {
    let address;
    let privateKey;

    if (this.state.transactionType === 'ETH') {
      const pair = EtherKeyPair.generatePair();

      address = pair.address;
      privateKey = pair.privateKey;
    } else {
      // console.warn(BitcoinCheckPair);

      const pair = BitcoinCheckPair.generatePair(BTC_NETWORK);

      address = pair[0];
      privateKey = pair[1];
    }

    return new Promise(resolve => resolve({ address, privateKey }));
  };

  savePrivateKey = async () => {
    const { addressName } = this.state;
    if (!addressName) {
      return;
    }

    this.setState({ loadingMsg: 'Generating private key...' });
    const { privateDrive, emptyDrive } = this.props.drives;

    const res = await this.generatePair();

    const path = `${privateDrive || emptyDrive}/${PRIVATE_KEY_PREFIX}${
      this.state.addressName
    }.txt`;
    writeFile(path, res.privateKey);
    this.props.setAddress(res.address);
    this.props.resetDrives();
    this.setState({ loadingMsg: null });
  };

  render() {
    return (
      <Fragment>
        <div style={{ width: '100%' }}>
          <div className={styles.inputWrapper}>
            <div className={styles.label}>Account name</div>
            <input
              type="text"
              disabled={this.props.loadingMsg}
              className={styles.input}
              onChange={e => this.handleChange(e.target.value)}
              defaultValue={
                this.state.addressName || this.props.inputaddressName
              }
            />
          </div>
          <div className={styles.radioGroup}>
            <div className={styles.label}>Key type:</div>
            <RadioGroup
              name="transactionType"
              selectedValue={this.state.transactionType}
              onChange={this.handleTypeChange}
            >
              <div>
                <Radio value="btc" />
                BTC
              </div>
              <div>
                <Radio value="eth" />
                ETH
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className={styles.rowControls}>
          {this.props.loadingMsg ? (
            <div>{this.props.loadingMsg}</div>
          ) : (
            <Fragment>
              <Button onClick={this.props.onCancel}>Cancel</Button>
              <Button onClick={this.onSave} primary>
                Save private key
              </Button>
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  }
}

GeneratePrivate.propTypes = {
  drives: PropTypes.array,
  inputaddressName: PropTypes.string,
  loadingMsg: PropTypes.string,
  next: PropTypes.func,
  onCancel: PropTypes.func,
  resetDrives: PropTypes.func,
  setAccountName: PropTypes.func,
  setAddress: PropTypes.func
};

const mapStateToProps = state => {
  return {
    drives: state.drive.drives
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAccountName: name => dispatch(setAccountName(name)),
    setAddress: address => dispatch(setAddress(address)),
    resetDrives: path => dispatch(resetDrives(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneratePrivate);
