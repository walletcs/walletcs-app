import React, { Component, Fragment } from 'react';
import fs from 'fs';
import { connect } from 'react-redux';

import Button from '../Button';

import { setTransactions } from '../../actions/account';
import { TRANSACTION_PREFIX } from '../../utils/constants';

import styles from '../App/index.css';

class SelectTransaction extends Component {
  componentWillMount() {
    this.getTransactions();
  }

  getTransactions = () => {
    let dir = [];
    const drive = this.props.drives.emptyDrive;
  
    try {
      dir = fs.readdirSync(drive) || [];
    } catch (error) {
      console.error(error);
    }
  
    const transactions = dir.filter(file => file.includes(TRANSACTION_PREFIX)).map(file => {
      let transaction;
  
      try {
        transaction = fs.readFileSync(`${drive}/${file}`, 'utf-8');
      } catch (error) {
        console.error(error);
      }
  
      return {
        transaction: JSON.parse(transaction),
        file
      }
    });
  
    this.props.setTransactions(transactions);
  }

  render() {
    const transactions = this.props.transactions || [];
    const isKeysExists = !!transactions.length;

    return (
      <Fragment>
        <div>
          {isKeysExists ?
            <Fragment>
              <div style={{ fontSize: 16 }}>Select transaction to sign</div>
              <div className={styles.tableRow}>
                <div className={styles.tableCell} />
                <div className={styles.tableCell} style={{ color: '#ABABAB' }}>FILE</div>
                <div className={styles.tableCell} style={{ color: '#ABABAB' }}>TIME</div>
                <div className={styles.tableCell} />
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
            <div className={styles.message}>Transactions not found</div>
          }
        </div>
        <div className={styles.rowControls}>
          <Button onClick={this.props.onCancel}>
            Cancel
          </Button>
          {isKeysExists &&
            <Button onClick={this.props.next} primary>
              Next
            </Button>
          }
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
}

const mapDispatchToProps = dispatch => {
  return {
    setTransactions: items => dispatch(setTransactions(items))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectTransaction);