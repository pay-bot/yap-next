import { useQuery } from 'react-query';
// import axios from 'axios'
import request from '../utils/axios-utils';

const fetchShopFeatures = () =>
  // return axios.get('http://localhost:4000/shop/features')
  request({ url: '/shop/features' });
export const useShopFeaturesData = (onSuccess, onError) =>
  useQuery('shopFeatures', fetchShopFeatures, {
    onSuccess,
    onError,
  });

const fetchShopStatuses = () =>
  // return axios.get('http://localhost:4000/shop/features')
  request({ url: '/shop/status' });
export const useShopStatusesData = (onSuccess, onError) =>
  useQuery('shopStatuses', fetchShopStatuses, {
    onSuccess,
    onError,
  });

export const updateShopStatuses = async ({ id, ...data }) =>
  request({
    url: `${process.env.REACT_APP_API_URL}/shop/status/${id}`,
    method: 'put',
    data,
  });

export const deleteShopStatuses = async (id) =>
  request({
    url: `${process.env.REACT_APP_API_URL}/shop/status/${id}`,
    method: 'delete',
    data: { _id: id },
  });

export const deleteShopFeatures = async (id) =>
  request({
    url: `${process.env.REACT_APP_API_URL}/shop/features/${id}`,
    method: 'delete',
    data: { _id: id },
  });

export const updateShopFeatures = async ({ id, ...data }) =>
  request({
    url: `${process.env.REACT_APP_API_URL}/shop/features/${id}`,
    method: 'put',
    data,
  });
