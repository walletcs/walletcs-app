/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { EtherTransaction, BitcoinTransaction } from 'walletcs/src/index';
import omit from 'lodash.omit';
import PropTypes from 'prop-types';

import Button from '../Button';
import { resetAccount } from '../../actions/account';
import { writeFile } from '../../utils/helpers';

import { SIGNED_TRANSACTION_PREFIX, TRANSACTION_PREFIX } from '../../utils/constants';

import styles from '../App/index.css';

class Final extends Component {
  state = {
    signed: false,
    error: null,
  };

  componentWillMount = () => {
    this.signTransactions();
  };

  done = () => {
    const { resetAccountAction, onCancel } = this.props;

    resetAccountAction();
    onCancel();
  };

  // eslint-disable-next-line react/destructuring-assignment
  getTransactions = () => this.props.transactions.filter(t => t.key.privateKey) || [];

  signTransactions = async () => {
    const { drives, rawTransactions } = this.props;

    const drive = drives.emptyDrive;
    const transactions = this.getTransactions();

    rawTransactions.forEach(async (fullTransaction) => {
      const { transaction } = fullTransaction;

      const signedTransactionsData = await Promise.all(
        transaction.transactions.map(async (tr) => {
          const trForSign = transactions.find(t => t.data === tr.transaction.data);

          let signature;

          if (trForSign) {
            const signData = omit(trForSign, 'key', 'extra');

            try {
              if (trForSign.extra.type === 'BTC') {
                signature = await BitcoinTransaction.sign(
                  trForSign.key.privateKey.privateKey,
                  signData,
                  trForSign.key.privateKey.keyNetwork,
                );
              } else {
                signature = await EtherTransaction.sign(
                  trForSign.key.privateKey.privateKey,
                  signData,
                );
              }
            } catch (error) {
              console.error(error);
              this.setState({ error });
            }
          }

          if (signature) {
            return { transaction: signature };
          }

          return tr;
        }),
      );

      const signedTransaction = {
        ...fullTransaction.transaction,
        transactions: signedTransactionsData,
      };

      const filename = fullTransaction.file.replace(TRANSACTION_PREFIX, '').replace(/\(d?\)/, '');

      const path = `${drive}/${SIGNED_TRANSACTION_PREFIX}${filename}`;

      writeFile(path, signedTransaction);
    });

    this.setState({ signed: true });
  };

  render() {
    const signedTransactions = this.getTransactions();
    const { signed, error } = this.state;

    if (!signed) {
      return (
        <div className={styles.container}>
          <div className={styles.message}>Signing...</div>
        </div>
      );
    }

    return (
      <Fragment>
        <div className={styles.contentWrapper}>
          {signedTransactions.length ? (
            <Fragment>
              {error ? (
                <div className={styles.message}>
                  An error has occured while signing transactions:
                  {' '}
                  {error.message}
                </div>
              ) : (
                <Fragment>
                  <div className={styles.message}>
                    You have successfully signed
                    {' '}
                    {signedTransactions.length}
                    {' '}
transactions
                  </div>
                  {signedTransactions.map(item => (
                    <div className={styles.message}>{item.file}</div>
                  ))}
                </Fragment>
              )}
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

Final.propTypes = {
  drives: PropTypes.shape({
    emptyDrive: PropTypes.string,
    publicDrive: PropTypes.string,
    privateDrive: PropTypes.string,
  }),
  onCancel: PropTypes.func.isRequired,
  rawTransactions: PropTypes.array,
  resetAccountAction: PropTypes.func.isRequired,
  transactions: PropTypes.array,
};

Final.defaultProps = {
  transactions: [],
  rawTransactions: [],
  drives: {},
};

const mapStateToProps = state => ({
  drives: state.drive.drives,
  transactions: state.account.transactions,
  transactionsToSign: state.account.transactionsToSign,
  rawTransactions: state.account.rawTransactions,
});

const mapDispatchToProps = dispatch => ({
  resetAccountAction: () => dispatch(resetAccount()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Final);
