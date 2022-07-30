import axios from 'axios';

export const useSectionData = async ({ queryKey }) => {
  const [_key, { pageId, sectionId, contentId }] = queryKey;
  return await axios
    .get(`${process.env.REACT_APP_API_URL}/pages/${pageId}/sections/${sectionId}/content/${contentId}/edit`)
    .then((res) => res.data)
    .catch((err) => console.log(err.message));
};

export const updateSectionData = async ({ queryKey, ...data }) => {
  const [_key, { pageId, id }] = queryKey;
  return axios
    .put(`${process.env.REACT_APP_API_URL}/pages/${pageId}/sections/${id}`, data)
    .then((res) => res.data)
    .catch((err) => console.log(err.message));
};

export const removeMedia = async ({ queryKey, ...data }) => {
  const [_key, { pageId, sectionId, contentId }] = queryKey;
  return axios
    .delete(`${process.env.REACT_APP_API_URL}/pages/${pageId}/sections/${sectionId}/content/${contentId}/removeMedia`, data)
    .then((res) => res.data)
    .catch((err) => console.log(err.message));
};
