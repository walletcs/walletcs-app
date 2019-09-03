/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';

import Button from '../Button';
import Checkbox from '../Checkbox';

import { writeFile } from '../../utils/helpers';
import { resetActiveDrive } from '../../actions/drive';

import { PUBLIC_KEY_PREFIX } from '../../utils/constants';

import styles from '../App/index.module.css';

class GeneratePublic extends Component {
  state = {
    loadingMsg: '',
    generateXpubs: false,
  };

  onGenerateXpubsChange = () => {
    const { generateXpubs } = this.state;

    this.setState({ generateXpubs: !generateXpubs });
  }

  savePublicKey = () => {
    const {
      next, activeDrive = {}, account, resetActiveDriveAction,
    } = this.props;
    const { address, name } = account;

    this.setState({ loadingMsg: 'Calculating public key...' });
    const path = `${activeDrive.path}/${PUBLIC_KEY_PREFIX}${name}.txt`;

    try {
      writeFile(path, address, { txt: true });
    } catch (error) {
      const extraPath = path.replace('.txt', '').concat(`-${Date.now()}.txt`);
      writeFile(extraPath, address, { txt: true });
    }
    resetActiveDriveAction();
    next();
  };

  render() {
    const { loadingMsg, generateXpubs } = this.state;
    const { account = {}, onCancel } = this.props;
    const { name = '' } = account;

    // https://github.com/eslint/eslint/issues/9872
    // eslint-disable-next-line prefer-template
    const addrname = 'addr-' + name + '.txt';
    const xPUBname = `xpub-${  name  }.txt`;

    return (
      <Fade>
        <div className={styles.contentWrapper}>
          <div>
            <div className={styles.infoText}>
              After press &quot;Save address&quot; button this drive will contain file with public
              address of your account.
            </div>
            <div className={cx(styles.infoText, styles.bold)}>
              You can safely distribute this address
            </div>
          </div>
          <div className={styles.generateCheckboxContainer}>
            <Checkbox
              checked={generateXpubs}
              onChange={this.onGenerateXpubsChange}
              label="Generate xPUBs"
            />
          </div>
          <div
            style={{
              color: '#828282',
              fontSize: 14,
              marginTop: 15,
            }}
          >
            File to be created:
          </div>
          <div style={{ color: '#4F4F4F', fontSize: 16 }}>{addrname}</div>
          {generateXpubs
            && <div style={{ color: '#4F4F4F', fontSize: 16 }}>{xPUBname}</div>
          }
        </div>
        <div className={styles.rowControls}>
          {loadingMsg ? (
            <div style={{ margin: 'auto', marginBottom: 65 }}>{loadingMsg}</div>
          ) : (
            <Fragment>
              <Button onClick={onCancel}>Cancel</Button>
              <Button onClick={this.savePublicKey} primary>
                Save address
              </Button>
            </Fragment>
          )}
        </div>
      </Fade>
    );
  }
}

GeneratePublic.propTypes = {
  account: PropTypes.object,
  activeDrive: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
  next: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  resetActiveDriveAction: PropTypes.func.isRequired,
};

GeneratePublic.defaultProps = {
  account: {},
};

const mapStateToProps = state => ({
  activeDrive: state.drive.activeDrive,
  account: state.account,
});

const mapDispatchToProps = dispatch => ({
  resetActiveDriveAction: () => dispatch(resetActiveDrive()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GeneratePublic);
