import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { EtherTransaction } from 'walletcs/src/index';
import omit from 'lodash.omit';

import Button from '../Button';
import { resetAccount } from '../../actions/account';
import { writeFile } from '../../utils/helpers';

import {
  SIGNED_TRANSACTION_PREFIX,
  TRANSACTION_PREFIX
} from '../../utils/constants';

import success from '../../assets/success.png';

import styles from '../App/index.css';

class Final extends Component {
  state = {
    signed: false
  };

  componentWillMount = () => {
    this.signTransactions();
  };

  done = () => {
    this.props.resetAccount();
    this.props.onCancel();
  };

  getTransactions = () => {
    return this.props.transactions.filter(t => t.key.privateKey) || [];
  };

  signTransactions = async () => {
    const drive = this.props.drives.emptyDrive;
    const transactions = this.getTransactions();

    await this.props.rawTransactions.forEach(async fullTransaction => {
      const { transaction } = fullTransaction;

      const signedTransactionsData = await Promise.all(
        transaction.transactions.map(async tr => {
          const trForSign = transactions.find(
            t => t.data === tr.transaction.data
          );
          let signature;

          if (trForSign) {
            const signData = omit(trForSign, 'key', 'extra');
            signature = await EtherTransaction.sign(
              trForSign.key.privateKey,
              signData
            );
          }

          return { transaction: signature || tr };
        })
      );

      const signedTransaction = {
        ...fullTransaction.transaction,
        transactions: signedTransactionsData
      };

      const filename = fullTransaction.file
        .replace(TRANSACTION_PREFIX, '')
        .replace(/\(d?\)/, '');

      const path = `${drive}/${SIGNED_TRANSACTION_PREFIX}${filename}`;

      writeFile(path, JSON.stringify(signedTransaction));
    });

    this.setState({ signed: true });
  };

  render() {
    const signedTransactions = this.getTransactions();

    if (!this.state.signed) {
      return (
        <div className={styles.container}>
          <div className={styles.message}>Signing...</div>
        </div>
      );
    }

    return (
      <Fragment>
        <div className={styles.container}>
          <img src={success} className={styles.icon} alt="" />
          {signedTransactions.length ? (
            <Fragment>
              <div className={styles.message}>
                You have successfully signed {signedTransactions.length}{' '}
                transactions
              </div>
              {signedTransactions.map(item => (
                <div className={styles.message}>{item.file}</div>
              ))}
            </Fragment>
          ) : (
            <div className={styles.message}>Transactions not signed</div>
          )}
        </div>
        <div className={styles.rowControls}>
          <Button onClick={this.done} primary>
            Done
          </Button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  drives: state.drive.drives,
  transactions: state.account.transactions,
  transactionsToSign: state.account.transactionsToSign,
  rawTransactions: state.account.rawTransactions
});

const mapDispatchToProps = dispatch => ({
  resetAccount: () => dispatch(resetAccount())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Final);
