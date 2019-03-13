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
  }

  const { transactionsToSign } = props;

  return (
    <Fragment>
      <div className={styles.container}>
        <img
          src={success}
          className={styles.icon}
          alt=''
        />
        {transactionsToSign.length ?
          <Fragment>
            <div className={styles.message}>You have successfully signed {transactionsToSign.length} transactions</div>
            {transactionsToSign.map(item => (
              <div className={styles.message}>{item}</div>
            ))}
          </Fragment>
        :
          <div className={styles.message}>Transactions not signed</div>
        }
      </div>
      <div className={styles.rowControls}>
        <Button onClick={done} primary>
          Done
        </Button>
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    transactionsToSign: state.account.transactionsToSign
  };
}

const mapDispatchToProps = dispatch => {
  return {
    resetAccount: () => dispatch(resetAccount())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Final);