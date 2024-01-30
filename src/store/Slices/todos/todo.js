import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTodos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.allTodos = action.payload;
    },
    addTodo: (state, action) => {
      state.allTodos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.allTodos = state.allTodos.filter(
        (todo) => todo.id !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTodos, addTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
