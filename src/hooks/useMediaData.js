import { useMutation, useQuery, useQueryClient } from 'react-query';
// import axios from 'axios'
import request from '../utils/axios-utils';

const fetchMedias = () =>
  // return axios.get('http://localhost:4000/resources/photos')
  request({ url: '/resources/photos' });
export const useMediasData = (onSuccess, onError) =>
  useQuery('medias', fetchMedias, {
    onSuccess,
    onError,
  });

const addMedias = (medias) =>
  // return axios.post('http://localhost:4000/Navigationes', nav)
  request({
    url: '/resources/photos',
    method: 'post',
    data: medias,
  });
export const useAddMediasData = () => {
  const queryClient = useQueryClient();

  return useMutation(addMedias, {
    /** Optimistic Update Start */
    onMutate: async (newMedias) => {
      await queryClient.cancelQueries('medias');
      const previousMedias = queryClient.getQueryData('medias');
      queryClient.setQueryData('medias', (oldQueryData) => ({
        ...oldQueryData,
        data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newMedias }],
      }));
      return { previousMedias };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData('medias', context.previousMedias);
    },
    onSettled: () => {
      queryClient.invalidateQueries('medias');
    },
    /** Optimistic Update End */
  });
};

export const deleteMedias = async (id) =>
  request({
    url: `/resources/photos/${id}`,
    method: 'delete',
    data: { _id: `${id}` },
  });
