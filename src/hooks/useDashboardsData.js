import { useQuery } from '@tanstack/react-query';
import request from '../utils/axios-utils';

const fetchDashboard = () => request({ url: '/overall' });

export const useOverAllData = (onSuccess, onError) =>
  useQuery(['dashboard'], fetchDashboard, {
    onSuccess,
    onError,
  });

const fetchArticleChart = () => request({ url: '/article-chart' });

export const useArticleChart = (onSuccess, onError) =>
  useQuery('article-chart', fetchArticleChart, {
    onSuccess,
    onError,
  });

const fetchShopOverAll = () => request({ url: '/shop-overall' });

export const useShopOverAll = (onSuccess, onError) =>
  useQuery('shop-ovaerall', fetchShopOverAll, {
    onSuccess,
    onError,
  });

const fetchArticleOverAll = () => request({ url: '/article-overall' });

export const useArticleOverAll = (onSuccess, onError) =>
  useQuery('article-ovaerall', fetchArticleOverAll, {
    onSuccess,
    onError,
  });
