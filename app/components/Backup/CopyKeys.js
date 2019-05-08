/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import fs from 'fs';
import PropTypes from 'prop-types';

import Button from '../Button';

import { PRIVATE_KEY_PREFIX } from '../../utils/constants';
import { setPrivateKeys } from '../../actions/account';

import keys from '../../assets/Keys.png';

import styles from '../App/index.css';

class CopyKeys extends Component {
  componentWillMount() {
    this.setupPrivateKeys();
  }

  setupPrivateKeys = () => {
    let dir = [];
    const { drives, setPrivateKeysAction } = this.props;
    const { privateDrive } = drives;

    try {
      dir = fs.readdirSync(privateDrive) || [];
    } catch (error) {
      console.error(error);
    }

    const res = dir
      .filter(file => file.startsWith(PRIVATE_KEY_PREFIX))
      .map(file => {
        let privateKey;

        try {
          privateKey = fs.readFileSync(`${privateDrive}/${file}`, 'utf-8');
        } catch (error) {
          console.error(error);
        }

        return {
          privateKey,
          account: file.replace(PRIVATE_KEY_PREFIX, '').replace('.txt', '')
        };
      });

    setPrivateKeysAction(res);
  };

  render() {
    const { onCancel, next } = this.props;

    return (
      <Fragment>
        <div className={styles.icons}>
          <img src={keys} className={styles.icon} alt="" />
        </div>
        <div className={styles.insertPrivate}>
          Private Key flash drive copied
        </div>
        <div className={styles.rowControls}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={next} primary>
            Next
          </Button>
        </div>
      </Fragment>
    );
  }
}

CopyKeys.propTypes = {
  drives: PropTypes.array,
  next: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  setPrivateKeysAction: PropTypes.func.isRequired
};

CopyKeys.defaultProps = {
  drives: []
};

const mapStateToProps = state => ({
  keys: state.account.keys,
  drives: state.drive.drives
});

const mapDispatchToProps = dispatch => ({
  setPrivateKeysAction: k => dispatch(setPrivateKeys(k))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CopyKeys);
