import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import cx from 'classnames';

import MenuItem from '../MenuItem';
import Account from '../Account';
import Validate from '../Validate';
import Backup from '../Backup';
import SignTransaction from '../SignTransaction';
import USBListener from '../USBListener';

import walletcsLogo from '../../assets/wallet_logo.svg';

import styles from './index.css';

const Logo = () => <img src={walletcsLogo} alt="" />;

export default class App extends Component {
  state = {
    screen: null,
    screenName: null
  };

  setAccountScreen = () => {
    this.setState({
      screen: Account,
      screenName: 'Generate Account'
    });
  };

  setValidateScreen = () => {
    this.setState({
      screen: Validate,
      screenName: 'Validate / Generate Address'
    });
  };

  setBackupScreen = () => {
    this.setState({
      screen: Backup,
      screenName: 'Backup Private Key Drive'
    });
  };

  setSignTransactionScreen = () => {
    this.setState({
      screen: SignTransaction,
      screenName: 'Sign Transaction'
    });
  };

  renderMenu = () => (
    <Fragment>
      <MenuItem onClick={() => this.setAccountScreen()}>
        Generate Account
      </MenuItem>
      <div className={styles.row}>
        <MenuItem
          className={styles.rowMenu}
          onClick={() => this.setBackupScreen()}
        >
          Backup Private Key Drive
        </MenuItem>
        <MenuItem
          className={styles.rowMenu}
          onClick={() => this.setValidateScreen()}
        >
          Validate / Generate Address
        </MenuItem>
      </div>
      <MenuItem primary onClick={() => this.setSignTransactionScreen()}>
        Sign Transaction
      </MenuItem>
    </Fragment>
  );

  setDefaultScreen = () => {
    this.setState({
      screen: null,
      screenName: null
    });
  };

  render() {
    let content;
    const screenSelected = !!this.state.screen;

    if (screenSelected) {
      const Screen = this.state.screen;
      content = <Screen onCancel={this.setDefaultScreen} />;
    } else {
      content = this.renderMenu();
    }

    return (
      <Provider store={this.props.store}>
        <div
          className={cx(styles.app, { [styles.whiteTheme]: screenSelected })}
        >
          <div
            className={cx({
              [styles.flexHeader]: !screenSelected,
              [styles.staticHeader]: screenSelected
            })}
          >
            <div className={styles.headerText}>
              {this.state.screenName || <Logo />}
            </div>
          </div>
          <div className={styles.content}>
            <USBListener>{content}</USBListener>
          </div>
        </div>
      </Provider>
    );
  }
}
