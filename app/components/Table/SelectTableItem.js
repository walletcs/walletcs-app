import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import Checkbox from '../Checkbox';

import styles from './index.css';

export default class SelectTableItem extends Component {
  state = { checked: false };

  handleCheck = () => {
    this.setState({ checked: !this.state.checked });
    this.props.onCheck(this.props.item.id, !this.state.checked);
  };

  render() {
    const isCheckboxNeeded = !!this.props.onCheck;

    return (
      <tr
        className={cx(styles.tableRow, {
          [styles.tableDataRow]: !!this.props.onCheck
        })}
        onClick={this.handleCheck}
      >
        {isCheckboxNeeded && (
          <td className={cx(styles.tableCell, styles.tableCheckbox)}>
            <Checkbox
              checked={this.state.checked}
              onChange={this.handleCheck}
            />
          </td>
        )}
        {this.props.item.fields.map(e => (
          <td key={e} className={styles.tableCell}>
            {e}
          </td>
        ))}
      </tr>
    );
  }
}

SelectTableItem.propTypes = {
  item: PropTypes.object,
  onCheck: PropTypes.func
};
