import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../Button';

import success from '../../assets/success.png';
import styles from '../App/index.css';

const Final = props => (
  <Fragment>
    <div className={styles.container}>
      <img src={success} className={styles.icon} alt="" />
      <div
        style={{
          margin: 5,
          color: '#4F4F4F',
          fontSize: 16,
          textAlign: 'center'
        }}
      >
        {`You have successfully created an account: ${props.accountName}`}
      </div>
      <div
        style={{
          margin: 20,
          color: '#4F4F4F',
          fontSize: 16,
          textAlign: 'center',
          fontWeight: '600'
        }}
      >
        Please remember to securely store you private key flash drive
      </div>
    </div>
    <Button onClick={props.onCancel} primary>
      Done
    </Button>
  </Fragment>
);

Final.propTypes = {
  accountName: PropTypes.string,
  onCancel: PropTypes.func
};

const mapStateToProps = state => ({
  accountName: state.account.name
});

export default connect(mapStateToProps)(Final);
