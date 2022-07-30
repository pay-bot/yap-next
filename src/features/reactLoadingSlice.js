import { createSlice } from '@reduxjs/toolkit';

const initialState = { isReactLoading: false, componentName: null, loadingMessage: null };

const reactLoadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    isReactLoading: (state, action) => {
      const currState = state;
      currState.isReactLoading = true;
      // currState.componentName = action.payload.componentName;
      // currState.loadingMessage = action.payload.loadingMessage;
    },
    closeLoading: (state) => {
      const currState = state;
      currState.isReactLoading = false;
      // currState.componentName = null;
      // currState.loadingMessage = null;
    },
  },
});

export const { isReactLoading, closeLoading } = reactLoadingSlice.actions;

export default reactLoadingSlice.reducer;
