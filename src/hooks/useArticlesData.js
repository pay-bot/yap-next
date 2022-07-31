import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios'
import request from '../utils/axios-utils';

const fetchArticle = () =>
  // return axios.get('http://localhost:4000/news/articles')
  request({ url: '/news/articles' });
export const useArticlesData = (onSuccess, onError) =>
  useQuery(['articles'], fetchArticle, {
    onSuccess,
    onError,
  });

const addArticle = (article) =>
  // return axios.post('http://localhost:4000/Navigationes', nav)
  request({ url: '/news/articles', method: 'post', data: article });
export const useAddArticleData = () => {
  const queryClient = useQueryClient();

  return useMutation(addArticle, {
    /** Optimistic Update Start */
    onMutate: async (newArticle) => {
      await queryClient.cancelQueries('articles');
      const previousArticle = queryClient.getQueryData('articles');
      queryClient.setQueryData('articles', (oldQueryData) => ({
        ...oldQueryData,
        data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newArticle }],
      }));
      return { previousArticle };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData('articles', context.previousArticle);
    },
    onSettled: () => {
      queryClient.invalidateQueries('articles');
    },

    /** Optimistic Update End */
  });
};

export const deleteArticle = async (id) =>
  request({
    url: `/news/articles/${id}`,
    method: 'delete',
    data: { _id: `${id}` },
  });

// export const updateArticle = async ({ id, ...data }) =>
//   axios
//     .put(`${process.env.REACT_APP_API_URL}/news/articles/${id}`, data)
//     .then((res) => res.data)
//     .catch((err) => console.log(err.message));

// // export const useUpdateArticle = async ({ id, ...data }) => {
// //   const { articleId } = useParams();

// //   return request({
// //     url: `/news/articles/${articleId}`,
// //     method: "post",
// //     data,

// //   }
// //   );
// // };

const fetchArticleDetail = ({ queryKey }) => {
  const articleId = queryKey[1]; // destructured articleId param passed as prop where queryKey[1] is the id
  return request({ url: `/news/articles/${articleId}/edit` });
};

export const useArticleDetail = (articleId) => {
  const queryClient = useQueryClient();

  return useQuery(['article', articleId], fetchArticleDetail, {
    initialData: () => {
      const article = queryClient.getQueryData('articles')?.data?.find((articles) => articles.id === parseInt(articleId));

      if (article) {
        return { data: article };
      }
      return undefined;
    },
  });
};

export const updateArticle = (id, data) => {
  console.log('id0', id, 'data', data);

  return request({ url: `/news/articles/${id}`, method: 'post', data });
};

export const useUpdateArticle = (id, meta) => {
  console.log('id', id, 'meta', meta);
  const queryClient = useQueryClient();
  return useMutation((data) => updateArticle(id, data), {
    onSuccess: (data) => {
      // enqueueSnackbar('Contact updated successfully!!', {
      //   variant: 'success',
      //   autoHideDuration: 3000,
      // });
      /** Query Invalidation Start */
      // queryClient.invalidateQueries('contacts');
      /** Handling Mutation Response Start */
      queryClient.setQueryData(['article', meta], (oldContacts) => {
        console.log('oldContacts', oldContacts);

        const updatedContacts = oldContacts.results.map((oldContacts) => (oldContacts.id === id ? data : oldContacts));
        oldContacts.results = updatedContacts;
        return oldContacts;
      });
    },
  });
};
