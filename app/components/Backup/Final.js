/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../Button';

import { writeFile } from '../../utils/helpers';
import { PRIVATE_KEY_PREFIX } from '../../utils/constants';

import styles from '../App/index.css';

class Final extends Component {
  componentWillMount() {
    this.backupPrivateKeys();
  }

  backupPrivateKeys = () => {
    const { drives, keys } = this.props;

    const { emptyDrive } = drives;
    const keysForRestore = keys;

    keysForRestore.forEach((k) => {
      const { account, privateKeyParsedData } = k;
      const path = `${emptyDrive}/${PRIVATE_KEY_PREFIX}${account}.json`;

      writeFile(path, privateKeyParsedData);
    });
  };

  render() {
    const { onCancel } = this.props;

    return (
      <Fragment>
        <div className={styles.message}>
          You have successfully backed up your drive with private key
        </div>
        <div className={styles.rowControls}>
          <Button onClick={onCancel} primary>
            Done
          </Button>
        </div>
      </Fragment>
    );
  }
}

Final.propTypes = {
  onCancel: PropTypes.func.isRequired,
  drives: PropTypes.shape({
    emptyDrive: PropTypes.string,
    publicDrive: PropTypes.string,
    privateDrive: PropTypes.string,
  }),
  keys: PropTypes.array,
};

Final.defaultProps = {
  drives: {},
  keys: [],
};

const mapStateToProps = state => ({
  keys: state.account.keys,
  drives: state.drive.drives,
});

export default connect(mapStateToProps)(Final);
