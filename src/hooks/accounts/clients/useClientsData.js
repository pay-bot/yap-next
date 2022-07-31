import { useQuery } from '@tanstack/react-query';
import request from '../../../utils/axios-utils';

const fetchClient = () => request({ url: '/accounts/clients' });

export const useClientsData = (onSuccess, onError) =>
  useQuery('clients', fetchClient, {
    onSuccess,
    onError,
  });

export const deleteClient = async (id) =>
  request({
    url: `/accounts/clients/${id}`,
    method: 'delete',
    data: { _id: `${id}` },
  });
