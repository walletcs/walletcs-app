/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { EtherKeyPair, BitcoinCheckPair } from 'walletcs/src/index';
import { RadioGroup, Radio } from 'react-radio-group';
import PropTypes from 'prop-types';

import { setAccountName, setAddress } from '../../actions/account';
import { resetDrives } from '../../actions/drive';
import { writeFile } from '../../utils/helpers';
import { PRIVATE_KEY_PREFIX } from '../../utils/constants';

import Button from '../Button';

import styles from '../App/index.css';

class GeneratePrivate extends Component {
  state = {
    addressName: '',
    transactionType: null,
    loadingMsg: null,
    error: null,
  };

  handleChange = (addressName) => {
    this.setState({ addressName });
  };

  handleTypeChange = (transactionType) => {
    this.setState({ transactionType });
  };

  handleNetworkChange = (transactionNetwork) => {
    this.setState({ transactionNetwork });
  };

  onSave = async () => {
    const { transactionType, addressName } = this.state;
    const { setAccountNameAction, next } = this.props;

    if (!transactionType || !addressName) {
      return;
    }

    const result = await this.savePrivateKey();

    if (result) {
      setAccountNameAction(addressName);
      next();
    }
  };

  generatePair = () => {
    let addressValue;
    let privateKeyValue;
    const { transactionType, transactionNetwork } = this.state;

    if (transactionType === 'eth') {
      const pair = EtherKeyPair.generatePair();

      addressValue = pair.address;
      privateKeyValue = pair.privateKey;
    } else {
      const pair = BitcoinCheckPair.generatePair(transactionNetwork);

      [addressValue, privateKeyValue] = pair;
    }

    return new Promise(resolve => resolve({ addressValue, privateKeyValue }));
  };

  savePrivateKey = async () => {
    const { addressName, transactionNetwork } = this.state;
    const { setAddressAction, resetDrivesAction } = this.props;

    if (!addressName) {
      return false;
    }

    this.setState({ loadingMsg: 'Generating private key...' });
    const { drives } = this.props;
    const { privateDrive, emptyDrive } = drives;

    const res = await this.generatePair();

    const path = `${privateDrive || emptyDrive}/${PRIVATE_KEY_PREFIX}${addressName}.json`;

    try {
      writeFile(path, { key: res.privateKeyValue, network: transactionNetwork });
    } catch (_) {
      this.setState({
        error: 'File already exists. Please enter a different name',
        loadingMsg: null,
      });
      return false;
    }

    setAddressAction(res.addressValue, transactionNetwork);
    resetDrivesAction();
    this.setState({ loadingMsg: null });

    return true;
  };

  render() {
    const {
      loadingMsg, addressName, transactionType, transactionNetwork, error,
    } = this.state;
    const { inputaddressName, onCancel } = this.props;
    const showNext = transactionType === 'btc' ? !!transactionNetwork : !!transactionType;

    return (
      <Fragment>
        <div style={{ width: '100%' }}>
          <div className={styles.inputWrapper}>
            <div className={styles.label}>Account name</div>
            <input
              type="text"
              disabled={loadingMsg}
              className={styles.input}
              onChange={e => this.handleChange(e.target.value)}
              defaultValue={addressName || inputaddressName}
            />
          </div>
          <div className={styles.radioGroup}>
            <div className={styles.label}>Key type:</div>
            <RadioGroup
              name="transactionType"
              selectedValue={transactionType}
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
            {transactionType === 'btc' && (
              <Fragment>
                <div className={styles.label}>Network:</div>
                <RadioGroup
                  name="transactionNetwork"
                  selectedValue={transactionNetwork}
                  onChange={this.handleNetworkChange}
                >
                  <div>
                    <Radio value="main" />
                    Main
                  </div>
                  <div>
                    <Radio value="test3" />
                    Test
                  </div>
                </RadioGroup>
              </Fragment>
            )}
          </div>
        </div>
        <div>{error}</div>
        <div className={styles.rowControls}>
          {loadingMsg ? (
            <div style={{ display: 'block' }}>
              <div style={{ margin: 'auto' }}>{loadingMsg}</div>
            </div>
          ) : (
            <Fragment>
              <Button onClick={onCancel}>Cancel</Button>
              {showNext && (
                <Button onClick={this.onSave} primary>
                  Save private key
                </Button>
              )}
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  }
}

GeneratePrivate.propTypes = {
  drives: PropTypes.shape({
    emptyDrive: PropTypes.string,
    publicDrive: PropTypes.string,
    privateDrive: PropTypes.string,
  }),
  inputaddressName: PropTypes.string,
  next: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  resetDrivesAction: PropTypes.func.isRequired,
  setAccountNameAction: PropTypes.func.isRequired,
  setAddressAction: PropTypes.func.isRequired,
};

GeneratePrivate.defaultProps = {
  drives: {},
  inputaddressName: '',
};

const mapStateToProps = state => ({
  drives: state.drive.drives,
});

const mapDispatchToProps = dispatch => ({
  setAccountNameAction: name => dispatch(setAccountName(name)),
  setAddressAction: (address, network) => dispatch(setAddress(address, network)),
  resetDrivesAction: path => dispatch(resetDrives(path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GeneratePrivate);
