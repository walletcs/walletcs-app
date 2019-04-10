import React, { Component, Fragment } from 'react';
import fs from 'fs';
import { connect } from 'react-redux';
import { EtherTransactionDecoder } from 'walletcs/src/index';

import Button from '../Button';
import Table from '../Table';

import {
  setTransactions,
  setTransactionToSign,
  setRawTransactions
} from '../../actions/account';
import { TRANSACTION_PREFIX } from '../../utils/constants';

import styles from '../App/index.css';

class SelectTransaction extends Component {
  componentWillMount() {
    this.setupTransactions();
  }

  setupTransactions = () => {
    let dir = [];
    const drive = this.props.drives.emptyDrive;

    try {
      dir = fs.readdirSync(drive) || [];
    } catch (error) {
      console.error(error);
    }

    const files = dir
      .filter(file => file.startsWith(TRANSACTION_PREFIX))
      .map(file => {
        let transaction = {};

        try {
          transaction = JSON.parse(
            fs.readFileSync(`${drive}/${file}`, 'utf-8')
          );
        } catch (error) {
          console.error(`error while reading ${drive}/${file}`);
          console.error(error);
          return null;
        }

        return {
          transaction,
          file
        };
      })
      .filter(t => !!t);

    const data = [];

    files.forEach(element => {
      element.transaction.transactions.forEach(tr => {
        let contractObj = {};
        let abi = [];
        let method = { name: 'transfer' };

        if (tr.contract) {
          contractObj =
            element.transaction.contracts.find(
              c => c.contract === tr.contract
            ) || {};
          abi = contractObj.abi;

          try {
            EtherTransactionDecoder.addABI(abi);
            method = EtherTransactionDecoder.decodeMethodContract(
              tr.transaction.data
            );
          } catch (error) {
            console.error(error);
          }
        }

        const trType = tr.contract ? '=>' : 'ETH';
        const filename = `${element.file} (${tr.transaction.nonce})`;

        data.push({
          ...tr.transaction,
          extra: {
            pub_key: element.transaction.pub_key,
            file: element.file,
            filename,
            type: trType,
            method: method.name
          }
        });
      });
    });

    this.props.setTransactions(data);
    this.props.setRawTransactions(files);
  };

  checkTransaction = (data, checked) => {
    this.props.setTransactionToSign(data, checked);
  };

  render() {
    const isKeysExists = !!this.props.transactions.length;
    const data = this.props.transactions.map(tr => ({
      id: tr.data,
      fields: [tr.extra.file, tr.extra.type, tr.to, tr.extra.method, tr.amount]
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
          <Button onClick={this.props.onCancel}>Cancel</Button>
          {isKeysExists && (
            <Button onClick={this.props.next} primary>
              Next
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
    transactions: state.account.transactions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTransactions: items => dispatch(setTransactions(items)),
    setTransactionToSign: (data, checked) =>
      dispatch(setTransactionToSign(data, checked)),
    setRawTransactions: data => dispatch(setRawTransactions(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectTransaction);
