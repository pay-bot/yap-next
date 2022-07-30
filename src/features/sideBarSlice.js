import { createSlice } from '@reduxjs/toolkit';

const initialState = { isOpen: true };

const sideBarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    handleSideBar: (state) => {
      const currState = state;

      currState.isOpen = !currState.isOpen;
    },
  },
});

export const { handleSideBar } = sideBarSlice.actions;

export default sideBarSlice.reducer;
