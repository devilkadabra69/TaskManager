// src/features/task/taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  toDo: [],
  inProgress: [],
  completed: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      state.toDo.push(action.payload);
    },
    moveToInProgress: (state, action) => {
      const task = state.toDo.find(task => task.id === action.payload);
      if (task) {
        state.toDo = state.toDo.filter(task => task.id !== action.payload);
        state.inProgress.push(task);
      }
    },
    moveToCompleted: (state, action) => {
      const task = state.inProgress.find(task => task.id === action.payload);
      if (task) {
        state.inProgress = state.inProgress.filter(task => task.id !== action.payload);
        state.completed.push(task);
      }
    },
  },
});

export const { addTask, moveToInProgress, moveToCompleted } = taskSlice.actions;
export default taskSlice.reducer;
