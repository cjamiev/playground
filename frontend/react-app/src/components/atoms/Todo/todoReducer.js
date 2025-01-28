import { GET_TODOS, IS_LOADING_TODOS } from './todoActions';

export const todoInitialState = {
  todoList: [],
  isLoadingTodos: true,
};

const todoReducer = (state = todoInitialState, action) => {
  const todoCases = {
    [IS_LOADING_TODOS]: () => {
      return {
        ...state,
        isLoadingTodos: true
      };
    },
    [GET_TODOS]: () => {
      return {
        ...state,
        todoList: action.data,
        isLoadingTodos: false
      };
    }
  };

  return todoCases.hasOwnProperty(action.type) ? todoCases[action.type]() : state;
};

export default todoReducer;