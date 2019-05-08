/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { PUBLIC_KEY_PREFIX } from '../../utils/constants';

import Button from '../Button';

import styles from '../App/index.css';

import success from '../../assets/success.png';

const Final = ({ publicKeys, onCancel, generatedFlag }) => {
  const accounts = generatedFlag ? publicKeys.filter(f => !f.found) : [];

  return (
    <Fragment>
      <div className={styles.container}>
        <img src={success} className={styles.icon} alt="" />
        {accounts.length ? (
          <Fragment>
            <div className={styles.message}>
              {accounts.length} PUBLIC ADDRESSES generated:
            </div>
            {accounts.map(item => (
              <div className={styles.message}>{`${PUBLIC_KEY_PREFIX}${
                item.account
              }.txt`}</div>
            ))}
          </Fragment>
        ) : (
          <div className={styles.message}>There is no keys for restore.</div>
        )}
      </div>
      <div className={styles.rowControls}>
        <Button onClick={onCancel} primary>
          Done
        </Button>
      </div>
    </Fragment>
  );
};

Final.propTypes = {
  onCancel: PropTypes.func.isRequired,
  generatedFlag: PropTypes.bool,
  publicKeys: PropTypes.array
};

Final.defaultProps = {
  generatedFlag: false,
  publicKeys: []
};

const mapStateToProps = state => ({
  publicKeys: state.account.publicKeys,
  generatedFlag: state.account.generatedFlag
});

export default connect(mapStateToProps)(Final);
