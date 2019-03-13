import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Button from '../Button';

import success from '../../assets/success.png';

import styles from '../App/index.css';

const Final = ({ onCancel, transactions }) => (
  <Fragment>
    <div className={styles.container}>
      <img
        src={success}
        className={styles.icon}
        alt=''
      />
      {transactions.length ?
        <Fragment>
          <div className={styles.message}>You have successfully signed {transactions.length} transactions</div>
          {transactions.map(item => (
            <div className={styles.message}>{item.file}</div>
          ))}
        </Fragment>
      :
        <div className={styles.message}>Transactions not signed</div>
      }
    </div>
    <div className={styles.rowControls}>
      <Button onClick={onCancel} primary>
        Done
      </Button>
    </div>
  </Fragment>
);

const mapStateToProps = state => {
  return {
    transactions: state.account.transactions
  };
}

export default connect(mapStateToProps)(Final);