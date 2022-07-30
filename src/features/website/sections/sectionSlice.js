import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../common/apis/Api';

export const fetchAsyncSections = createAsyncThunk('sections/fetchAsyncSections', async () => {
  const pagesId = 1;
  const response = await Api.get(`pages/${pagesId}/sections`);
  // console.log('ini' , response)
  return response.data;
});

// export const fetchAsyncShows = createAsyncThunk(
//   "movies/fetchAsyncShows",
//   async () => {
//     const seriesText = "Friends";
//     const response = await Api.get(
//       `?i=tt3896198&apiKey=${APIKey}&s=${seriesText}&type=series`
//     );
//     return response.data;
//   }
// );

// export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
//   "movies/fetchAsyncMovieOrShowDetail",
//   async (id) => {
//     const response = await Api.get(`?i=tt3896198&apiKey=${APIKey}&i=${id}&Plot=full`);
//     return response.data;
//   }
// );

const initialState = {
  sections: {},
  // shows: {},
  // selectMovieOrShow: {},
};

const sectionSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncSections.pending]: () => {
      // console.log("Pending");
    },
    [fetchAsyncSections.fulfilled]: (state, { payload }) =>
      // console.log("Fetched Successfully!");
      ({ ...state, sections: payload }),
    [fetchAsyncSections.rejected]: () => {
      // console.log("Rejected!");
    },
    // [fetchAsyncShows.fulfilled]: (state, { payload }) => {
    //   //console.log("Fetched Successfully!");
    //   return { ...state, shows: payload };
    // },
    // [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
    //   //console.log("Fetched Successfully!");
    //   return { ...state, selectMovieOrShow: payload };
    // },
  },
});

// export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllSections = (state) => state.sections.sections;
// export const getAllShows = (state) => state.movies.shows;
// export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default sectionSlice.reducer;
