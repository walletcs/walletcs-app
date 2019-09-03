import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import styles from './index.module.css';

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
    const { flash } = this.props;

    return (
      <div className={styles.elements}>
        {[0, 1, 2].map(num => (
          <div
            key={num}
            className={cx(styles.element, {
              [styles[flash]]: active === num,
            })}
          />
        ))}
      </div>
    );
  }
}

FlashToDeviceIndicator.propTypes = {
  flash: PropTypes.oneOf(['private', 'public', 'empty', 'transaction']).isRequired,
};

export default FlashToDeviceIndicator;
