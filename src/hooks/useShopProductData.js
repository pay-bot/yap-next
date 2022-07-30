import axios from 'axios';

export const useShopProductData = async ({ queryKey }) => {
  const [_key, { productId }] = queryKey;
  return await axios
    .get(`${process.env.REACT_APP_API_URL}/shop/products/${productId}/edit`)
    .then((res) => res.data)
    .catch((err) => console.log(err.message));
};
