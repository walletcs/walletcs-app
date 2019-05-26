/* eslint-disable react/forbid-prop-types */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDrives } from '../../utils/helpers';
import { setDrivesToStorage } from '../../actions/drive';

class USBListener extends Component {
  async componentWillMount() {
    this.interval = setInterval(async () => {
      await this.setDrives();
    }, 1000);
  }

  async componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  setDrives = async () => {
    const { setDrivesToStorageAction } = this.props;
    const drives = await getDrives();

    setDrivesToStorageAction(drives);
  };

  render() {
    const { children } = this.props;

    return children;
  }
}

USBListener.propTypes = {
  children: PropTypes.any.isRequired,
  setDrivesToStorageAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setDrivesToStorageAction: path => dispatch(setDrivesToStorage(path)),
});

export default connect(
  null,
  mapDispatchToProps,
)(USBListener);
