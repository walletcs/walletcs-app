/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { EtherWalletHD, BitcoinWalletHD } from '@exiliontech/walletcs';
// import omit from 'lodash.omit';
import PropTypes from 'prop-types';
// import hash from 'object-hash';
import Fade from 'react-reveal/Fade';
import fs from 'fs';

import Button from '../Button';
import { resetAccount } from '../../actions/account';
import { writeFile } from '../../utils/helpers';

import { SIGNED_TRANSACTION_PREFIX } from '../../utils/constants';

import styles from '../App/index.module.css';

const FILE_TYPES = {
  ether: 'ETHFileTx',
  bitcoin: 'BTCFileTx',
};

class Final extends Component {
  state = {
    signed: false,
    error: null,
    transactionFiles: [],
  };

  componentWillMount = () => {
    this.signTransactions();
  };

  done = () => {
    const { resetAccountAction, onCancel } = this.props;

    resetAccountAction();
    onCancel();
  };

  // splitTransactionsByFiles = transactions =>

  signTransactions = async () => {
    const {
      activeDrive, xkeys, transactions, approved,
    } = this.props;
    const { path } = activeDrive;

    const ETHprvs = xkeys.filter(k => k.blockchain === 'ETH');
    const BTCprvs = xkeys.filter(k => k.blockchain === 'BTC');

    const approvedTransactions = transactions.filter(t => approved.includes(t.trHash));

    const signedTransactions = await Promise.all(approvedTransactions.map(async (transactionObj) => {
      const isTransactionEther = transactionObj.fileType === FILE_TYPES.ether;
      const xprvsForTransaction = isTransactionEther ? ETHprvs : BTCprvs;

      const { transaction } = transactionObj;
      let { from } = transaction;

      if (isTransactionEther) {
        from = Array.isArray(from) ? from.map(obj => obj.address) : [from];
      }
      const uniqFrom = from.filter((value, index, self) => (self.indexOf(value) === index));

      const res = await Promise.all(xprvsForTransaction.map(async (key) => {
        let wallet;
        let sign = null;

        const {
          xPrv, network, blockchain,
        } = key;

        if (isTransactionEther) {
          wallet = new EtherWalletHD();
        } else {
          wallet = new BitcoinWalletHD(network);
        }

        try {
          sign = await wallet.signTransactionByxPriv(xPrv, transaction, uniqFrom);
        } catch (error) {
          console.error(error);
        }

        console.warn(transactionObj);

        return {
          ...transactionObj, network, blockchain, sign,
        };
      }));

      return res;
    }));

    const normalizedSignedTransactions = [].concat.apply([], signedTransactions);
    const transactionToSign = normalizedSignedTransactions.filter(t => !!t.sign);

    const transactionFiles = {};

    transactionToSign.forEach((item) => {
      if (!transactionFiles[item.file]) {
        transactionFiles[item.file] = {
          currency: item.blockchain,
          network: item.blockchain === 'BTC' ? item.network : 'homestead',
          transactions: [],
          contracts: item.contracts,
        };
      }

      transactionFiles[item.file].transactions.push(item.sign);
    });

    Object.keys(transactionFiles).forEach((f) => {
      let filePath = `${path}/${SIGNED_TRANSACTION_PREFIX}${f}`;

      if (fs.existsSync(filePath)) {
        filePath = `${path}/${Date.now()}-${SIGNED_TRANSACTION_PREFIX}${f}`;
      }

      writeFile(filePath, transactionFiles[f]);
    });

    this.setState({ signed: true, transactionFiles });
  };

  render() {
    const { signed, error, transactionFiles } = this.state;
    const transactionFileNames = Object.keys(transactionFiles);

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
          {transactionFileNames.length ? (
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
                    {transactionFileNames.length}
                    {' '}
transactions
                  </div>
                  {transactionFileNames.map(item => (
                    <div className={styles.message}>{item}</div>
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
  xkeys: PropTypes.array,
  resetAccountAction: PropTypes.func.isRequired,
  transactions: PropTypes.array,
  approved: PropTypes.array,
};

Final.defaultProps = {
  transactions: [],
  xkeys: [],
  approved: [],
};

const mapStateToProps = state => ({
  activeDrive: state.drive.activeDrive,
  transactions: state.account.transactions,
  approved: state.account.transactionsToSign,
  xkeys: state.account.keys,
});

const mapDispatchToProps = dispatch => ({
  resetAccountAction: () => dispatch(resetAccount()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Final);
