import axios from 'axios';
import Cookies from 'js-cookie';

const client = axios.create({ baseURL: `http://127.0.0.1:8000/api/admin` });
const token = Cookies.get('admin-token');

export default function request(options) {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;

  const onSuccess = (response) => response;
  const onError = (error) => error;
  return client(options).then(onSuccess).catch(onError);
}
