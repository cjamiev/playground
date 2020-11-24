import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTest, removeTest } from './testActions';

export class TestContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: 0
    };
  }

  handleInputChange = event => {
    this.setState({ input: event.target.value });
  };

  handleAddTest = event => {
    this.props.addTest(parseInt(this.state.input));
  };

  handleRemoveTest = event => {
    this.props.removeTest(parseInt(this.state.input));
  };

  render() {
    return (
      <div style={divStyle}>
        <p>State:{this.props.test}</p>
        <label>Input value</label>
        <input type="text" onChange={this.handleInputChange} value={this.state.input} />
        <button type="button" onClick={this.handleAddTest}>
          Add To State
        </button>
        <button type="button" onClick={this.handleRemoveTest}>
          Remove From State
        </button>
      </div>
    );
  }
}

const divStyle = {
  margin: 'auto',
  width: '75%',
  border: '1px solid black',
  padding: '10px'
};

const mapStateToProps = state => {
  return {
    test: state.test
  };
};

const mapDispatchToProps = {
  addTest,
  removeTest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestContainer);
