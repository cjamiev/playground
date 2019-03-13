import React, { Component } from 'react';

import { apiPost, apiGet } from '../utility';

export default class TestApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [], entry: {}
    };
    this.filterAll = this.filterAll.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  componentDidMount() {
    this.filterAll();
  }

  addEvent() {
    apiPost('http://localhost:8080/api', this.state.entry).then(result => {
      console.log(result);
    });
  }

  filterAll() {
    apiGet('http://localhost:8080/api').then(result => {
      if (result) {
        this.setState({ result });
      }
    });
  }

  renderTable() {
    const tableRows = this.state.result.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.description}</td>
        </tr>
      );
    });

    return (
      <table className="table events-table">
        <thead>
          <tr className="events-table-header">
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    );
  }

  render() {
    return (
      <>
        {this.renderTable()}
      </>
    );
  }
}
