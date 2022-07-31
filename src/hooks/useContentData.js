import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios'
import axios from 'axios';
import request from '../utils/axios-utils';

const fetchArticle = () =>
  // return axios.get('http://localhost:4000/news/articles')
  request({ url: '/news/articles' });
export const useArticlesData = (onSuccess, onError) =>
  useQuery('articles', fetchArticle, {
    onSuccess,
    onError,
  });

const addArticle = (article) =>
  // return axios.post('http://localhost:4000/Navigationes', nav)
  request({ url: '/news/articles', method: 'post', data: article });
export const useAddArticleData = () => {
  const queryClient = useQueryClient();

  return useMutation(addArticle, {
    /** Optimistic Update Start */
    onMutate: async (newArticle) => {
      await queryClient.cancelQueries('articles');
      const previousArticle = queryClient.getQueryData('articles');
      queryClient.setQueryData('articles', (oldQueryData) => ({
        ...oldQueryData,
        data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newArticle }],
      }));
      return { previousArticle };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData('articles', context.previousArticle);
    },
    onSettled: () => {
      queryClient.invalidateQueries('articles');
    },
    /** Optimistic Update End */
  });
};

export const deleteArticle = async (id) =>
  await axios
    .delete(`${process.env.REACT_APP_API_URL}/news/articles/${id}`, { data: { _id: `${id}` } })
    .then(() => console.log(true))
    .catch((err) => err.message);

export const updateArticle = async ({ id, ...data }) =>
  axios
    .put(`${process.env.REACT_APP_API_URL}/news/articles/${id}`, data)
    .then((res) => res.data)
    .catch((err) => console.log(err.message));
