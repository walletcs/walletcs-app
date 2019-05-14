/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-console */
import React, { Component, Fragment } from 'react';
import fs from 'fs';
import { EtherKeyPair, BitcoinCheckPair } from 'walletcs/src/index';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
    const { drives } = this.props;
    const { privateDrive } = drives;

    try {
      dir = fs.readdirSync(privateDrive) || [];
    } catch (error) {
      console.error(error);
    }

    const privateKeys = dir
      .filter(file => file.startsWith(PRIVATE_KEY_PREFIX))
      .map((file) => {
        let privateKey;
        let keyNetwork;

        try {
          const privateKeyData = fs.readFileSync(`${privateDrive}/${file}`, 'utf-8');
          const privateKeyParsedData = JSON.parse(privateKeyData) || {};
          privateKey = privateKeyParsedData.key;
          keyNetwork = privateKeyParsedData.network;
        } catch (error) {
          console.error(error);
        }

        return { privateKey, keyNetwork };
      })
      .filter(f => !!f);

    const { transactions, transactionsToSign, setTransactionsAction } = this.props;

    const transactionsWithKeys = transactions
      .filter(t => transactionsToSign.includes(t.data || t.extra.hash))
      .map((transaction) => {
        const privateKey = privateKeys.find((k) => {
          let key;

          try {
            key = EtherKeyPair.checkPair(transaction.extra.pub_key, k.privateKey);
          } catch (error) {
            console.log('Invalid ether key pair');
          }

          if (!key) {
            try {
              key = BitcoinCheckPair.checkPair(
                transaction.extra.pub_key,
                k.privateKey,
                k.keyNetwork,
              );
            } catch (error) {
              console.log('Invalid bitcoin key pair');
            }
          }

          return key;
        });

        return {
          ...transaction,
          key: {
            privateKey,
            foundKey: privateKey ? 'Yes' : 'No',
          },
        };
      });

    setTransactionsAction(transactionsWithKeys);
  };

  render() {
    const { transactions = [], next, onCancel } = this.props;

    const isTransactionsExists = transactions.some(t => (t.key || {}).privateKey);
    const data = transactions.map(tr => ({
      fields: [tr.extra.filename, (tr.key || {}).foundKey],
    }));

    return (
      <Fragment>
        {isTransactionsExists ? (
          <Table data={data} headers={['FILE', 'KEY FOUND']} />
        ) : (
          <div className={styles.message}>Private keys for signing transactions not found</div>
        )}
        <div className={styles.rowControls}>
          <Button onClick={onCancel}>Cancel</Button>
          {isTransactionsExists && (
            <Button onClick={next} primary>
              Sign
            </Button>
          )}
        </div>
      </Fragment>
    );
  }
}

DetectPrivateKeys.propTypes = {
  next: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  setTransactionsAction: PropTypes.func.isRequired,
  drives: PropTypes.shape({
    emptyDrive: PropTypes.string,
    publicDrive: PropTypes.string,
    privateDrive: PropTypes.string,
  }),
  transactions: PropTypes.array,
  transactionsToSign: PropTypes.array,
};

DetectPrivateKeys.defaultProps = {
  drives: {},
  transactions: [],
  transactionsToSign: [],
};

const mapStateToProps = state => ({
  drives: state.drive.drives,
  transactions: state.account.transactions,
  transactionsToSign: state.account.transactionsToSign,
});

const mapDispatchToProps = dispatch => ({
  setTransactionsAction: keys => dispatch(setTransactions(keys)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetectPrivateKeys);
