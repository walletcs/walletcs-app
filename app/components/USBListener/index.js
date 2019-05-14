/* eslint-disable react/forbid-prop-types */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import usb from 'usb';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDrives } from '../../utils/helpers';
import { setDrivesToStorage } from '../../actions/drive';

class USBListener extends Component {
  async componentWillMount() {
    const { setDrivesToStorageAction } = this.props;

    await this.setDrives();

    usb.on('attach', async () => {
      const interval = setInterval(async () => {
        await this.setDrives(interval);
      }, 1000);
    });

    usb.on('detach', async () => {
      setDrivesToStorageAction({});
    });
  }

  setDrives = async (interval) => {
    const { setDrivesToStorageAction } = this.props;
    const drives = await getDrives();

    if (Object.keys(drives).length) {
      setDrivesToStorageAction(drives);

      if (interval) {
        clearInterval(interval);
      }
    }
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

const mapStateToProps = state => ({
  path: state.drive.path,
});

const mapDispatchToProps = dispatch => ({
  setDrivesToStorageAction: path => dispatch(setDrivesToStorage(path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(USBListener);
