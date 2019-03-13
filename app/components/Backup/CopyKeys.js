import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import fs from 'fs';

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
    const { privateDrive } = this.props.drives;

    try {
      dir = fs.readdirSync(privateDrive) || [];
    } catch (error) {
      console.error(error);
    }

    const res = dir.filter(file => file.includes(PRIVATE_KEY_PREFIX)).map(file => {
      let privateKey;

      try {
        privateKey = fs.readFileSync(`${privateDrive}/${file}`, 'utf-8');
      } catch (error) {
        console.error(error);
      }

      return {
        privateKey,
        account: file.replace(PRIVATE_KEY_PREFIX, '').replace('.txt', '')
      }
    });

    this.props.setPrivateKeys(res);
  }

  render() {
    return (
      <Fragment>
        <div className={styles.icons}>
          <img
            src={keys}
            className={styles.icon}
            alt=''
          />
        </div>
        <div className={styles.insertPrivate}>Private Key flash drive copied</div>
        <div className={styles.rowControls}>
          <Button onClick={this.props.onCancel}>
            Cancel
          </Button>
          <Button onClick={this.props.next} primary>
            Next
          </Button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    keys: state.account.keys,
    drives: state.drive.drives
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setPrivateKeys: keys => dispatch(setPrivateKeys(keys))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CopyKeys);