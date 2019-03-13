import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Button from '../Button';

import { writeFile } from '../../utils/helpers';
import { PRIVATE_KEY_PREFIX } from '../../utils/constants';

import success from '../../assets/success.png';

import styles from '../App/index.css';

class Final extends Component {
  componentWillMount() {
    this.backupPrivateKeys();
  }

  backupPrivateKeys = () => {
    const { emptyDrive } = this.props.drives;
    const keysForRestore = this.props.keys;

    keysForRestore.forEach(k => {
      const { account, privateKey } = k;
      const path = `${emptyDrive}/${PRIVATE_KEY_PREFIX}${account}.txt`;

      writeFile(path, privateKey);
    });
  }

  render() {
    return (
      <Fragment>
        <div className={styles.container}>
          <img
            src={success}
            className={styles.icon}
            alt=''
          />
          <div className={styles.message}>You have successfully created backed up your PRIVATE key Drive</div>
        </div>
        <div className={styles.rowControls}>
          <Button onClick={this.props.onCancel} primary>
            Done
          </Button>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    keys: state.account.keys,
    drives: state.drive.drives
  };
}

export default connect(
  mapStateToProps
)(Final);