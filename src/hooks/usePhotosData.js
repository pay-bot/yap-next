import { useQuery } from 'react-query';
import request from '../utils/axios-utils';

export const fetchPhotos = () => request({ url: '/resources/photos' });

export const usePhotosData = (onSuccess, onError) =>
  useQuery('photos', fetchPhotos, {
    onSuccess,
    onError,
  });

export const deletePhoto = async (id) =>
  request({
    url: `/resources/photos/${id}`,
    method: 'delete',
    data: { _id: `${id}` },
  });
