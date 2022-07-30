import axios from 'axios';

export const deleteText = async (id) =>
  await axios
    .delete(`${process.env.REACT_APP_API_URL}/texts/${id}`, { data: { _id: `${id}` } })
    .then(() => console.log(true))
    .catch((err) => err.message);
