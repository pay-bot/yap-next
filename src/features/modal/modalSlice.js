import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  componentName: null,
  id: null,
  modalData: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const currState = state;
      currState.isOpen = true;
      currState.id = action.payload.id;
      currState.componentName = action.payload.name;
      currState.modalData = action.payload.modalData;
    },
    closeModal: (state) => {
      const currState = state;
      currState.isOpen = !state.isOpen;
      currState.id = null;
      currState.componentName = null;
      currState.modalData = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
