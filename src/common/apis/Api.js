import axios from 'axios';

export default axios.create({
  baseURL: `https://api.allorigins.win/raw?url=${process.env.REACT_APP_API_URL}`,
  //   headers: {
  //     'Access-Control-Allow-Origin': '*'
  //  },
});
