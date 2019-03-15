import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filterType) => {
  const filterCases = {
    'SHOW_ALL': () => {
      return todos;
    },
    'SHOW_COMPLETED': () => {
      return todos.filter(t => t.completed);
    },
    'SHOW_ACTIVE': () => {
      return todos.filter(t => !t.completed);
    },
    'DEFAULT': () => {
      throw new Error('Unknown filter: ' + filterType);
    }
  };

  return (filterCases[filterType] || filterCases['DEFAULT'])();
};

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
