import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../App/index.css';

export default class StepHandler extends Component {
  state = {
    activeStep: 0
  };

  render() {
    const { activeStep } = this.state;
    const Content = this.props.steps[activeStep];

    return (
      <div className={styles.container}>
        <Content
          {...this.props}
          next={() => this.setState({ activeStep: this.state.activeStep + 1 })}
        />
      </div>
    );
  }
}

StepHandler.propTypes = {
  steps: PropTypes.array
};
