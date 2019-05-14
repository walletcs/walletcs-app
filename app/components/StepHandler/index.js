/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../App/index.css';

export default class StepHandler extends Component {
  state = {
    activeStep: 0,
  };

  render() {
    const { activeStep } = this.state;
    const { steps } = this.props;

    const Content = steps[activeStep];

    return (
      <div className={styles.container}>
        <Content {...this.props} next={() => this.setState({ activeStep: activeStep + 1 })} />
      </div>
    );
  }
}

StepHandler.propTypes = {
  steps: PropTypes.array.isRequired,
};
