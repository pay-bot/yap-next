import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../common/apis/Api';

export const fetchAsyncArticles = createAsyncThunk('articles/fetchAsyncArticles', async () => {
  const response = await Api.get('articles');
  // console.log('ini articles redux' , response)
  return response.data;
});

export const fetchAsyncArticleDetail = createAsyncThunk('articles/fetchAsyncArticleDetail', async (slug) => {
  const response = await Api.get(`articles/${slug}`);
  return response.data;
});

const initialState = {
  articles: {},
  selectArticle: {},
};

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    removeSelectedArticle: (state) => {
      state.selectArticle = {};
    },
  },
  extraReducers: {
    [fetchAsyncArticles.pending]: () => {
      // console.log("Pending");
    },
    [fetchAsyncArticles.fulfilled]: (state, { payload }) =>
      // console.log("Fetched Successfully!");
      ({ ...state, articles: payload }),
    [fetchAsyncArticles.rejected]: () => {
      // console.log("Rejected!");
    },

    [fetchAsyncArticleDetail.fulfilled]: (state, { payload }) =>
      // console.log("Fetched Successfully!");
      ({ ...state, selectArticle: payload }),
  },
});

export const { removeSelectedArticle } = articleSlice.actions;
export const getAllArticles = (state) => state.articles.articles;
export const getSelectedArticle = (state) => state.articles.selectArticle;
export default articleSlice.reducer;
