import { configureStore } from "@reduxjs/toolkit"
import TodoSlice from "./TodoSlice"
import SettingsSlice from "./SettingsSlice"
import UserSlice from "./UserSlice"


export const store = configureStore({
    reducer: {
        TodoSlice,
        SettingsSlice,
        UserSlice
    }
})