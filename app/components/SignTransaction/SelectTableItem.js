import React, { Component } from 'react';
import Checkbox from '../Checkbox';

import styles from '../App/index.css';

export default class SelectTableItem extends Component {
  state = { checked: false }

  handleCheck = value => {
    this.setState({ checked: !this.state.checked });
    this.props.onCheck(this.props.item.file, value);
  }

  render() {
    return (
      <div className={styles.tableRow}>
        <div className={styles.tableCell} ><Checkbox checked={this.state.checked} onChange={this.handleCheck} /></div>
        <div className={styles.tableCell}>{this.props.item.file}</div>
        <div className={styles.tableCell} />
        <div className={styles.tableCell} />
      </div>
    )
  }
}