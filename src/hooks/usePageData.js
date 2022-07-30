import axios from 'axios';

export const usePageData = async ({ queryKey }) => {
  const [_key, { pageId }] = queryKey;
  return await axios
    .get(`${process.env.REACT_APP_API_URL}/pages/${pageId}/edit`)
    .then((res) => res.data)
    .catch((err) => console.log(err.message));
};
