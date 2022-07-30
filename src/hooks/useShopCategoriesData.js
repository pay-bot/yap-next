import { useMutation, useQuery, useQueryClient } from 'react-query';
// import axios from 'axios'
import request from '../utils/axios-utils';

const fetchShopCategories = () =>
  // return axios.get('http://localhost:4000/shop/categories')
  request({ url: '/shop/categories' });
export const useShopCategoriesData = (onSuccess, onError) =>
  useQuery('shopCategories', fetchShopCategories, {
    onSuccess,
    onError,
  });

const addShopCategories = (shopCategories) =>
  // return axios.post('http://localhost:4000/Navigationes', nav)
  request({
    url: '/shop/categories',
    method: 'post',
    data: shopCategories,
  });
export const useAddShopCategoriesData = () => {
  const queryClient = useQueryClient();

  return useMutation(addShopCategories, {
    /** Optimistic Update Start */
    onMutate: async (newShopCategories) => {
      await queryClient.cancelQueries('shopCategories');
      const previousShopCategories = queryClient.getQueryData('shopCategories');
      queryClient.setQueryData('shopCategories', (oldQueryData) => ({
        ...oldQueryData,
        data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newShopCategories }],
      }));
      return { previousShopCategories };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData('shopCategories', context.previousShopCategories);
    },
    onSettled: () => {
      queryClient.invalidateQueries('shopCategories');
    },
    // onSuccess
    /** Optimistic Update End */
  });
};

export const deleteShopCategories = async (id) =>
  request({
    url: `${process.env.REACT_APP_API_URL}/shop/categories/${id}`,
    method: 'delete',
    data: { _id: id },
  });

export const updateShopCategories = async ({ id, ...data }) =>
  request({
    url: `${process.env.REACT_APP_API_URL}/shop/categories/${id}`,
    method: 'post',
    data,
  });
