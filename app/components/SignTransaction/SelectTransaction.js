/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import fs from 'fs';
import { connect } from 'react-redux';
import { JSONParser } from '@exiliontech/walletcs';
import Fade from 'react-reveal/Fade';

import PropTypes from 'prop-types';
import hash from 'object-hash';

import Button from '../Button';
import Table from '../Table';

import { setTransactions, setTransactionToSign, setRawTransactions } from '../../actions/account';

import styles from '../App/index.module.css';

class SelectTransaction extends Component {
  componentWillMount() {
    this.setupTransactions();
  }

  setupTransactions = () => {
    let dir = [];
    const {
      activeDrive = {},
      setTransactionsAction,
      setTransactionToSignAction,
    } = this.props;
    const { path } = activeDrive;

    try {
      dir = fs.readdirSync(path) || [];
    } catch (error) {
      console.error(error);
    }

    const files = dir
      .flatMap((file) => {
        let transactions = [];
        let fileType;

        try {
          const fileData = fs.readFileSync(`${path}/${file}`, 'utf-8');
          transactions = JSONParser.parseFile(fileData);
          fileType = JSONParser.getType(fileData);
        } catch (error) {
          console.error(`error while reading ${path}/${file}`);
          console.error(error);
          return null;
        }

        return transactions.map((transaction) => {
          const result = {
            file,
            fileType,
            transaction,
          };

          const trHash = hash(result);

          setTransactionToSignAction(trHash, true);

          return {
            ...result,
            trHash,
          };
        });
      })
      .filter(t => !!t);

    setTransactionsAction(files);
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

    const data = transactions.map(tr => ({
      id: tr.trHash,
      checked: true,
      // flex: [0.8, 0.75, 0.8, 1, 0.9],
      fields: [tr.file, tr.fileType, tr.transaction.to, tr.transaction.methodName],
    }));

    return (
      <Fade>
        <div className={styles.contentWrapper}>
          {isKeysExists ? (
            <Table
              data={data}
              headers={['FILE', 'FILE TYPE', 'TO', 'METHOD']}
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
