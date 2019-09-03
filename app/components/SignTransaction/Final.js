/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { EtherTransaction, BitcoinTransaction } from 'walletcs/src/index';
import omit from 'lodash.omit';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import Fade from 'react-reveal/Fade';

import Button from '../Button';
import { resetAccount } from '../../actions/account';
import { writeFile } from '../../utils/helpers';

import { SIGNED_TRANSACTION_PREFIX } from '../../utils/constants';

import styles from '../App/index.module.css';

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
    const { activeDrive, rawTransactions } = this.props;
    const transactions = this.getTransactions();
    const { path } = activeDrive;

    rawTransactions.forEach(async (fullTransaction) => {
      const { transaction } = fullTransaction;

      const signedTransactionsData = await Promise.all(
        transaction.transactions.map(async (tr) => {
          const trForSign = transactions.find(t => t.extra.hash === hash(tr.transaction));

          let signature;

          if (trForSign) {
            const signData = omit(trForSign, 'key', 'extra');

            try {
              if (trForSign.extra.blockchain === 'BTC') {
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
            return { object: { ...tr, transaction: signature }, signed: true };
          }

          return { object: tr, signed: false };
        }),
      );

      const isSignedExists = signedTransactionsData.some(t => t.signed);

      if (!isSignedExists) {
        return;
      }

      const signedTransaction = {
        ...fullTransaction.transaction,
        transactions: signedTransactionsData.map(t => t.object),
      };

      const filename = fullTransaction.file.replace(/\(d?\)/, '');

      const filePath = `${path}/${SIGNED_TRANSACTION_PREFIX}${filename}`;

      writeFile(filePath, signedTransaction);
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
      <Fade>
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
      </Fade>
    );
  }
}

Final.propTypes = {
  activeDrive: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  rawTransactions: PropTypes.array,
  resetAccountAction: PropTypes.func.isRequired,
  transactions: PropTypes.array,
};

Final.defaultProps = {
  transactions: [],
  rawTransactions: [],
};

const mapStateToProps = state => ({
  activeDrive: state.drive.activeDrive,
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
