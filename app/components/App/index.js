/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import { ToastContainer } from 'react-toastify';

import MenuItem from '../MenuItem';
import Account from '../Account';
import Validate from '../Validate';
import Backup from '../Backup';
import SignTransaction from '../SignTransaction';
import USBListener from '../USBListener';
import StatusBar from '../StatusBar';

import walletcsLogo from '../../assets/walletcs_logo.png';
import generateIcon from '../../assets/generate_icon.png';
import backupIcon from '../../assets/backup_icon.png';
import validateIcon from '../../assets/validate_icon.png';
import signIcon from '../../assets/sign_icon.png';

import 'react-toastify/dist/ReactToastify.css';
import styles from './index.module.css';

const Logo = () => <img src={walletcsLogo} alt="" />;

export default class App extends Component {
  state = {
    screen: null,
    screenName: null,
    online: navigator.onLine,
  };

  componentWillMount() {
    window.addEventListener('online', () => {
      this.setState({ online: true });
    });

    window.addEventListener('offline', () => {
      this.setState({ online: false });
    });
  }

  componentWillUnmount() {
    window.addEventListener('online');
    window.removeEventListener('offline');
  }

  setAccountScreen = () => {
    this.setState({
      screen: Account,
      screenName: 'Generate Account',
    });
  };

  setValidateScreen = () => {
    this.setState({
      screen: Validate,
      screenName: 'Validate / Generate Address',
    });
  };

  setBackupScreen = () => {
    this.setState({
      screen: Backup,
      screenName: 'Backup Private Key Drive',
    });
  };

  setSignTransactionScreen = () => {
    this.setState({
      screen: SignTransaction,
      screenName: 'Sign Transaction',
    });
  };

  renderMenu = () => (
    <div className={styles.row}>
      <Fade>
        <MenuItem icon={generateIcon} onClick={() => this.setAccountScreen()}>
          Generate Account
        </MenuItem>
        <MenuItem icon={backupIcon} onClick={() => this.setBackupScreen()}>
          Backup Private Key Drive
        </MenuItem>
        <MenuItem icon={validateIcon} onClick={() => this.setValidateScreen()}>
          Validate / Generate Address
        </MenuItem>
        <MenuItem primary icon={signIcon} onClick={() => this.setSignTransactionScreen()}>
          Sign Transaction
        </MenuItem>
      </Fade>
    </div>
  );

  setDefaultScreen = () => {
    this.setState({
      screen: null,
      screenName: null,
    });
  };

  render() {
    let content;
    const { screenName, screen, online } = this.state;
    const { store } = this.props;
    const screenSelected = !!screen;

    if (screenSelected) {
      const Screen = screen;
      content = <Screen onCancel={this.setDefaultScreen} onValidate={this.setValidateScreen} />;
    } else {
      content = this.renderMenu();
    }

    return (
      <Provider store={store}>
        <div className={cx(styles.app, { [styles.whiteTheme]: screenSelected })}>
          <div
            className={cx({
              [styles.flexHeader]: !screenSelected,
              [styles.staticHeader]: screenSelected,
            })}
          >
            <div className={styles.headerText}>{screenName || <Logo />}</div>
          </div>
          <div className={styles.content}>
            <USBListener>{content}</USBListener>
          </div>
          <div className={styles.footer}>
            <StatusBar online={online} />
          </div>
          <ToastContainer
            position="bottom-left"
            autoClose={4000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange={false}
            draggable
            pauseOnHover
          />
        </div>
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.any.isRequired,
};
