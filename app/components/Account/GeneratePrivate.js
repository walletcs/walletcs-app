/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { EtherKeyPair, BitcoinCheckPair } from 'walletcs/src/index';
import { RadioGroup, Radio } from 'react-radio-group';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';

import { setAccountName, setAddress } from '../../actions/account';
import { resetActiveDrive } from '../../actions/drive';
import { writeFile } from '../../utils/helpers';
import { PRIVATE_KEY_PREFIX } from '../../utils/constants';

import Button from '../Button';

import styles from '../App/index.css';

class GeneratePrivate extends Component {
  state = {
    addressName: '',
    blockchain: null,
    loadingMsg: null,
    error: null,
  };

  handleChange = (addressName) => {
    this.setState({ addressName });
  };

  handleTypeChange = (blockchain) => {
    this.setState({ blockchain });
  };

  handleNetworkChange = (network) => {
    this.setState({ network });
  };

  onSave = async () => {
    const { blockchain, addressName } = this.state;
    const { setAccountNameAction, next } = this.props;

    if (!blockchain || !addressName) {
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
    const { blockchain, network } = this.state;

    if (blockchain === 'ETH') {
      [addressValue, privateKeyValue] = EtherKeyPair.generatePair();
    } else {
      const pair = BitcoinCheckPair.generatePair(network);

      [addressValue, privateKeyValue] = pair;
    }

    return new Promise(resolve => resolve({ addressValue, privateKeyValue }));
  };

  savePrivateKey = async () => {
    const { addressName, network, blockchain } = this.state;
    const { setAddressAction, resetActiveDriveAction } = this.props;

    if (!addressName) {
      return false;
    }

    this.setState({ error: null, loadingMsg: 'Generating private key...' });
    const { activeDrive = {} } = this.props;

    const res = await this.generatePair();

    const path = `${activeDrive.path}/${PRIVATE_KEY_PREFIX}${addressName}.json`;

    try {
      writeFile(path, {
        key: res.privateKeyValue,
        network: blockchain === 'ETH' ? 'ETH' : network,
        blockchain,
      });
    } catch (_) {
      this.setState({
        error: 'File already exists. Please enter a different name',
        loadingMsg: null,
      });
      return false;
    }

    setAddressAction(res.addressValue, network);
    resetActiveDriveAction();
    this.setState({ loadingMsg: null });

    return true;
  };

  render() {
    const {
      loadingMsg, addressName, blockchain, network, error,
    } = this.state;
    const { inputaddressName, onCancel } = this.props;
    const showNext = blockchain === 'BTC' ? !!network : !!blockchain;

    return (
      <Fade>
        <div className={styles.contentWrapper}>
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
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Blockchain:</div>
              <RadioGroup
                name="blockchain"
                selectedValue={blockchain}
                onChange={this.handleTypeChange}
              >
                <label className={styles.radio}>
                  <Radio value="BTC" />
                  <span>BTC</span>
                </label>
                <label className={styles.radio}>
                  <Radio value="ETH" />
                  <span>ETH</span>
                </label>
              </RadioGroup>
            </div>
            {blockchain === 'BTC' && (
              <div style={{ flex: 1 }}>
                <div className={styles.label}>Network:</div>
                <RadioGroup
                  name="network"
                  selectedValue={network}
                  onChange={this.handleNetworkChange}
                >
                  <label className={styles.radio}>
                    <Radio value="main" />
                    <span>Main</span>
                  </label>
                  <label className={styles.radio}>
                    <Radio value="test3" />
                    <span>Test</span>
                  </label>
                </RadioGroup>
              </div>
            )}
          </div>
        </div>
        <div>{error}</div>
        <div className={styles.rowControls}>
          {loadingMsg ? (
            <div style={{ margin: 'auto', marginBottom: 65 }}>{loadingMsg}</div>
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
      </Fade>
    );
  }
}

GeneratePrivate.propTypes = {
  activeDrive: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
  inputaddressName: PropTypes.string,
  next: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  resetActiveDriveAction: PropTypes.func.isRequired,
  setAccountNameAction: PropTypes.func.isRequired,
  setAddressAction: PropTypes.func.isRequired,
};

GeneratePrivate.defaultProps = {
  inputaddressName: '',
};

const mapStateToProps = state => ({
  activeDrive: state.drive.activeDrive,
});

const mapDispatchToProps = dispatch => ({
  setAccountNameAction: name => dispatch(setAccountName(name)),
  setAddressAction: (address, network) => dispatch(setAddress(address, network)),
  resetActiveDriveAction: () => dispatch(resetActiveDrive()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GeneratePrivate);
