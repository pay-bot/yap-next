import { useQuery } from 'react-query';
// import axios from 'axios'
import request from '../utils/axios-utils';

const fetchComment = () => request({ url: '/news/comments' });

export const useCommentsData = (onSuccess, onError) =>
  useQuery('comments', fetchComment, {
    onSuccess,
    onError,
  });

export const deleteComment = async (id) =>
  request({
    url: `/news/comments/${id}`,
    method: 'delete',
    data: { _id: `${id}` },
  });
