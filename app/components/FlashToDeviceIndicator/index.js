import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import styles from './index.css';

class FlashToDeviceIndicator extends Component {
  state = { active: 0 };

  componentWillMount = () => {
    this.interval = setInterval(() => {
      const { active } = this.state;
      this.setState({ active: active === 2 ? 0 : active + 1 });
    }, 500);
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
    this.interval = null;
  };

  render() {
    const { active } = this.state;

    return (
      <div className={styles.elements}>
        {Array.apply(null, { length: 3 })
          .map(Number.call, Number)
          .map(num => (
            <div
              key={num}
              className={cx(styles.element, {
                [styles[this.props.flash]]: active === num
              })}
            />
          ))}
      </div>
    );
  }
}

FlashToDeviceIndicator.propTypes = {
  flash: PropTypes.oneOf(['private', 'public', 'empty', 'transaction'])
};

export default FlashToDeviceIndicator;
