import { useMutation, useQuery, useQueryClient } from 'react-query';
// import axios from 'axios'
import request from '../utils/axios-utils';

const fetchArticleTags = () =>
  // return axios.get('http://localhost:4000/news/tags')
  request({ url: '/news/tags' });
export const useArticleTagsData = (onSuccess, onError) =>
  useQuery('articleTags', fetchArticleTags, {
    onSuccess,
    onError,
  });

const addArticleTags = (articleTags) =>
  // return axios.post('http://localhost:4000/Navigationes', nav)
  request({
    url: '/news/tags',
    method: 'post',
    data: articleTags,
  });
export const useAddArticleTagsData = () => {
  const queryClient = useQueryClient();

  return useMutation(addArticleTags, {
    /** Optimistic Update Start */
    onMutate: async (newArticleTags) => {
      await queryClient.cancelQueries('articleTags');
      const previousArticleTags = queryClient.getQueryData('articleTags');
      queryClient.setQueryData('articleTags', (oldQueryData) => ({
        ...oldQueryData,
        data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newArticleTags }],
      }));
      return { previousArticleTags };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData('articleTags', context.previousArticleTags);
    },
    onSettled: () => {
      queryClient.invalidateQueries('articleTags');
    },
    // onSuccess
    /** Optimistic Update End */
  });
};

export const deleteArticleTags = async (id) =>
  request({
    url: `${process.env.REACT_APP_API_URL}/news/tags/${id}`,
    method: 'delete',
    data: { _id: id },
  });

export const updateArticleTags = async ({ id, ...data }) =>
  request({
    url: `${process.env.REACT_APP_API_URL}/news/tags/${id}`,
    method: 'put',
    data,
  });
