import React, { Component } from 'react';
import usb from 'usb';
import { connect } from 'react-redux';

import { getDrives } from '../../utils/helpers';
import { setDrivesToStorage } from '../../actions/drive';

class USBListener extends Component {
  state = {
    activeStep: 0,
    loadingMsg: null
  }

  setDrives = async interval => {
    const drives = await getDrives();

    if (Object.keys(drives).length) {
      this.props.setDrivesToStorage(drives);
      interval && clearInterval(interval);
    }
  }

  async componentWillMount() {
    await this.setDrives();

    usb.on('attach', async () => {
      const interval = setInterval(async () => {
        await this.setDrives(interval);
      }, 1000);
    });

    usb.on('detach', async () => {
      this.props.setDrivesToStorage({});
    });
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = state => {
  return {
    path: state.drive.path
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setDrivesToStorage: path => dispatch(setDrivesToStorage(path))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(USBListener);