import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
// import axios from 'axios'
import { toast } from 'react-toastify';
import request from '../utils/axios-utils';
import { closeLoading, isReactLoading } from '../features/reactLoadingSlice';

const fetchMenus = () =>
  // return axios.get('http://localhost:4000/Navigations')
  request({ url: '/menus' });
export const useMenuData = (onSuccess, onError) =>
  useQuery('menus', fetchMenus, {
    onSuccess,
    onError,
  });

const addMenu = (menu) =>
  // return axios.post('http://localhost:4000/Navigationes', menu)
  request({ url: '/menus', method: 'post', data: menu });
export const useAddMenuData = () => {
  const queryClient = useQueryClient();

  return useMutation(addMenu, {
    /** Optimistic Update Start */
    onMutate: async (newNav) => {
      await queryClient.cancelQueries('menus');
      const previousMenuData = queryClient.getQueryData('menus');
      queryClient.setQueryData('menus', (oldQueryData) => ({
        ...oldQueryData,
        data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newNav }],
      }));
      return { previousMenuData };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData('menus', context.previousMenuData);
    },
    onSettled: () => {
      queryClient.invalidateQueries('menus');
    },
    onSuccess: () => {
      toast.success('Menu Child has been created', { position: 'top-right' });
      dispatch(closeLoading());
    },
    /** Optimistic Update End */
  });
};



export const deleteMenu = async (id) =>
  request({
    url: `${process.env.REACT_APP_API_URL}/menus/${id}`,
    method: 'delete',
    data: { _id: id },
  });

export const updateMenu = async ({ id, ...data }) =>
  request({
    url: `${process.env.REACT_APP_API_URL}/menus/${id}`,
    method: 'put',
    data,
  });
