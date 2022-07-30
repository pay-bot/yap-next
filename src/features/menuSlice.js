import { createSlice } from '@reduxjs/toolkit';
// import { skills } from "../../components/Skills/Skills";

const initialState = {
  id: '',
  name: '',
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    getParent: (state, action) => {
      const currState = state;
      currState.id = action.payload.id;
      currState.name = action.payload.name;
    },
  },
});

export const { getParent } = menuSlice.actions;

export default menuSlice.reducer;
