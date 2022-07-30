import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../common/apis/Api';

export const fetchAsyncHeaders = createAsyncThunk('menus/fetchAsyncHeaders', async () => {
  const response = await Api.get('menus/header');
  // console.log('ini headers redux' , response)
  return response.data;
});

const initialState = { headers: {} };

const menuSlice = createSlice({
  name: 'headers',
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncHeaders.pending]: () => {
      // console.log("Pending");
    },
    [fetchAsyncHeaders.fulfilled]: (state, { payload }) =>
      // console.log("Fetched Successfully!");
      ({ ...state, headers: payload }),
    [fetchAsyncHeaders.rejected]: () => {
      // console.log("Rejected!");
    },
  },
});

// export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getHeaders = (state) => state.headers.headers;

export default menuSlice.reducer;
