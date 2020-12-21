import React, { Component } from 'react';

const ZERO = 0;
const ONE = 1;

const swapArrayElementPositions = (oldArray, indexA, indexB) => {
  if (indexA < ZERO || indexB < ZERO || indexA >= oldArray.length || indexB >= oldArray.length) {
    return oldArray;
  }

  const newArray = oldArray.slice();
  const tempItem = oldArray[indexA];
  newArray[indexA] = oldArray[indexB];
  newArray[indexB] = tempItem;

  return newArray;
};

const decrementElementIndex = (originalArray, index) => {
  return swapArrayElementPositions(originalArray, index, index - ONE);
};

const incrementElementIndex = (originalArray, index) => {
  return swapArrayElementPositions(originalArray, index, index + ONE);
};

const TodoList = ({ items, removeItem, moveItemUp, moveItemDown }) => (
  <ul>
    {items.map((item) => (
      <div key={item.id}>
        <li>{item.text}</li>
        <button
          onClick={() => {
            removeItem(item.id);
          }}
        >
          Done
        </button>

        <button
          onClick={() => {
            moveItemUp(item.id);
          }}
        >
          Move Item Up
        </button>
        <button
          onClick={() => {
            moveItemDown(item.id);
          }}
        >
          Move Item down
        </button>
      </div>
    ))}
  </ul>
);

export default class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  addItem = (e) => {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }

    const newItem = {
      text: this.state.text,
      id: Date.now()
    };

    this.setState((state) => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  };

  removeItem = (id) => {
    const newItemsState = this.state.items.filter((item) => {
      return item.id !== id;
    });

    this.setState({ items: newItemsState });
  };

  moveItemUp = (id) => {
    const index = this.state.items.findIndex((item) => item.id === id);
    const newItemsState = decrementElementIndex(this.state.items, index);

    this.setState({ items: newItemsState });
  };

  moveItemDown = (id) => {
    const index = this.state.items.findIndex((item) => item.id === id);
    const newItemsState = incrementElementIndex(this.state.items, index);

    this.setState({ items: newItemsState });
  };

  render() {
    return (
      <>
        <h3>TODO</h3>
        <TodoList
          items={this.state.items}
          removeItem={this.removeItem}
          moveItemUp={this.moveItemUp}
          moveItemDown={this.moveItemDown}
        />
        <input id="new-todo" onChange={this.handleChange} value={this.state.text} />
        <button onClick={this.addItem}>Add Item</button>
      </>
    );
  }
}
