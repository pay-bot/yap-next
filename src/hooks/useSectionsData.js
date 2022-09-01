import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import request from '../utils/axios-utils';

export const fetchSections = async ({ queryKey }) => {
  const [_key, { pageId, sectionId }] = queryKey;
  return request({ url: `/pages/${pageId}/sections/${sectionId}/content` });
};

export const fetchPages = async ({ queryKey }) => {
  const [_key, { pageId }] = queryKey;
  return request({ url: `/pages/${pageId}/sections` });
};


export const useSectionsData = (onSuccess, onError) =>
  useQuery('sections', fetchSections, {
    onSuccess,
    onError,
    // select: data => {
    //   const superHeroNames = data.data.map(hero => hero.name)
    //   return superHeroNames
    // }
  });

const addSection = async ({ nav, queryKey }) => {
  const [_key, { pageId }] = queryKey;

  // return axios.post('http://localhost:4000/Navigationes', nav)
  return request({
    url: `/pages/${pageId}/section`,
    method: 'post',
    data: nav,
  });
};

export const useAddSectionData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSection, {
    onMutate: async (newNav) => {
      await queryClient.cancelQueries('sections');
      const previousNavData = queryClient.getQueryData('sections');
      queryClient.setQueryData('sections', (oldQueryData) => ({
        ...oldQueryData,
        data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newNav }],
      }));
      return { previousNavData };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData('sections', context.previousNavData);
    },
    onSettled: () => {
      queryClient.invalidateQueries('sections');
    },
    /** Optimistic Update End */
  });
};

export const updateBook = async ({ id, ...data }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/news/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.json().message);
  }

  return response.json();
};
