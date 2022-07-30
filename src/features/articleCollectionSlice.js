import { createSlice } from '@reduxjs/toolkit';
// import { skills } from "../../components/Skills/Skills";

const initialState = {
  isFill: [],
  componentName: null,
  // modalChildPosition: null,
  // childrenProps: {},
  id: '',
};
const articleCollectionSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    fillCollection: (state, action) => {
      const currState = state;
      currState.isFill = action.payload;
      currState.id = action.payload.id;
      currState.componentName = action.payload.name;
      // currState.modalChildPosition = action.payload.position || "center";
      // currState.childrenProps = action.payload.childrenProps;
      console.log('isFill', currState.isFill);
    },
    resetCollection: (state) => {
      const currState = state;
      currState.isFill = [];
      currState.componentName = null;
      currState.modalChildPosition = 'center';
      currState.childrenProps = {};
    },
    // getSkill: (state, action) => {
    //   state.skill
    // },
  },
});

export const { fillCollection, resetCollection } = articleCollectionSlice.actions;

export default articleCollectionSlice.reducer;
