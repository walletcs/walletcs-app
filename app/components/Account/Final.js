import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../Button';

import styles from '../App/index.css';

const Final = ({ accountName, onCancel, onValidate }) => (
  <Fragment>
    <div className={styles.contentWrapper}>
      <div
        style={{
          margin: 5,
          color: '#4F4F4F',
          fontSize: 16,
          textAlign: 'center',
        }}
      >
        {`You have successfully created an account: ${accountName}`}
      </div>
      <div
        style={{
          margin: 20,
          color: '#4F4F4F',
          fontSize: 16,
          textAlign: 'center',
          fontWeight: '600',
        }}
      >
        Please remember to securely store your private key flash drive!
      </div>
      <div className={styles.recommend}>We highly recommend to validate your account now</div>
    </div>
    <div className={styles.rowControls}>
      <Button onClick={onValidate} primary>
        Validate
      </Button>
      <Button onClick={onCancel}>Done</Button>
    </div>
  </Fragment>
);

Final.propTypes = {
  accountName: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  accountName: state.account.name,
});

export default connect(mapStateToProps)(Final);
