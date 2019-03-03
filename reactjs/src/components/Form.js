import React, { Component } from 'react';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textin: '',
      radio: -1,
      checkbox1: false,
      checkbox2: false,
      selectvalue: 'value1',
      textarea: ''
    };

    this.handleTextinChange = this.handleTextinChange.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleCheckbox1Change = this.handleCheckbox1Change.bind(this);
    this.handleCheckbox2Change = this.handleCheckbox2Change.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleTextinChange(event) {
    this.setState({ textin: event.target.value });
  }

  handleTextareaChange(event) {
    this.setState({ textarea: event.target.value });
  }

  handleRadioChange(event) {
    this.setState({ radio: Number(event.target.value) });
  }

  handleCheckbox1Change() {
    this.setState({ checkbox1: !this.state.checkbox1 });
  }

  handleCheckbox2Change() {
    this.setState({ checkbox2: !this.state.checkbox2 });
  }

  handleSelectChange(event) {
    this.setState({ selectvalue: event.target.value });
  }

  renderFormElements() {
    return (
      <div>
        <input type="button" value="A button" />

        <label>text input</label>
        <input type="text" onChange={this.handleTextinChange} value={this.state.textin} />
        <label>password input</label>
        <input type="password" />

        <label>radio1</label>
        <input
          type="radio"
          name="radiogroup"
          value="0"
          checked={this.state.radio === 0}
          onChange={this.handleRadioChange}
        />
        <label>radio2</label>
        <input
          type="radio"
          name="radiogroup"
          value="1"
          checked={this.state.radio === 1}
          onChange={this.handleRadioChange}
        />

        <label>checkbox1</label>
        <input type="checkbox" checked={this.state.checkbox1} onChange={this.handleCheckbox1Change} />
        <label>checkbox2</label>
        <input type="checkbox" checked={this.state.checkbox2} onChange={this.handleCheckbox2Change} />

        <textarea cols="40" rows="10" onChange={this.handleTextareaChange} value={this.state.textarea} />

        <select name="selectinput" onChange={this.handleSelectChange} value={this.state.selectvalue}>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
        </select>
      </div>
    );
  }

  renderHandleChangeOutput() {
    return (
      <div>
        <p>text input:{this.state.textin}</p>
        <p>text area input:{this.state.textarea}</p>
        <p>radio input:{this.state.radio}</p>
        <p>checkbox1:{String(this.state.checkbox1)}</p>
        <p>checkbox2:{String(this.state.checkbox2)}</p>
        <p>select value:{this.state.selectvalue}</p>
      </div>
    );
  }

  render() {
    return (
      <>
        {this.renderFormElements()}
        {this.renderHandleChangeOutput()}
      </>
    );
  }
}
