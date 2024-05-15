import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo, toggleFavorite, toggleTodo } from "../todoSlice";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./index.css";

const TodoItem = ({ todoDetails }) => {
  const dispatch = useDispatch();
  const { inputTask, id, isChecked, isLiked } = todoDetails;

  console.log(todoDetails);

  const onCheckbox = () => {
    dispatch(toggleTodo(id));
  };

  const onEditIcon = () => {
    const editedText = prompt("Edit your task", inputTask);
    if (editedText !== null) {
      dispatch(editTodo({ id, inputTask: editedText }));
    }
  };

  const onDeleteIcon = () => {
    if(window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTodo(id));
    }
  };

  const onLikeIcon = () => {
    dispatch(toggleFavorite(id));
  };

  const checkboxLabel = isChecked ? "checkbox-labelline" : "checkbox-label";

  return (
    <li className="list-item">
      <input
        type="checkbox"
        id={id}
        className="checkbox-input"
        checked={isChecked}
        onChange={onCheckbox}
      />
      <div className="label-container">
        <label className={checkboxLabel} htmlFor={id}>
          {inputTask}
        </label>
        <div className="icons-container">
          {isLiked ? (
            <HiHeart className="icon" onClick={onLikeIcon} />
          ) : (
            <HiOutlineHeart className="icon" onClick={onLikeIcon} />
          )}
          <BiEdit className="icon" onClick={onEditIcon} />
          <RiDeleteBin6Line className="icon" onClick={onDeleteIcon} />
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
