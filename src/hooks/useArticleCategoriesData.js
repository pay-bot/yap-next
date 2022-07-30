import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios'
import request from '../utils/axios-utils';

const fetchArticleCategories = () =>
  // return axios.get('http://localhost:4000/news/categories')
  request({ url: '/news/categories' });
export const useArticleCategoriesData = (onSuccess, onError) =>
  useQuery('articleCategories', fetchArticleCategories, {
    onSuccess,
    onError,
  });

const addArticleCategories = (articleCategories) =>
  // return axios.post('http://localhost:4000/Navigationes', nav)
  request({
    url: '/news/categories',
    method: 'post',
    data: articleCategories,
  });
export const useAddArticleCategoriesData = () => {
  const queryClient = useQueryClient();

  return useMutation(addArticleCategories, {
    /** Optimistic Update Start */
    onMutate: async (newArticleCategories) => {
      await queryClient.cancelQueries('articleCategories');
      const previousArticleCategories = queryClient.getQueryData('articleCategories');
      queryClient.setQueryData('articleCategories', (oldQueryData) => ({
        ...oldQueryData,
        data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newArticleCategories }],
      }));
      return { previousArticleCategories };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData('articleCategories', context.previousArticleCategories);
    },
    onSettled: () => {
      queryClient.invalidateQueries('articleCategories');
    },
    // onSuccess
    /** Optimistic Update End */
  });
};

export const deleteArticleCategories = async (id) =>
  request({
    url: `${process.env.REACT_APP_API_URL}/news/categories/${id}`,
    method: 'delete',
    data: { _id: id },
  });

export const updateArticleCategories = async ({ id, ...data }) =>
  request({
    url: `${process.env.REACT_APP_API_URL}/news/categories/${id}`,
    method: 'put',
    data,
  });
