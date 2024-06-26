import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: []
}

const todoslice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            const { id, title, content, completeBy, status, tags } = action.payload;
            const existingTodo = state.todos.find(todo => todo.id === id);
            if (existingTodo) {
                existingTodo.title = title;
                existingTodo.content = content;
                existingTodo.completeBy = completeBy;
                existingTodo.status = status;
                existingTodo.tags = tags;
            }
        }
    }
})
export const { addTodo, removeTodo, updateTodo } = todoslice.actions;
export default todoslice.reducer;