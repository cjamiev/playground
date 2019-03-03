import React, { Component } from 'react';

const TABLE_DATA = [
  {
    id: 1,
    name: 'a1',
    description: 'b1',
    location: 'c1'
  },
  {
    id: 2,
    name: 'a2',
    description: 'b2',
    location: 'c2'
  },
  {
    id: 3,
    name: 'a3',
    description: 'b3',
    location: 'c3'
  },
  {
    id: 4,
    name: 'a4',
    description: 'b4',
    location: 'c4'
  },
  {
    id: 5,
    name: 'a5',
    description: 'b5',
    location: 'c5'
  },
  {
    id: 6,
    name: 'a6',
    description: 'b6',
    location: 'c6'
  }
];

export default class Table extends Component {
  renderTable() {
    const tableRows = TABLE_DATA.map(item => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>{item.location}</td>
      </tr>
    ));

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    );
  }

  render() {
    return <>{this.renderTable()}</>;
  }
}
