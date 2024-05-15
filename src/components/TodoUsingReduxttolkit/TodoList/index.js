import React, {  useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import TodoItem from "../TodoItem";
import { addTodo } from "../todoSlice";
// import {v4 as uuid} from "uuid";


const TodoList = () => {
    const [inputTask, setInput] = useState("");
    const dispatch = useDispatch();
    const todoList = useSelector(state => state.todos);
    // console.log(input);

    useEffect(() => {
        const stringifiedTodoList = localStorage.getItem("todoList");
        const parsedTodoList = JSON.parse(stringifiedTodoList);

        if(parsedTodoList !== null) {
            dispatch(addTodo(parsedTodoList))
            // parsedTodoList.forEach((todo) => {
            //   dispatch(addTodo(todo));
            // });
        } 
    }, [dispatch])


    const onInputChange = (e) => {
        setInput(e.target.value);

    }

    const onAdd = () => {
        if(inputTask === "") {
            alert("Enter valid text");
            return;
        }
        dispatch(addTodo(
           inputTask
          // id: uuid(),
          // isChecked: false,
          // isLiked: false,
          // isEdit: false,
 
        ));
        setInput("");
    }

    const onSave = () => {
      localStorage.setItem("todoList", JSON.stringify(todoList));
        alert("Todos saved!")
    }

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
      <button className="button" type="button" onClick={onAdd}>
        Add
      </button>
      <ul className="list-container">
        {todoList.map(eachTodo => (
            <TodoItem key = {eachTodo.id} todoDetails = {eachTodo} />
        ))}
      </ul>
      <button type = "button" className="button" onClick={onSave}>Save</button>
    </div>
  );
};

export default TodoList;
