import React, { Component, Fragment } from 'react';
import fs from 'fs';
import { EtherKeyPair } from 'walletcs/src/index';
import { connect } from 'react-redux';

import Button from '../Button';
import Table from '../Table';

import { setTransactions } from '../../actions/account';
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

    const privateKeys = dir
      .filter(file => file.startsWith(PRIVATE_KEY_PREFIX))
      .map(file => {
        let privateKey;

        try {
          privateKey = fs.readFileSync(`${privateDrive}/${file}`, 'utf-8');
        } catch (error) {
          console.error(error);
        }

        return privateKey;
      })
      .filter(f => !!f);

    const transactionsWithKeys = this.props.transactions
      .filter(t => this.props.transactionsToSign.includes(t.data))
      .map(transaction => {
        const privateKey = privateKeys.find(k => {
          return EtherKeyPair.checkPair(transaction.extra.pub_key, k);
        });

        return {
          ...transaction,
          key: {
            privateKey,
            foundKey: privateKey ? 'Yes' : 'No'
          }
        };
      })
      .filter(t => this.props.transactionsToSign.includes(t.data));

    this.props.setTransactions(transactionsWithKeys);
  };

  render() {
    const { transactions = [] } = this.props;

    const isTransactionsExists = !!transactions.length;
    const data = transactions.map(tr => ({
      fields: [tr.extra.file, (tr.key || {}).foundKey]
    }));

    return (
      <Fragment>
        {isTransactionsExists ? (
          <Table data={data} headers={['FILE', 'KEY FOUND']} />
        ) : (
          <div className={styles.message}>
            Private keys for signing transactions not found
          </div>
        )}
        <div className={styles.rowControls}>
          <Button onClick={this.props.onCancel}>Cancel</Button>
          {isTransactionsExists && (
            <Button onClick={this.props.next} primary>
              Sign
            </Button>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    drives: state.drive.drives,
    transactions: state.account.transactions,
    transactionsToSign: state.account.transactionsToSign
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTransactions: keys => dispatch(setTransactions(keys))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetectPrivateKeys);
