import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import SelectTableItem from './SelectTableItem';

import styles from './index.css';

class Table extends Component {
  render() {
    const isCheckboxNeeded = !!this.props.onCheck;

    return (
      <table style={{ width: '100%' }}>
        <tbody>
          <tr className={styles.tableRow}>
            {isCheckboxNeeded && (
              <td
                className={cx(
                  styles.tableCell,
                  styles.tableHeader,
                  styles.tableCheckbox
                )}
              />
            )}
            {this.props.headers.map(header => (
              <td
                key={header}
                className={cx(styles.tableCell, styles.tableHeader)}
              >
                {header}
              </td>
            ))}
          </tr>
          <Fragment>
            {this.props.data.map(item => (
              <SelectTableItem
                key={item.id}
                item={item}
                onCheck={this.props.onCheck}
              />
            ))}
          </Fragment>
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  data: PropTypes.array,
  headers: PropTypes.array,
  onCheck: PropTypes.func
};

export default Table;
