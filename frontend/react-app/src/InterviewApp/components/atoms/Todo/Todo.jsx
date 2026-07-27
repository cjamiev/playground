import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useThemeContext } from '../../../context/ThemeProvider';
import Modal from '../Modal';
import { getTodos, updateTodos } from './todoActions';
import {
  SCSectionWrapper,
  SCTodoForm,
  SCTodoInput,
  SCTodoListContainer,
  SCTodoWrapper,
  SCTodoName,
  SCTodoDesc,
  SCTodoBtn,
  SCTodoListBtn,
  SCTodoHeader,
  SCTodoTextHeader,
  SCTodoBtnHeader,
  SCSortAndFilterWrapper,
  SCFilterLabel,
  SCSortLabel,
  SCSortBtn,
  SCSearchFilter,
  SCErrorMsg
} from './styles';

const sortByPriority = (a, b) => a.priority - b.priority;
const sortByName = ((a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
});
const sortByDesc = ((a, b) => {
  if (a.description < b.description) {
    return -1;
  }
  if (a.description > b.description) {
    return 1;
  }
  return 0;
});
const getSortingFunction = (sortBy) => {
  if (sortBy === 'priority') {
    return sortByPriority;
  }
  if (sortBy === 'name') {
    return sortByName;
  }
  return sortByDesc;
}

