import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Button from '../Button';
import Account from '../Account';
import Validate from '../Validate';
import Backup from '../Backup';
import SignTransaction from '../SignTransaction';
import USBListener from '../USBListener';

import '../../assets/Avenir.ttf';

import walletcsLogo from '../../assets/wallet_logo.svg';
import walletcsLabel from '../../assets/wallet_label.svg';

import styles from './index.css';

const Logo = props => (
  <div className={styles.logo}>
    <img
      src={walletcsLogo}
      className={styles.icon}
      alt=''
    />
    <img
      src={walletcsLabel}
      className={styles.icon}
      alt=''
    />
  </div>
);

export default class App extends Component {
  state = {
    screen: null,
    screenName: null
  }

  setAccountScreen = () => {
    this.setState({
      screen: Account,
      screenName: 'Generate Account'
    })
  }

  setValidateScreen = () => {
    this.setState({
      screen: Validate,
      screenName: 'Validate / Generate Address'
    })
  }

  setBackupScreen = () => {
    this.setState({
      screen: Backup,
      screenName: 'Backup Private Key Drive'
    })
  }

  setSignTransactionScreen = () => {
    this.setState({
      screen: SignTransaction,
      screenName: 'Sign Transaction'
    })
  }

  renderMenu = () => (
    <div>
      <Button primary onClick={() => this.setAccountScreen()}>
        Generate Account
      </Button>
      <Button primary onClick={() => this.setBackupScreen()}>
        Backup Private Key Drive
      </Button>
      <Button primary onClick={() => this.setValidateScreen()}>
        Validate / Generate Address
      </Button>
      <Button primary onClick={() => this.setSignTransactionScreen()}>
        Sign Transaction
      </Button>
    </div>
  );

  setDefaultScreen = () => {
    this.setState({
      screen: null,
      screenName: null
    })
  }

  render() {
    let content;

    if (!this.state.screen) {
      content = this.renderMenu();
    } else {
      const Screen = this.state.screen;
      content = <Screen onCancel={this.setDefaultScreen} />
    }

    return (
      <Provider store={this.props.store}>
        <div className={styles.app}>
          <div className={styles.header}>
            <div className={styles.headerText}>
              {this.state.screenName || <Logo />}
            </div>
          </div>
          <div className={styles.content}>
            <USBListener>
              {content}
            </USBListener>
          </div>
        </div>
      </Provider>
    )
  }
}