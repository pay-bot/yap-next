import { useMutation, useQuery, useQueryClient } from 'react-query';
// import axios from 'axios'
import request from '../utils/axios-utils';

const fetchResource = () =>
  // return axios.get('http://localhost:4000/resources/categories')
  request({ url: '/resources/categories' });
export const useResourcesData = (onSuccess, onError) =>
  useQuery('resourcesCategory', fetchResource, {
    onSuccess,
    onError,
  });

const addResources = (resources) =>
  // return axios.post('http://localhost:4000/Navigationes', nav)
  request({
    url: '/resources/categories',
    method: 'post',
    data: resources,
  });
export const useAddResourcesData = () => {
  const queryClient = useQueryClient();

  return useMutation(addResources, {
    /** Optimistic Update Start */
    onMutate: async (newResources) => {
      await queryClient.cancelQueries('resources');
      const previousResources = queryClient.getQueryData('resources');
      queryClient.setQueryData('resources', (oldQueryData) => ({
        ...oldQueryData,
        data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newResources }],
      }));
      return { previousResources };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData('resources', context.previousResources);
    },
    onSettled: () => {
      queryClient.invalidateQueries('resources');
    },
    // onSuccess
    /** Optimistic Update End */
  });
};

export const deleteResource = async (id) =>
  request({
    url: `${process.env.REACT_APP_API_URL}/resources/categories/${id}`,
    method: 'delete',
    data: { _id: id },
  });

export const updateResources = async ({ id, ...data }) =>
  request({
    url: `${process.env.REACT_APP_API_URL}/resources/categories/${id}`,
    method: 'put',
    data,
  });
