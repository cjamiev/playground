import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useThemeContext } from '../../../context/ThemeProvider';
import { getTodos, updateTodos } from './todoActions';
import { SCTodoInput, SCTodoWrapper, SCTodoName, SCTodoDesc, SCTodoBtn, SCTodoSubmit } from './styles';

// add sort/filter, add field validation, add confirmation deletion, display dates
const Todo = () => {
  const { isLightMode } = useThemeContext();
  const [todoName, setTodoName] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const inputRef = useRef(null);
  const [selectedId, setSelectedId] = useState(-1);
  const { todoList, isLoadingTodos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const onHandleNameChange = (event) => {
    setTodoName(event?.target?.value);
  };

  const onHandleDescChange = (event) => {
    setTodoDesc(event?.target?.value);
  };

  const onHandleEditMode = (id) => {
    const selectedTodo = todoList.find((item) => item.id === id);
    if (selectedTodo) {
      setSelectedId(id);
      setTodoName(selectedTodo.name);
      setTodoDesc(selectedTodo.description);
    }
  };

  const createTodoItem = () => {
    if (todoName && todoDesc) {
      const id = todoList.length + 1;
      const updatedList = todoList.concat([{
        id,
        name: todoName,
        description: todoDesc,
        createdDate: new Date(),
        isCompleted: false,
        priority: id
      }])
      dispatch(updateTodos(updatedList));
      setSelectedId(-1);
      setTodoName('');
      setTodoDesc('');
      inputRef.current.focus();
    }
  };

  const updateTodoItem = () => {
    if (todoName && todoDesc) {
      const updatedList = todoList.map(item => {
        if (item.id === selectedId) {
          return {
            ...item,
            name: todoName,
            description: todoDesc,
            createdDate: new Date(),
            isCompleted: false,
          }
        } else {
          return item;
        }
      })
      dispatch(updateTodos(updatedList));
      setSelectedId(-1);
      setTodoName('')
      setTodoDesc('')
    }
  };

  const onKeyDown = (event) => {
    if (event.code === "Enter") {
      if (selectedId === -1) {
        createTodoItem();
      } else {
        updateTodoItem();
      }
    }
  };

  const onMoveUp = (priority) => {
    const updatedList = todoList.map((item) => {
      if (item.priority === priority - 1) {
        return {
          ...item,
          priority: item.priority + 1,
        };
      } else if (item.priority === priority) {
        return {
          ...item,
          priority: item.priority - 1,
        };
      } else {
        return item;
      }
    });
    dispatch(updateTodos(updatedList));
  };

  const onMoveDown = (priority) => {
    const updatedList = todoList.map((item) => {
      if (item.priority === priority + 1) {
        return {
          ...item,
          priority: item.priority - 1,
        };
      } else if (item.priority === priority) {
        return {
          ...item,
          priority: item.priority + 1,
        };
      } else {
        return item;
      }
    });
    dispatch(updateTodos(updatedList));
  };

  const onComplete = (itemId) => {
    const updatedList = todoList.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          isCompleted: !item.isCompleted,
          completedDate: !item.isCompleted ? new Date() : '',
        };
      } else {
        return item;
      }
    });
    dispatch(updateTodos(updatedList));
  };

  const onDelete = (itemId) => {
    const updatedList = todoList.filter((item) => (item.id !== itemId));
    dispatch(updateTodos(updatedList));
  };

  if (isLoadingTodos) {
    return <div>Is Loading...</div>
  }

  return (
    <div>
      <div>
        <SCTodoInput
          $isLightMode={isLightMode}
          ref={inputRef}
          placeholder="Name"
          onChange={onHandleNameChange}
          value={todoName}
        />
        <SCTodoInput
          $isLightMode={isLightMode}
          placeholder="Description"
          onChange={onHandleDescChange}
          value={todoDesc}
        />
        {selectedId === -1 ? <SCTodoSubmit onClick={createTodoItem} onKeyDown={onKeyDown}>Submit</SCTodoSubmit>
          : <SCTodoSubmit onClick={updateTodoItem} onKeyDown={onKeyDown}>Update</SCTodoSubmit>}
      </div>
      <br />
      <div>
        {todoList
          ?.sort((a, b) => a.priority - b.priority)
          ?.map((item, index) => {
            return (
              <SCTodoWrapper key={item.id}>
                <SCTodoName>{item.name}</SCTodoName>
                <SCTodoDesc>{item.description}</SCTodoDesc>
                <SCTodoBtn onClick={() => onHandleEditMode(item.id)}>Edit</SCTodoBtn>
                <SCTodoBtn onClick={() => onComplete(item.id)}>{item.isCompleted ? 'Complete' : 'Incomplete'}</SCTodoBtn>
                <SCTodoBtn disabled={index === 0} onClick={() => onMoveUp(item.priority)}>
                  Up
                </SCTodoBtn>
                <SCTodoBtn disabled={index === todoList.length - 1} onClick={() => onMoveDown(item.priority)}>
                  Down
                </SCTodoBtn>
                <SCTodoBtn onClick={() => onDelete(item.id)}>Delete</SCTodoBtn>
              </SCTodoWrapper>
            );
          })}
      </div>
    </div>
  );
};

export default Todo;
