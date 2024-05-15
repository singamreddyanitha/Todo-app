import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(inputTask) {
        return {
          payload: { inputTask, id: uuid(), isChecked: false, isLiked: false , isEdit: false },
        };
      },
    },

    toggleTodo(state, action) {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.isChecked = !todo.isChecked;
      }
    },

    toggleFavorite(state, action) {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.isLiked = !todo.isLiked;
      }
    },
    editTodo(state, action) {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.inputTask = action.payload.inputTask;
      }
    },

    deleteTodo(state, action) {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, toggleFavorite, toggleTodo, editTodo, deleteTodo } =
  todosSlice.actions;

export default todosSlice.reducer;
