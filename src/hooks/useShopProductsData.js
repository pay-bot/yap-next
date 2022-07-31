import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios'
import request from '../utils/axios-utils';

const fetchShopProducts = () =>
  // return axios.get('http://localhost:4000/shop/products')
  request({ url: '/shop/products' });
export const useShopProductsData = (onSuccess, onError) =>
  useQuery('shopProducts', fetchShopProducts, {
    onSuccess,
    onError,
  });

const addShopProducts = (shopProducts) =>
  // return axios.post('http://localhost:4000/Navigationes', nav)
  request({
    url: '/shop/products',
    method: 'post',
    data: shopProducts,
  });
export const useAddShopProductsData = () => {
  const queryClient = useQueryClient();

  return useMutation(addShopProducts, {
    /** Optimistic Update Start */
    onMutate: async (newShopProducts) => {
      await queryClient.cancelQueries('shopProducts');
      const previousShopProducts = queryClient.getQueryData('shopProducts');
      queryClient.setQueryData('shopProducts', (oldQueryData) => ({
        ...oldQueryData,
        data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newShopProducts }],
      }));
      return { previousShopProducts };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData('shopProducts', context.previousShopProducts);
    },
    onSettled: () => {
      queryClient.invalidateQueries('shopProducts');
    },
    // onSuccess
    /** Optimistic Update End */
  });
};

export const deleteShopProducts = async (id) =>
  request({
    url: `${process.env.REACT_APP_API_URL}/shop/products/${id}`,
    method: 'delete',
    data: { _id: id },
  });

export const updateShopProducts = async ({ id, ...data }) =>
  request({
    url: `${process.env.REACT_APP_API_URL}/shop/products/${id}`,
    method: 'put',
    data,
  });
