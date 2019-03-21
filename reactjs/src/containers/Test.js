import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTest, removeTest } from '../actions/testActions';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ input: event.target.value });
  }

  render() {
    return (
      <div>
        <p>State:{this.props.test}</p>
        <label>Input value</label><input type="text" onChange={this.handleInputChange} value={this.state.input} />
        <button type="button" onClick={() => { this.props.addTest(parseInt(this.state.input)); }} >Add To State</button>
        <button type="button" onClick={() => { this.props.removeTest(parseInt(this.state.input)); }} >Remove From State</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    test: state.test
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTest: (data) => dispatch(addTest(data)),
    removeTest: (data) => dispatch(removeTest(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);