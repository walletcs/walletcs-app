/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import Checkbox from '../Checkbox';

import styles from './index.css';

export default class SelectTableItem extends Component {
  constructor(props) {
    super(props);

    const { item } = props;
    const { checked = false } = item;
    this.state = { checked };
  }

  handleCheck = () => {
    const { checked } = this.state;
    const { onCheck, item } = this.props;

    this.setState({ checked: !checked });
    if (onCheck) {
      onCheck(item.id, !checked);
    }
  };

  render() {
    const { checked } = this.state;
    const { onCheck, item } = this.props;
    const isCheckboxNeeded = !!onCheck;

    return (
      <tr
        className={cx(styles.tableRow, {
          [styles.tableDataRow]: !!onCheck,
        })}
        onClick={this.handleCheck}
      >
        {isCheckboxNeeded && (
          <td className={cx(styles.tableCell, styles.tableCheckbox)}>
            <Checkbox checked={checked} onChange={this.handleCheck} />
          </td>
        )}
        {item.fields.map(e => (
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
  onCheck: PropTypes.func,
};

SelectTableItem.defaultProps = {
  item: {},
  onCheck: null,
};
