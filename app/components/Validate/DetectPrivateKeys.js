import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import fs from 'fs';
import { EtherKeyPair } from 'walletcs/src/index';

import Button from '../Button';

import { PRIVATE_KEY_PREFIX } from '../../utils/constants';
import { setPrivateKeys } from '../../actions/account';

import styles from '../App/index.css';

class DetectPrivateKeys extends Component {
  componentWillMount() {
    this.setupPrivateKeys();
  }

  setupPrivateKeys = () => {
    let dir = [];
    const { privateDrive } = this.props.drives;

    try {
      dir = fs.readdirSync(privateDrive) || [];
    } catch (error) {
      console.error(error);
    }

    const res = dir
      .filter(file => file.startsWith(PRIVATE_KEY_PREFIX))
      .map(file => {
        let privateKey;
        let publicKey;

        try {
          privateKey = fs.readFileSync(`${privateDrive}/${file}`, 'utf-8');
          publicKey = EtherKeyPair.recoveryPublicKey(privateKey);
        } catch (error) {
          console.error(error);
        }

        return {
          privateKey,
          publicKey,
          account: file.replace(PRIVATE_KEY_PREFIX, '').replace('.txt', '')
        };
      });

    this.props.setPrivateKeys(res);
  };

  render() {
    const { keys = [] } = this.props;
    const isKeysExists = !!keys.length;

    return (
      <Fragment>
        <div>
          {isKeysExists ? (
            <Fragment>
              <div className={styles.tableCell} App={{ color: '#ABABAB' }}>
                ADDRESS
              </div>
              {keys.map(item => (
                <div className={styles.tableCell}>{item.publicKey}</div>
              ))}
            </Fragment>
          ) : (
            <div className={styles.message}>Private keys not found</div>
          )}
        </div>
        <div className={styles.rowControls}>
          <Button onClick={this.props.onCancel}>Cancel</Button>
          {isKeysExists && (
            <Button onClick={this.props.next} primary>
              Next
            </Button>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    keys: state.account.keys,
    drives: state.drive.drives
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPrivateKeys: keys => dispatch(setPrivateKeys(keys))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetectPrivateKeys);
