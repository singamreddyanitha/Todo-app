import React from 'react'
import { Provider } from 'react-redux';
import store from "./TodoUsingReduxttolkit/store.js";
import TodoList from './TodoUsingReduxttolkit/TodoList';

const MainFileTodosApp = () => {
  return (
   <Provider store = {store}>
      <TodoList />
   </Provider>
  )
}

export default MainFileTodosApp