import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const token = Cookies.get('admin-token');
const name = Cookies.get('admin-name');
const authReducer = createSlice({
  name: 'authReducer',
  initialState: {
    adminToken: token || null,
    adminName: name || null,
  },
  reducers: {
    setAdminToken: (state, action) => {
      const currState = state;
      currState.adminToken = action.payload;
      currState.adminName = name;
    },
    removeAdmin: (state) => {
      Cookies.remove('admin-token');
      const currState = state;

      currState.adminToken = null;
    },
  },
});
export const { setAdminToken, removeAdmin } = authReducer.actions;
export default authReducer.reducer;
