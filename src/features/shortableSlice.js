import { createSlice } from '@reduxjs/toolkit';
// import { skills } from "../../components/Skills/Skills";

const initialState = { isMove: false };

const shortableSlice = createSlice({
  name: 'shortable',
  initialState,
  reducers: {
    onMoveStart: (state) => {
      const currState = state;

      currState.isMove = true;
    },
    onMoveEnd: (state) => {
      const currState = state;

      currState.isMove = !currState.isMove;
    },
  },
});

export const { onMoveStart, onMoveEnd } = shortableSlice.actions;

export default shortableSlice.reducer;
