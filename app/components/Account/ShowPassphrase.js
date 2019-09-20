import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';

import Button from '../Button';

import styles from '../App/index.module.css';

const ShowPassphrase = ({
  next, recoveryPassphrase, usePassphrase, accountName,
}) => {
  if (usePassphrase) {
    next();
  }

  return (
    <Fade>
      <div className={styles.contentWrapper}>
        <div style={{ minWidth: 350 }}>
          <div style={{ marginBottom: 10 }}>{`Passphrase for account ${accountName}`}</div>
          <textarea disabled className={styles.recoveryPassphraseTextarea}>
            {recoveryPassphrase}
          </textarea>
          <ul>
            <li className={styles.passphrasePoint}>
              Keep passphrase as secure as private key
            </li>
            <li className={styles.passphrasePoint}>
              Never store electronically, including photograph
            </li>
            <li className={styles.passphrasePoint}>
              We recommend handwriting passphrase on the piece of paper
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.rowControls}>
        <Button primary onClick={next}>
          OK
        </Button>
      </div>
    </Fade>
  );
};

ShowPassphrase.propTypes = {
  recoveryPassphrase: PropTypes.string.isRequired,
  next: PropTypes.func.isRequired,
  usePassphrase: PropTypes.bool.isRequired,
  accountName: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  recoveryPassphrase: state.account.recoveryPassphrase,
  usePassphrase: state.account.usePassphrase,
  accountName: state.account.name,
});

export default connect(mapStateToProps)(ShowPassphrase);
