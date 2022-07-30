import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deleteReq: {
    statusCode: '',
    statusMessage: null,
  },
  submitReq: {
    submit : false,
    componentName : ''
  }
};

const crudSlice = createSlice({
  name: 'crud',
  initialState,
  reducers: {
    isDeleteOn: (state, action) => {
      const currState = state;
      currState.deleteReq.statusCode = action.payload.statusCode;
      currState.deleteReq.statusMessage = action.payload.statusMessage;
    },
    isSubmitOn: (state, action) => {
      const currState = state;
      currState.submitReq.submit = true;
      currState.submitReq.componentName = action.payload.componentName;
    },
    isSubmitOff: (state) => {
      const currState = state;
      currState.submitReq.submit = false;
      currState.submitReq.componentName = null;
    },
  },
});

export const { isDeleteOn, isSubmitOn, isSubmitOff } = crudSlice.actions;

export default crudSlice.reducer;
