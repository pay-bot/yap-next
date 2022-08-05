import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import request from '../utils/axios-utils';

const fetchPages = () =>
  // return axios.get('http://localhost:4000/Pages')
  request({ url: '/pages' });
export const usePagesData = (onSuccess, onError) =>
  useQuery(['pages'], fetchPages, {
    onSuccess,
    onError,
    // select: data => {
    //   const superHeroNames = data.data.map(hero => hero.name)
    //   return superHeroNames
    // }
  });

const addNavigation = (nav) =>
  // return axios.post('http://localhost:4000/Navigationes', nav)
  request({
    url: '/navigations',
    method: 'post',
    data: { ...nav, sectionable_id: '2' },
  });
export const useAddNavigationData = () => {
  const queryClient = useQueryClient();

  return useMutation(addNavigation, {
    onMutate: async (newNav) => {
      await queryClient.cancelQueries('pages');
      const previousNavData = queryClient.getQueryData('pages');
      queryClient.setQueryData('pages', (oldQueryData) => ({
        ...oldQueryData,
        data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newNav }],
      }));
      return { previousNavData };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData('pages', context.previousNavData);
    },
    onSettled: () => {
      queryClient.invalidateQueries('pages');
    },
    /** Optimistic Update End */
  });
};

export const updateBook = async ({ id, ...data }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/news/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.json().message);
  }

  return response.json();
};

export const deletePage = async (id) =>
  await axios
    .delete(`${process.env.REACT_APP_API_URL}/pages/${id}`, { data: { _id: `${id}` } })
    .then(() => console.log(true))
    .catch((err) => err.message);
