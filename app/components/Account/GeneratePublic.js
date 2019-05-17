/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';

import Button from '../Button';

import { writeFile } from '../../utils/helpers';
import { resetDrives } from '../../actions/drive';

import { PUBLIC_KEY_PREFIX } from '../../utils/constants';

import styles from '../App/index.css';

class GeneratePublic extends Component {
  state = {
    loadingMsg: '',
  };

  savePublicKey = () => {
    const {
      resetDrivesAction, next, drives, account,
    } = this.props;
    const { publicDrive, emptyDrive } = drives;
    const { address, name } = account;

    this.setState({ loadingMsg: 'Calculating public key...' });
    const path = `${publicDrive || emptyDrive}/${PUBLIC_KEY_PREFIX}${name}.txt`;

    try {
      writeFile(path, address, { txt: true });
    } catch (error) {
      const extraPath = path.replace('.txt', '').concat(`-${Date.now()}.txt`);
      writeFile(extraPath, address, { txt: true });
    }
    resetDrivesAction();
    next();
  };

  render() {
    const { loadingMsg } = this.state;
    const { account = {}, onCancel } = this.props;
    const { name = '' } = account;

    // https://github.com/eslint/eslint/issues/9872
    // eslint-disable-next-line prefer-template
    const addrname = 'addr-' + name + '.txt';

    return (
      <Fragment>
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
        </div>
        <div className={styles.rowControls}>
          {loadingMsg ? (
            <div>{loadingMsg}</div>
          ) : (
            <Fragment>
              <Button onClick={onCancel}>Cancel</Button>
              <Button onClick={this.savePublicKey} primary>
                Save address
              </Button>
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  }
}

GeneratePublic.propTypes = {
  account: PropTypes.object,
  drives: PropTypes.shape({
    emptyDrive: PropTypes.string,
    publicDrive: PropTypes.string,
    privateDrive: PropTypes.string,
  }),
  next: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  resetDrivesAction: PropTypes.func.isRequired,
};

GeneratePublic.defaultProps = {
  account: {},
  drives: {},
};

const mapStateToProps = state => ({
  drives: state.drive.drives,
  account: state.account,
});

const mapDispatchToProps = dispatch => ({
  resetDrivesAction: path => dispatch(resetDrives(path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GeneratePublic);
