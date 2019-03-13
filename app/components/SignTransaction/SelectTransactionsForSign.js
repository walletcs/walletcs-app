import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { EtherTransaction } from 'walletcs/src/index';

import Button from '../Button';

import { SIGNED_TRANSACTION_PREFIX, TRANSACTION_PREFIX } from '../../utils/constants';

import styles from '../App/index.css';
import { writeFile } from '../../utils/helpers';

class SelectTransactionsForSign extends Component {
  next = async () => {
    await this.signTransactions();
    this.props.next();
  }

  getTransactions = () => {
    return this.props.transactions.filter(
      t => this.props.transactionsToSign.includes(t.file) && t.foundKey
    ) || [];
  }

  signTransactions = async () => {
    const drive = this.props.drives.emptyDrive;
    const transactions = this.getTransactions();

    transactions.forEach(async fullTransaction => {
      const { transaction: data } = fullTransaction;
  
      const signedTransactionsData = await Promise.all(data.transactions.map(async tr => {
        const signature = await EtherTransaction.sign(fullTransaction.privateKey, tr.transaction);

        return { transaction: signature };
      }));
  
      const signedTransaction = { ...fullTransaction.transaction, transactions: signedTransactionsData };
      const filename = fullTransaction.file.replace(TRANSACTION_PREFIX, '');

      const path = `${drive}/${SIGNED_TRANSACTION_PREFIX}${filename}`

      writeFile(path, JSON.stringify(signedTransaction));
    });
  }

  render() {
    const transactions = this.getTransactions();
    const isTransactionsExists = !!transactions.length;

    return (
      <Fragment>
        <div>
          {isTransactionsExists ?
            <Fragment>
              <div className={styles.tableRow}>
                <div className={styles.tableCell} />
                <div className={styles.tableCell} style={{ color: '#ABABAB' }}>FILE</div>
                <div className={styles.tableCell} style={{ color: '#ABABAB' }}>TIME</div>
                <div className={styles.tableCell} style={{ color: '#ABABAB' }}>DETAILS</div>
              </div>
              <Fragment>
                {transactions.map(item => (
                  <div className={styles.tableRow}>
                    <div className={styles.tableCell} />
                    <div className={styles.tableCell}>{item.file}</div>
                    <div className={styles.tableCell} />
                    <div className={styles.tableCell} />
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
          {isTransactionsExists &&
            <Button onClick={this.next} primary>
              Save
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
    transactions: state.account.transactions,
    transactionsToSign: state.account.transactionsToSign
  };
}

export default connect(mapStateToProps)(SelectTransactionsForSign);
