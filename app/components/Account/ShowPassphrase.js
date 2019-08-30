import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';

import Button from '../Button';

import styles from '../App/index.css';

const ShowPassphrase = ({ next, recoveryPassphrase, usePassphrase }) => {
  if (usePassphrase) {
    next();
  }

  return (
    <Fade>
      <div className={styles.contentWrapper}>
        <div style={{ minWidth: 350 }}>
          <div style={{ marginBottom: 10 }}>Generated passphrase</div>
          <textarea disabled className={styles.recoveryPassphraseTextarea}>
            {recoveryPassphrase}
          </textarea>
          <div className={styles.recommend}>We highly recommend to keep it secure</div>
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
};

const mapStateToProps = state => ({
  recoveryPassphrase: state.account.name,
  usePassphrase: state.account.usePassphrase,
});

export default connect(mapStateToProps)(ShowPassphrase);
