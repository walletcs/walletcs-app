import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Button from '../Button';
import { resetAccount } from '../../actions/account';

import success from '../../assets/success.png';

import styles from '../App/index.css';

const Final = props => {
  const done = () => {
    props.resetAccount();
    props.onCancel();
  };

  const { transactionsToSign, transactions } = props;
  const signed = transactions.filter(
    t => transactionsToSign.startsWith(t.file) && t.foundKey
  );

  return (
    <Fragment>
      <div className={styles.container}>
        <img src={success} className={styles.icon} alt="" />
        {signed.length ? (
          <Fragment>
            <div className={styles.message}>
              You have successfully signed {signed.length} transactions
            </div>
            {signed.map(item => (
              <div className={styles.message}>{item.file}</div>
            ))}
          </Fragment>
        ) : (
          <div className={styles.message}>Transactions not signed</div>
        )}
      </div>
      <div className={styles.rowControls}>
        <Button onClick={done} primary>
          Done
        </Button>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  transactions: state.account.transactions,
  transactionsToSign: state.account.transactionsToSign
});

const mapDispatchToProps = dispatch => ({
  resetAccount: () => dispatch(resetAccount())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Final);
