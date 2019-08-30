/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import fs from 'fs';
import { connect } from 'react-redux';
import { EtherTransactionDecoder, representEthTx, representBtcTx } from 'walletcs/src/index';
import Fade from 'react-reveal/Fade';

import PropTypes from 'prop-types';
import hash from 'object-hash';

import Button from '../Button';
import Table from '../Table';

import { setTransactions, setTransactionToSign, setRawTransactions } from '../../actions/account';
import { getTransactionType } from '../../utils/helpers';

import styles from '../App/index.css';

class SelectTransaction extends Component {
  componentWillMount() {
    this.setupTransactions();
  }

  setupTransactions = () => {
    let dir = [];
    const {
      activeDrive = {},
      setTransactionsAction,
      setRawTransactionsAction,
      setTransactionToSignAction,
    } = this.props;
    const { path } = activeDrive;

    try {
      dir = fs.readdirSync(path) || [];
    } catch (error) {
      console.error(error);
    }

    const files = dir
      .map((file) => {
        let transaction = {};

        try {
          transaction = JSON.parse(fs.readFileSync(`${path}/${file}`, 'utf-8'));
        } catch (error) {
          console.error(`error while reading ${path}/${file}`);
          console.error(error);
          return null;
        }

        if (!transaction.transactions) {
          return null;
        }

        return {
          transaction,
          file,
        };
      })
      .filter(t => !!t);

    const data = [];

    files.forEach((element) => {
      element.transaction.transactions.forEach((tr) => {
        let contractObj = {};
        let method = { name: 'transfer' };

        if (tr.contract) {
          contractObj = (element.transaction.contracts || []).find(c => c.contract === tr.contract) || {};

          if (contractObj.abi) {
            try {
              EtherTransactionDecoder.addABI(contractObj.abi);
              method = EtherTransactionDecoder.decodeMethodContract(tr.transaction.data);
            } catch (error) {
              console.error(error);
            }
          }
        }

        const trType = getTransactionType(tr);
        const filename = `${element.file} (${tr.transaction.nonce || ''})`;
        const trHash = hash(tr.transaction);

        data.push({
          ...tr.transaction,
          extra: {
            pub_key: element.transaction.pub_key,
            file: element.file,
            filename,
            blockchain: trType,
            network: tr.network,
            method: method.name,
            hash: trHash,
          },
        });

        setTransactionToSignAction(trHash, true);
      });
    });

    setTransactionsAction(data);
    setRawTransactionsAction(files);
  };

  checkTransaction = (data, checked) => {
    const { setTransactionToSignAction } = this.props;

    setTransactionToSignAction(data, checked);
  };

  render() {
    const {
      transactions, onCancel, next, transactionsToSign,
    } = this.props;

    const isKeysExists = !!transactions.length;
    const isTransactionsToSign = !!transactionsToSign.length;

    const data = transactions.map((tr) => {
      let trAmount;

      if (tr.extra.blockchain === 'ETH') {
        const normalizedTransaction = representEthTx(tr);
        trAmount = normalizedTransaction.value;
      } else {
        const normalizedTransaction = representBtcTx(tr);
        trAmount = normalizedTransaction.amount;
      }

      return {
        id: tr.extra.hash,
        checked: true,
        flex: [0.8, 0.75, 0.8, 1, 0.9],
        fields: [tr.extra.file, tr.extra.network, tr.to, tr.extra.method, trAmount],
      };
    });

    return (
      <Fade>
        <div className={styles.contentWrapper}>
          {isKeysExists ? (
            <Table
              data={data}
              headers={['FILE', 'NETWORK', 'TO', 'METHOD', 'AMOUNT']}
              onCheck={this.checkTransaction}
            />
          ) : (
            <div className={styles.message}>Transactions not found</div>
          )}
        </div>
        <div className={styles.rowControls}>
          <Button onClick={onCancel}>Cancel</Button>
          {isKeysExists && isTransactionsToSign && (
            <Button onClick={next} primary>
              Next
            </Button>
          )}
        </div>
      </Fade>
    );
  }
}

SelectTransaction.propTypes = {
  next: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  setRawTransactionsAction: PropTypes.func.isRequired,
  setTransactionToSignAction: PropTypes.func.isRequired,
  setTransactionsAction: PropTypes.func.isRequired,
  activeDrive: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
  transactions: PropTypes.array,
  transactionsToSign: PropTypes.array,
};

SelectTransaction.defaultProps = {
  transactions: [],
  transactionsToSign: [],
};

const mapStateToProps = state => ({
  activeDrive: state.drive.activeDrive,
  transactions: state.account.transactions,
  transactionsToSign: state.account.transactionsToSign,
});

const mapDispatchToProps = dispatch => ({
  setTransactionsAction: items => dispatch(setTransactions(items)),
  setTransactionToSignAction: (data, checked) => dispatch(setTransactionToSign(data, checked)),
  setRawTransactionsAction: data => dispatch(setRawTransactions(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectTransaction);
