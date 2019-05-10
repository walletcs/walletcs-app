/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react';
import fs from 'fs';
import { connect } from 'react-redux';
import { EtherTransactionDecoder } from 'walletcs/src/index';
import PropTypes from 'prop-types';

import Button from '../Button';
import Table from '../Table';

import { setTransactions, setTransactionToSign, setRawTransactions } from '../../actions/account';
import { TRANSACTION_PREFIX } from '../../utils/constants';
import { getTransactionType } from '../../utils/helpers';

import styles from '../App/index.css';

class SelectTransaction extends Component {
  componentWillMount() {
    this.setupTransactions();
  }

  setupTransactions = () => {
    let dir = [];
    const { drives, setTransactionsAction, setRawTransactionsAction } = this.props;
    const drive = drives.emptyDrive;

    try {
      dir = fs.readdirSync(drive) || [];
    } catch (error) {
      console.error(error);
    }

    const files = dir
      .filter(file => file.startsWith(TRANSACTION_PREFIX))
      .map((file) => {
        let transaction = {};

        try {
          transaction = JSON.parse(fs.readFileSync(`${drive}/${file}`, 'utf-8'));
        } catch (error) {
          console.error(`error while reading ${drive}/${file}`);
          console.error(error);
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
        const filename = `${element.file} (${tr.transaction.nonce})`;

        data.push({
          ...tr.transaction,
          extra: {
            pub_key: element.transaction.pub_key,
            file: element.file,
            filename,
            type: trType,
            method: method.name,
          },
        });
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
    const { transactions, onCancel, next } = this.props;

    const isKeysExists = !!transactions.length;

    const data = transactions.map(tr => ({
      id: tr.data,
      fields: [tr.extra.file, tr.extra.type, tr.to, tr.extra.method, tr.amount],
    }));

    return (
      <Fragment>
        {isKeysExists ? (
          <Table
            data={data}
            headers={['FILE', 'TYPE', 'TO', 'METHOD', 'AMOUNT']}
            onCheck={this.checkTransaction}
          />
        ) : (
          <div className={styles.message}>Transactions not found</div>
        )}
        <div className={styles.rowControls}>
          <Button onClick={onCancel}>Cancel</Button>
          {isKeysExists && (
            <Button onClick={next} primary>
              Next
            </Button>
          )}
        </div>
      </Fragment>
    );
  }
}

SelectTransaction.propTypes = {
  next: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  setRawTransactionsAction: PropTypes.func.isRequired,
  setTransactionToSignAction: PropTypes.func.isRequired,
  setTransactionsAction: PropTypes.func.isRequired,
  drives: PropTypes.shape({
    emptyDrive: PropTypes.string,
    publicDrive: PropTypes.string,
    privateDrive: PropTypes.string,
  }),
  transactions: PropTypes.array,
};

SelectTransaction.defaultProps = {
  drives: {},
  transactions: [],
};

const mapStateToProps = state => ({
  drives: state.drive.drives,
  transactions: state.account.transactions,
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
