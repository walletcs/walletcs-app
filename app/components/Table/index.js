/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import SelectTableItem from './SelectTableItem';

import styles from './index.css';

const Table = ({ headers, onCheck, data }) => {
  const isCheckboxNeeded = !!onCheck;

  return (
    <table style={{ width: '100%' }}>
      <tbody>
        <tr className={styles.tableRow}>
          {isCheckboxNeeded && (
            <td className={cx(styles.tableCell, styles.tableHeader, styles.tableCheckbox)} />
          )}
          {headers.map((header, index) => {
            const item = data[0];
            const flex = item.flex ? item.flex[index] : 1;

            return (
              <td
                key={header}
                style={{ flex }}
                className={cx(styles.tableCell, styles.tableHeader)}
              >
                {header}
              </td>
            );
          })}
        </tr>
        <Fragment>
          {data.map(item => (
            <SelectTableItem key={item.id} item={item} onCheck={onCheck} />
          ))}
        </Fragment>
      </tbody>
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  headers: PropTypes.array,
  onCheck: PropTypes.func,
};

Table.defaultProps = {
  data: [],
  headers: [],
  onCheck: null,
};

export default Table;
