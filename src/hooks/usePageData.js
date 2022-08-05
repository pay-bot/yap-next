import axios from 'axios';

export const usePageData = async ({ queryKey }) => {
  const [_key, { pageId }] = queryKey;
  return await axios
    .get(`${process.env.NEXT_PUBLIC_API_KEY}/pages/${pageId}/edit`)
    .then((res) => res.data)
    .catch((err) => console.log(err.message));
};
