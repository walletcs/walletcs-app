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
    loadingMsg: null
  };

  savePublicKey = () => {
    const { publicDrive, emptyDrive } = this.props.drives;
    const { address, name } = this.props.account;

    this.setState({ loadingMsg: 'Calculating public key...' });
    const path = `${publicDrive || emptyDrive}/${PUBLIC_KEY_PREFIX}${name}.txt`;

    writeFile(path, address);
    this.props.resetDrives();
    this.props.next();
  };

  render() {
    return (
      <Fragment>
        <div>
          <div>
            <div className={styles.infoText}>
              After press 'Save address' button this drive will contain file
              with public address of your account.
            </div>
            <div className={cx(styles.infoText, styles.bold)}>
              You can safely distribute this address
            </div>
          </div>
          <div style={{ color: '#828282', fontSize: 14, marginTop: 15 }}>
            File to be created:
          </div>
          <div style={{ color: '#4F4F4F', fontSize: 16 }}>
            {`addr-${this.props.account.name}.txt`}
          </div>
        </div>
        <div className={styles.rowControls}>
          {this.props.loadingMsg ? (
            <div>{this.props.loadingMsg}</div>
          ) : (
            <Fragment>
              <Button onClick={this.props.onCancel}>Cancel</Button>
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
  drives: PropTypes.array,
  loadingMsg: PropTypes.string,
  next: PropTypes.func,
  onCancel: PropTypes.func,
  resetDrives: PropTypes.func
};

const mapStateToProps = state => {
  return {
    drives: state.drive.drives,
    account: state.account
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetDrives: path => dispatch(resetDrives(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneratePublic);
