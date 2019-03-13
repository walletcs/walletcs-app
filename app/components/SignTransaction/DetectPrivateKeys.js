import React, { Component, Fragment } from 'react';
import fs from 'fs';
import { EtherKeyPair } from 'walletcs/src/index';
import { connect } from 'react-redux';

import Button from '../Button';

import { setPrivateKeys } from '../../actions/account';
import { PRIVATE_KEY_PREFIX } from '../../utils/constants';

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

    const res = dir.filter(file => file.includes(PRIVATE_KEY_PREFIX)).map(file => {
      let privateKey;

      try {
        privateKey = fs.readFileSync(`${privateDrive}/${file}`, 'utf-8');
      } catch (error) {
        console.error(error);
      }

      const found = this.props.transactions.some(item => {
        const { transaction } = item;
        return EtherKeyPair.checkPair(transaction.pub_key, privateKey);
      })

      return {
        privateKey,
        found,
        account: file.replace(PRIVATE_KEY_PREFIX, '').replace('.txt', '')
      }
    });

    this.props.setPrivateKeys(res);
  }

  render() {
    const keys = this.props.keys || [];
    const isKeysExists = !!keys.length;

    return (
      <Fragment>
        <div>
          {isKeysExists ?
            <Fragment>
              <div className={styles.tableRow}>
                <div className={styles.tableCell} />
                <div className={styles.tableCell} style={{ color: '#ABABAB' }}>ACCOUNT</div>
                <div className={styles.tableCell} style={{ color: '#ABABAB' }}>TIME</div>
                <div className={styles.tableCell} style={{ color: '#ABABAB' }}>KEY FOUND</div>
              </div>
              <Fragment>
                {keys.map(item => (
                  <div className={styles.tableRow}>
                    <div className={styles.tableCell} />
                    <div className={styles.tableCell}>{item.account}</div>
                    <div className={styles.tableCell} />
                    <div className={styles.tableCell}>{item.found ? 'Yes' : 'No'}</div>
                  </div>
                ))}
              </Fragment>
            </Fragment>
          :
            <div className={styles.message}>Private keys not found</div>
          }
        </div>
        <div className={styles.rowControls}>
          <Button onClick={this.props.onCancel}>
            Cancel
          </Button>
          {isKeysExists &&
            <Button onClick={this.props.next} primary>
              Sign
            </Button>
          }
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    keys: state.account.keys,
    drives: state.drive.drives,
    transactions: state.account.transactions
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setPrivateKeys: keys => dispatch(setPrivateKeys(keys))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetectPrivateKeys);