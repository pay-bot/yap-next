import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../../common/apis/Api';

export const fetchAsyncThemes = createAsyncThunk('themes/fetchAsyncThemes', async () => {
  const response = await Api.get('themes');
  // console.log('ini themes redux' , response)
  return response.data;
});

const initialState = { themes: {} };

const themeSlice = createSlice({
  name: 'themes',
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncThemes.pending]: () => {
      // console.log("Pending");
    },
    [fetchAsyncThemes.fulfilled]: (state, { payload }) =>
      // console.log("Fetched Successfully!");
      ({ ...state, themes: payload }),
    [fetchAsyncThemes.rejected]: () => {
      // console.log("Rejected!");
    },
  },
});

export const getThemes = (state) => state.themes.themes;

export default themeSlice.reducer;
