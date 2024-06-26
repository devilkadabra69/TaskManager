import { createSlice } from '@reduxjs/toolkit';

const tagsSlice = createSlice({
    name: 'tags',
    initialState: [],
    reducers: {
        addTag: (state, action) => {
            state.push(action.payload);
        },
        removeTag: (state, action) => {
            return state.filter(tag => tag !== action.payload);
        },
        updateTag: (state, action) => {
            const index = state.findIndex(tag => tag === action.payload.oldTag);
            if (index !== -1) {
                state[index] = action.payload.newTag;
            }
        },
    },
});

export const { addTag, removeTag, updateTag } = tagsSlice.actions;
export default tagsSlice.reducer;
