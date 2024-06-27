import { createSlice } from '@reduxjs/toolkit';

const timetableSlice = createSlice({
  name: 'timetable',
  initialState: [],
  reducers: {
    addSchedule: (state, action) => {
      state.push(action.payload);
    },
    removeSchedule: (state, action) => {
      return state.filter(schedule => schedule.id !== action.payload.id);
    },
    updateSchedule: (state, action) => {
      const index = state.findIndex(schedule => schedule.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    setNotificationSent: (state, action) => {
      const index = state.findIndex(schedule => schedule.id === action.payload.id);
      if (index !== -1) {
        state[index].notificationSent = true;
      }
    },
  },
});

export const { addSchedule, removeSchedule, updateSchedule, setNotificationSent } = timetableSlice.actions;
export default timetableSlice.reducer;
