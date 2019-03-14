const initialState = [];

const todos = (state = initialState, action) => {
  const todoCases = {
    'ADD_TODO': () => {
      return [...state, { id: action.id, text: action.text, completed: false }];
    },
    'TOGGLE_TODO': () => {
      return state.map(todo => {
        return (todo.id === action.id ? { ...todo, completed: !todo.completed } : todo);
      });
    }
  };

  return todoCases.hasOwnProperty(action.type) ? todoCases[action.type]() : state;
};

export default todos;