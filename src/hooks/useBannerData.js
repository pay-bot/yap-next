import axios from 'axios';

export const fetchBannerData = async ({ queryKey }) => {
  const [_key, { bannerId }] = queryKey;
  return await axios
    .get(`${process.env.REACT_APP_API_URL}/banners/${bannerId}/edit`)
    .then((res) => res.data)
    .catch((err) => console.log(err.message));
};
