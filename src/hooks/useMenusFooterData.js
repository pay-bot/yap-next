import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios'
import axios from 'axios';
import request from '../utils/axios-utils';

const fetchFooters = () =>
  // return axios.get('http://localhost:4000/Navigations')
  request({ url: '/menus/footer' });
export const useMenusFooterData = (onSuccess, onError) =>
  useQuery('menuFooter', fetchFooters, {
    onSuccess,
    onError,
  });

const addMenuFooter = (footer) =>
  // return axios.post('http://localhost:4000/Navigationes', footer)
  request({ url: '/menus/footer', method: 'post', data: footer });
export const useAddNavigationData = () => {
  const queryClient = useQueryClient();

  return useMutation(addMenuFooter, {
    /** Optimistic Update Start */
    onMutate: async (newNav) => {
      await queryClient.cancelQueries('menuFooter');
      const previousFooterData = queryClient.getQueryData('menuFooter');
      queryClient.setQueryData('menuFooter', (oldQueryData) => ({
        ...oldQueryData,
        data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newNav }],
      }));
      return { previousFooterData };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData('menuFooter', context.previousFooterData);
    },
    onSettled: () => {
      queryClient.invalidateQueries('menuFooter');
    },
    /** Optimistic Update End */
  });
};

export const deleteNav = async (id) =>
  request({
    url: `${process.env.REACT_APP_API_URL}/menus/footer/${id}`,
    method: 'delete',
    data: { _id: id },
  });

export const updateNav = async ({ id, ...data }) =>
  axios
    .put(`${process.env.REACT_APP_API_URL}/menus/footer/${id}`, data)
    .then((res) => res.data)
    .catch((err) => console.log(err.message));
