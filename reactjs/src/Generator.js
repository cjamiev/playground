import React, { Component } from 'react';

export default class Generator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentName: '',
      elementType: 0,
      label: '',
      pieces: [1, 2]
    };
    this.handleComponentNameChange = this.handleComponentNameChange.bind(this);
    this.generateComponentID = this.generateComponentID.bind(this);
    this.handleElementTypeChange = this.handleElementTypeChange.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.handleAddPiece = this.handleAddPiece.bind(this);
  }

  handleComponentNameChange(event) {
    this.setState({ componentName: event.target.value });
  }

  handleElementTypeChange(event) {
    this.setState({ elementType: Number(event.target.value) });
  }

  generateComponentID() {
    const name = this.state.componentName;
    const size = name.length;
    const id = [name.charAt(0).toLowerCase()];
    let character = '';
    for (let i = 1; i < size; i++) {
      character = name.charAt(i);
      if (!isNaN(character * 1)) {
      } else if (character === character.toUpperCase()) {
        id.push('-' + character.toLowerCase());
      } else {
        id.push(character);
      }
    }

    return id;
  }

  renderElementTypeSelection() {
    return (
      <div>
        <label htmlFor="generator-input-button">
          <input
            id="generator-input-button"
            type="radio"
            name="element-type-group"
            value="0"
            checked={this.state.elementType === 0}
            onChange={this.handleElementTypeChange}
          />
          input button
        </label>
        <label htmlFor="generator-input-text">
          <input
            id="generator-input-text"
            type="radio"
            name="element-type-group"
            value="1"
            checked={this.state.elementType === 1}
            onChange={this.handleElementTypeChange}
          />
          input text
        </label>
        <label htmlFor="generator-input-password">
          <input
            id="generator-input-password"
            type="radio"
            name="element-type-group"
            value="2"
            checked={this.state.elementType === 2}
            onChange={this.handleElementTypeChange}
          />
          input password
        </label>
        <label htmlFor="generator-input-radio">
          <input
            id="generator-input-radio"
            type="radio"
            name="element-type-group"
            value="3"
            checked={this.state.elementType === 3}
            onChange={this.handleElementTypeChange}
          />
          input radio
        </label>
        <label htmlFor="generator-input-checkbox">
          <input
            id="generator-input-checkbox"
            type="radio"
            name="element-type-group"
            value="4"
            checked={this.state.elementType === 4}
            onChange={this.handleElementTypeChange}
          />
          input checkbox
        </label>
        <label htmlFor="generator-select">
          <input
            id="generator-select"
            type="radio"
            name="element-type-group"
            value="5"
            checked={this.state.elementType === 5}
            onChange={this.handleElementTypeChange}
          />
          select
        </label>
        <label htmlFor="generator-textarea">
          <input
            id="generator-textarea"
            type="radio"
            name="element-type-group"
            value="6"
            checked={this.state.elementType === 6}
            onChange={this.handleElementTypeChange}
          />
          textarea
        </label>
      </div>
    );
  }

  handleLabelChange(e) {
    this.setState({ label: e.target.value });
  }

  handleAddPiece() {
    const label = this.state.label;
    const pieces = this.state.pieces;
    let type = 'button';
    if (this.state.elementType === 1) {
      type = 'text';
    } else if (this.state.elementType === 2) {
      type = 'password';
    } else if (this.state.elementType === 3) {
      type = 'radio';
    } else if (this.state.elementType === 4) {
      type = 'checkbox';
    }

    const newPiece = {
      type,
      label
    };
    pieces.push(newPiece);

    this.setState({ label: '', pieces });
  }

  renderElementCreator() {
    return (
      <>
        <label>Enter Label</label>
        <input type="text" onChange={this.handleLabelChange} value={this.state.label} />
        <input type="button" value="Add" onClick={this.handleAddPiece} />
      </>
    );
  }

  render() {
    console.log(this.state.pieces);
    return (
      <>
        <h1>Component Generator</h1>
        <input type="text" onChange={this.handleComponentNameChange} value={this.state.componentName} />
        {this.renderElementTypeSelection()}
        <p>ID:{this.generateComponentID()}</p>
        {this.renderElementCreator()}
      </>
    );
  }
}
