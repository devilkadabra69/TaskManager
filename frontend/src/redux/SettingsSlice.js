// src/features/settings/settingsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: 'light',
    notificationsEnabled: true,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleTheme: state => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        toggleNotifications: state => {
            state.notificationsEnabled = !state.notificationsEnabled;
        },
    },
});

export const { toggleTheme, toggleNotifications } = settingsSlice.actions;
export default settingsSlice.reducer;
