import { useEffect, useState } from 'react';
import { useMutation, useQueries, useQueryClient, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch, useSelector } from 'react-redux';
import request from '../utils/axios-utils';
import { isDeleteOn, isSubmitOff } from '../features/crudSlice';
import { closeLoading, isReactLoading } from '../features/reactLoadingSlice';
import { closeModal } from '../features/website/modal/modalSlice';
import { toast } from 'react-toastify';


const MySwal = withReactContent(Swal);

// const fetchStructures = (query) => request({ url: `/pages/${query}/sections` });

// export const useSiteStructureData  = (query) => {

// return useQueries({
//   queries: query?.map((struc) => {
//     return {
//       queryKey: ["structures", struc.id],
//       queryFn: () => fetchStructures(struc.id),
//     };
//   }),
// })}


const fetchPages = () =>
  // return axios.get('http://localhost:4000/Pages')
  request({ url: '/pages' });
export const usePagesData = (onSuccess, onError) =>
  useQuery(['pages'], fetchPages, {
    onSuccess,
    onError,

  });


const fetchPageDetail = ({ queryKey }) => {
  const collectionId = queryKey[1]; // destructured collectionId param passed as prop where queryKey[1] is the id
  console.log('colid', queryKey);
  return request({ url: `/pages/${collectionId}/edit` });
};

export const usePageDetail = (collectionId) => {
  const queryClient = useQueryClient();
  const dataModal = useSelector((state) => state.modal);
  console.log('col', dataModal);

  const [isAutoFetching, setIsAutoFetching] = useState(false);
  useEffect(() => {
    if (dataModal.componentName === 'editPage') {
      setIsAutoFetching(true);
    }
  }, []);

  return useQuery(['pages', collectionId], fetchPageDetail, {
    initialData: () => {
      const collection = queryClient.getQueryData(['pages'])?.data?.find((collections) => collections.id === parseInt(collectionId, 10));

      if (collection) {
        return { data: collection };
      }
      return undefined;
    },
    enabled: isAutoFetching,
  });
};

const addPage = (data) =>
  // return axios.post('http://localhost:4000/Navigationes', menu)
  request({ url: '/pages', method: 'post', data });

export const useAddPageData = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // const onLoad = toast.loading('Loading  ', { position: 'top-right' });

  let onLoad


  return useMutation(addPage, {

    /** Optimistic Update Start */
    onMutate: async (newNav) => {
      onLoad = toast.loading('Loading  ', { position: 'top-right' });
      dispatch(closeModal());

      await queryClient.cancelQueries(['pages']);
      const previousData = queryClient.getQueryData(['pages']);
      queryClient.setQueryData(['pages'], (oldQueryData) => ({
        ...oldQueryData,
        data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newNav }],
      }));
      return { previousData };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(['pages'], context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['pages']);
      dispatch(isSubmitOff());
    },
    onSuccess: (data) => {
      if (data.status === 200) {

        toast.update(onLoad, { render: "All is good", type: "success", isLoading: false });
        // toast.success('Succcess', { position: 'top-right' });
      } else
        MySwal.fire({
          title: 'Error',
          text: _data.message,
        });
      // toast.error('Succcess', { position: 'top-right' });

    },
    /** Optimistic Update End */
  })
};


const updatePage = (id, data) => {
  return request({ url: `/pages/${id}`, method: 'put', data });
};

export const useUpdatePage = (id) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  let onLoad

  return useMutation((data) => updatePage(id, data), {
    onMutate: async (newData) => {
      onLoad = toast.loading('Loading  ', { position: 'top-right' });
    },

    onError: (err, newData, context) => {
      queryClient.setQueryData(['pages', context.newData.id], context.previousData);
    },
    onSettled: (newData) => {
      dispatch(isSubmitOff());
      queryClient.invalidateQueries(['pages', newData.id]);
      dispatch(closeLoading());
      dispatch(closeModal());

    },
    onSuccess: (data) => {
      if (data.status === 200) {

        toast.update(onLoad, { render: "All is good", type: "success", isLoading: false });
        // toast.success('Succcess', { position: 'top-right' });
      } else

        toast.update(onLoad, { render: "Error", type: "error", isLoading: false });

    },
  });
};


const deletePage = async (id) =>
  request({
    url: `/pages/${id}`,
    method: 'delete',
    data: { _id: id },
  });

const useDeletePage = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation(deletePage, {
    onSuccess: (_data) => {
      if (_data.status === 200) {
        MySwal.fire({ title: 'Succcess' });
      } else
        MySwal.fire({
          title: 'Error',
          text: _data.message,
        });
      console.log('data', _data);
      dispatch(isDeleteOn({ statusCode: _data.status, statusMessage: _data.message }));

      /** Query Invalidation Start */
      queryClient.invalidateQueries(['pages']);

      /** Handling Mutation Response Start */
      // queryClient.setQueryData('super-heroes', oldQueryData => {
      //   return {
      //     ...oldQueryData,
      //     data: [...oldQueryData.data, data.data]
      //   }
      // })
    },
    onSettled: () => {
      queryClient.invalidateQueries(['pages']);
    },
    onError: (err) => {
      console.log('err', err);
    },
  });
};

export const useDestroyPage = (id) => {
  const { mutate: deleteCont } = useDeletePage(id);
  const deleteRes = useSelector((state) => state.crud.deleteReq);
  const dispatch = useDispatch();

  console.log('red', deleteRes);

  return async (idColl) => {
    await MySwal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((willDelete) => {
      console.log(willDelete);
      if (willDelete.isConfirmed) {
        deleteCont(idColl);
      } else {
        MySwal.fire({ title: 'Your imaginary file is safe!' });
      }
    });
    dispatch(isDeleteOn({ statusCode: '', statusMessage: '' }));
  };
};


