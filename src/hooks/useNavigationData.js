import axios from 'axios';

export const fetchNavigationData = async ({ queryKey }) => {
  const [_key, { navId }] = queryKey;
  return await axios
    .get(`${process.env.REACT_APP_API_URL}/settings/navigations/${navId}/edit`)
    .then((res) => res.data)
    .catch((err) => console.log(err.message));
};
