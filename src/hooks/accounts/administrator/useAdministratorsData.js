import { useQuery } from '@tanstack/react-query';
import request from '../../../utils/axios-utils';

export const fetchAdministrator = () => request({ url: '/accounts/administrators' });

export const useAdministratorsData = (onSuccess, onError) =>
  useQuery('clients', fetchAdministrator, {
    onSuccess,
    onError,
  });
