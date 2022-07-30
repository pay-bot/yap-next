import { useQuery } from 'react-query';
// import axios from 'axios'
import request from '../utils/axios-utils';

const fetchRole = () => request({ url: '/settings/roles' });

export const useRolesData = (onSuccess, onError) =>
  useQuery('roles', fetchRole, {
    onSuccess,
    onError,
  });

export const deleteRole = async (id) =>
  request({
    url: `/settings/roles/${id}`,
    method: 'delete',
    data: { _id: `${id}` },
  });
