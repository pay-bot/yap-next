import { useMutation, useQuery, useQueryClient } from 'react-query';
// import axios from 'axios'
import axios from 'axios';
import request from '../utils/axios-utils';

const fetchNavigations = () =>
  // return axios.get('http://localhost:4000/Navigations')
  request({ url: '/settings/navigations' });
export const useNavigationsData = (onSuccess, onError) =>
  useQuery('navigations', fetchNavigations, {
    onSuccess,
    onError,
  });

const addNavigation = (nav) =>
  // return axios.post('http://localhost:4000/Navigationes', nav)
  request({ url: '/settings/navigations', method: 'post', data: nav });
export const useAddNavigationData = () => {
  const queryClient = useQueryClient();

  return useMutation(addNavigation, {
    /** Optimistic Update Start */
    onMutate: async (newNav) => {
      await queryClient.cancelQueries('navigations');
      const previousNavData = queryClient.getQueryData('navigations');
      queryClient.setQueryData('navigations', (oldQueryData) => ({
        ...oldQueryData,
        data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newNav }],
      }));
      return { previousNavData };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData('navigations', context.previousNavData);
    },
    onSettled: () => {
      queryClient.invalidateQueries('navigations');
    },
    /** Optimistic Update End */
  });
};

export const deleteNav = async (id) =>
  request({
    url: `${process.env.REACT_APP_API_URL}/settings/navigations/${id}`,
    method: 'delete',
    data: { _id: id },
  });

export const updateNav = async ({ id, ...data }) =>
  axios
    .put(`${process.env.REACT_APP_API_URL}/settings/navigations/${id}`, data)
    .then((res) => res.data)
    .catch((err) => console.log(err.message));
