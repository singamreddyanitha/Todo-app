import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { HiBadgeCheck } from 'react-icons/hi';
import TodoItem from '../TodoItem';
import './index.css';

const TodosList = () => {
  const [inputTask, setInputTask] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [isSaveEdit, setIsSaveEdit] = useState(false);
  const [favTab, setFavTab] = useState(false);
  const [showTick, setShowTick] = useState(false);

  useEffect(() => {
    const stringifiedTodoList = localStorage.getItem('todoList');
    const parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
      setTodoList([]);
    } else {
      setTodoList(parsedTodoList);
    }
  }, []);

  const onInputChange = event => {
    setInputTask(event.target.value);
  };

  const onAdd = () => {
    if (inputTask === '') {
      alert('Enter valid Text');
      return;
    }
    const todoItem = {
      inputTask,
      id: uuid(),
      isChecked: false,
      isLiked: false,
      isEdit: false,
    };
    setTodoList(prevTodoList => [...prevTodoList, todoItem]);
    setInputTask('');
  };

  const onCheckbox = id => {
    setTodoList(prevTodoList =>
      prevTodoList.map(eachTodo =>
        eachTodo.id === id ? { ...eachTodo, isChecked: !eachTodo.isChecked } : eachTodo
      )
    );
  };

  const onLikeIcon = id => {
    setTodoList(prevTodoList =>
      prevTodoList.map(eachTodo =>
        eachTodo.id === id ? { ...eachTodo, isLiked: !eachTodo.isLiked } : eachTodo
      )
    );
  };

  const onEditIcon = (id, text) => {
    setTodoList(prevTodoList =>
      prevTodoList.map(eachTodo =>
        eachTodo.id === id ? { ...eachTodo, isEdit: !eachTodo.isEdit } : eachTodo
      )
    );
    setInputTask(text);
    setIsSaveEdit(true);
  };

  const onSaveEdit = () => {
    setTodoList(prevTodoList =>
      prevTodoList.map(eachTodo =>
        eachTodo.isEdit ? { ...eachTodo, inputTask, isEdit: false } : eachTodo
      )
    );
    setInputTask('');
    setIsSaveEdit(false);
  };

  const onDeleteIcon = id => {
    setTodoList(prevTodoList => prevTodoList.filter(eachTodo => eachTodo.id !== id));
  };

  const onSave = () => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
    setShowTick(true);
    setTimeout(() => {
      setShowTick(false);
    }, 500);
  };

  const displayMyTasks = () => {
    setFavTab(false);
  };

  const displayFavTasks = () => {
    setFavTab(true);
  };

  const favList = todoList.filter(eachTodo => eachTodo.isLiked === true);
  const headClass = favTab ? '' : 'active-tab';
  const favClass = favTab ? 'active-tab' : '';

  return (
    <div className="todos-bg-container">
      <h1 className="todos-heading">Todos</h1>
      <h1 className="create-task-heading">
        Create <span className="create-task-heading-subpart">Task</span>
      </h1>
      <input
        type="text"
        className="todo-user-input"
        placeholder="What needs to be done?"
        onChange={onInputChange}
        value={inputTask}
      />
      {!isSaveEdit && (
        <button className="button" type="button" onClick={onAdd}>
          Add
        </button>
      )}
      {isSaveEdit && (
        <button className="button" type="button" onClick={onSaveEdit}>
          Save Edit
        </button>
      )}
      <div className="head-container">
        <button className={`task-heading ${headClass}`} type="button" onClick={displayMyTasks}>
          My Tasks
        </button>
        <button className={`task-heading ${favClass}`} type="button" onClick={displayFavTasks}>
          Favorite Tasks
        </button>
      </div>
      {!favTab && (
        <ul className="list-container">
          {todoList.map(eachTodo => (
            <TodoItem
              key={eachTodo.id}
              todoDetails={eachTodo}
              onCheckbox={onCheckbox}
              onEditIcon={onEditIcon}
              onDeleteIcon={onDeleteIcon}
              onLikeIcon={onLikeIcon}
            />
          ))}
        </ul>
      )}
      {favTab && (
        <ul className="list-container">
          {favList.length === 0 ? (
            <p className="no-fav">No Favorites</p>
          ) : (
            favList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                onCheckbox={onCheckbox}
                onEditIcon={onEditIcon}
                onDeleteIcon={onDeleteIcon}
                onLikeIcon={onLikeIcon}
              />
            ))
          )}
        </ul>
      )}

      <div className="tick-container">
        <button className="button" type="button" onClick={onSave}>
          Save
        </button>
        {showTick && <HiBadgeCheck className="icon-tick" />}
      </div>
    </div>
  );
};

export default TodosList;