const Todo = () => {
  const { isLightMode } = useThemeContext();
  const [sortBy, setSortBy] = useState('priority');
  const [filterBy, setFilterBy] = useState('');
  const [todoName, setTodoName] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const [selectedId, setSelectedId] = useState(-1);
  const [errorMsg, setErrorMsg] = useState("");
  const { todoList, isLoadingTodos } = useSelector((state) => state.todos);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const sortingFuction = getSortingFunction(sortBy);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const onHandleNameChange = (event) => {
    setTodoName(event?.target?.value);
  };

  const onHandleDescChange = (event) => {
    setTodoDesc(event?.target?.value);
  };

  const createTodoItem = () => {
    const matchedName = todoList.some(item => item.name === todoName);
    if (matchedName) {
      setErrorMsg('Please Enter Unique Name');
    }
    else if (todoName && todoDesc) {
      const id = todoList.length + 1;
      const updatedList = todoList.concat([{
        id,
        name: todoName,
        description: todoDesc,
        createdDate: (new Date()).toLocaleDateString(),
        isCompleted: false,
        priority: id
      }])
      dispatch(updateTodos(updatedList));
      setSelectedId(-1);
      setTodoName('');
      setTodoDesc('');
      setErrorMsg('');
      inputRef.current.focus();
    } else {
      setErrorMsg('Please Enter Both Name and Description1');
    }
  };

  const onHandleEditMode = (id) => {
    const selectedTodo = todoList.find((item) => item.id === id);
    if (selectedTodo) {
      setSelectedId(id);
      setTodoName(selectedTodo.name);
      setTodoDesc(selectedTodo.description);
      setErrorMsg('');
    }
  };

  const updateTodoItem = () => {
    const matchedName = todoList.find(item => item.name === todoName);
    if (matchedName && matchedName.id !== selectedId) {
      setErrorMsg('Please Enter Unique Name');
    }
    else if (todoName && todoDesc) {
      const updatedList = todoList.map(item => {
        if (item.id === selectedId) {
          return {
            ...item,
            name: todoName,
            description: todoDesc,
            createdDate: (new Date()).toLocaleDateString(),
            completedDate: '',
            isCompleted: false,
          }
        } else {
          return item;
        }
      })
      dispatch(updateTodos(updatedList));
      setSelectedId(-1);
      setTodoName('');
      setTodoDesc('');
      setErrorMsg('');
      inputRef.current.focus();
    } else {
      setErrorMsg('Please Enter Both Name and Description2');
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
          completedDate: !item.isCompleted ? (new Date()).toLocaleDateString() : '',
        };
      } else {
        return item;
      }
    });
    dispatch(updateTodos(updatedList));
  };

  const onDelete = (itemId, itemName) => {
    const confirmationModalBtnList = [{
      label: 'Confirm',
      action: () => {
        const updatedList = todoList.filter((item) => (item.id !== itemId));
        dispatch(updateTodos(updatedList));
      }
    }, {
      label: 'Cancel',
      action: () => { setIsModalVisible(false) }
    }];

    setModalProps({
      title: 'Confirmation Modal',
      message: `Are you sure you want to delete task: ${itemName}?`,
      close: () => { setIsModalVisible(false) },
      buttonList: confirmationModalBtnList,
    });
    setIsModalVisible(true);
  };

  const onHandleFilterChange = (event) => {
    setFilterBy(event.target.value);
  }

  if (isLoadingTodos) {
    return <div>Is Loading...</div>
  }

  return (
    <SCSectionWrapper>
      <Modal {...modalProps} isModalVisible={isModalVisible} />
      <h2>Simple ToDo App</h2>
      <SCTodoForm>
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
          {selectedId === -1 ? <SCTodoBtn onClick={createTodoItem}>Submit</SCTodoBtn>
            : <SCTodoBtn onClick={updateTodoItem}>Update</SCTodoBtn>}
          {errorMsg && <SCErrorMsg>{errorMsg}</SCErrorMsg>}
        </div>
        <SCSortAndFilterWrapper>
          <SCFilterLabel>Filter </SCFilterLabel>
          <SCSearchFilter onChange={onHandleFilterChange} value={filterBy} />
          <SCFilterLabel>Sort By:</SCFilterLabel>
          <SCSortBtn id="sort-name" type='radio' name='sort' checked={sortBy === 'name'} onChange={() => setSortBy('name')} />
          <SCSortLabel htmlFor="sort-name">Name</SCSortLabel>
          <SCSortBtn id="sort-desc" type='radio' name='sort' checked={sortBy === 'description'} onChange={() => setSortBy('description')} />
          <SCSortLabel htmlFor="sort-desc">Description</SCSortLabel>
          <SCSortBtn id="sort-priority" type='radio' name='sort' checked={sortBy === 'priority'} onChange={() => setSortBy('priority')} />
          <SCSortLabel htmlFor="sort-priority">Priority</SCSortLabel>
        </SCSortAndFilterWrapper>
      </SCTodoForm>
      <br />
      <SCTodoListContainer>
        <SCTodoHeader>
          <SCTodoTextHeader>Name</SCTodoTextHeader>
          <SCTodoTextHeader>Description</SCTodoTextHeader>
          <SCTodoTextHeader>Create</SCTodoTextHeader>
          <SCTodoTextHeader>When</SCTodoTextHeader>
          <SCTodoBtnHeader>Complete</SCTodoBtnHeader>
          <SCTodoBtnHeader>Update</SCTodoBtnHeader>
          <SCTodoBtnHeader>Move Up</SCTodoBtnHeader>
          <SCTodoBtnHeader>Move Down</SCTodoBtnHeader>
          <SCTodoBtnHeader>Delete</SCTodoBtnHeader>
        </SCTodoHeader>
        {todoList
          .filter(item => item.name.toUpperCase().includes(filterBy.toUpperCase()) || item.description.toUpperCase().includes(filterBy.toUpperCase()))
          .toSorted(sortingFuction)
          .map((item, index) => {
            return (
              <SCTodoWrapper key={item.id}>
                <SCTodoName>{item.name}</SCTodoName>
                <SCTodoDesc>{item.description}</SCTodoDesc>
                <SCTodoDesc>{item.createdDate}</SCTodoDesc>
                <SCTodoDesc>{item.completedDate ?? '---'}</SCTodoDesc>
                <SCTodoListBtn onClick={() => onComplete(item.id)}>{item.isCompleted ? 'Done' : 'WIP'}</SCTodoListBtn>
                <SCTodoListBtn onClick={() => onHandleEditMode(item.id)}>Edit</SCTodoListBtn>
                <SCTodoListBtn disabled={index === 0 || sortBy !== 'priority' || filterBy !== ''} onClick={() => onMoveUp(item.priority)}>
                  Up
                </SCTodoListBtn>
                <SCTodoListBtn disabled={index === todoList.length - 1 || sortBy !== 'priority' || filterBy !== ''} onClick={() => onMoveDown(item.priority)}>
                  Down
                </SCTodoListBtn>
                <SCTodoListBtn onClick={() => onDelete(item.id, item.name)}>Delete</SCTodoListBtn>
              </SCTodoWrapper>
            );
          })}
      </SCTodoListContainer>
    </SCSectionWrapper>
  );
};

export default Todo;
