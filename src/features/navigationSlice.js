import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  iconParent: null,
  iconChild: '',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    addIcon: (state, action) => {
      const currState = state;

      currState.iconParent.push(action.payload);
      currState.iconChild = action.payload.child;
    },
  },
});

export const { addIcon } = navigationSlice.actions;
export default navigationSlice.reducer;
