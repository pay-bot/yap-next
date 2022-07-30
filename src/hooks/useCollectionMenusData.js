import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch, useSelector } from 'react-redux';
import request from '../utils/axios-utils';
import { isDeleteOn, isSubmitOff } from '../features/crudSlice';
import { closeLoading, isReactLoading } from '../features/reactLoadingSlice';
import { closeModal } from '../features/website/modal/modalSlice';
import { toast } from 'react-toastify';


const MySwal = withReactContent(Swal);

const fetchCollectionMenus = () => request({ url: '/menus/collections' });

export const useCollectionMenusData = (onSuccess, onError) =>
  useQuery(['menuCollections'], fetchCollectionMenus, {
    onSuccess,
    onError,
  });

const fetchCollectionDetail = ({ queryKey }) => {
  const collectionId = queryKey[1]; // destructured collectionId param passed as prop where queryKey[1] is the id
  console.log('col', collectionId);
  return request({ url: `/menus/collections/${collectionId}/edit` });
};

export const useCollectionDetail = (collectionId) => {
  const queryClient = useQueryClient();
  const dataModal = useSelector((state) => state.modal);
  const [isAutoFetching, setIsAutoFetching] = useState(false);
  useEffect(() => {
    if (dataModal.componentName === 'EditCollection') {
      setIsAutoFetching(true);
    }
  }, []);

  return useQuery(['menuCollections', collectionId], fetchCollectionDetail, {
    initialData: () => {
      const collection = queryClient.getQueryData(['menuCollections'])?.data?.find((collections) => collections.id === parseInt(collectionId, 10));

      if (collection) {
        return { data: collection };
      }
      return undefined;
    },
    enabled: isAutoFetching,
  });
};


const addMenuCollection = (data) =>
  // return axios.post('http://localhost:4000/Navigationes', menu)
  request({ url: '/menus/collections', method: 'post', data });

export const useAddMenuCollectionData = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // const onLoad = toast.loading('Loading  ', { position: 'top-right' });

  let onLoad


  return useMutation(addMenuCollection, {

    /** Optimistic Update Start */
    onMutate: async (newNav) => {
      onLoad = toast.loading('Loading  ', { position: 'top-right' });
      dispatch(closeModal());

      await queryClient.cancelQueries('menuCollections');
      const previousMenuData = queryClient.getQueryData('menuCollections');
      queryClient.setQueryData('menuCollections', (oldQueryData) => ({
        ...oldQueryData,
        data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newNav }],
      }));
      return { previousMenuData };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData('menuCollections', context.previousMenuData);
    },
    onSettled: () => {
      queryClient.invalidateQueries('menuCollections');
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



const updateCollection = (id, data) => {
  return request({ url: `/menus/collections/${id}`, method: 'put', data });
};

export const useUpdateCollection = (id) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  let onLoad

  return useMutation((data) => updateCollection(id, data), {
    onMutate: async (newData) => {
      onLoad = toast.loading('Loading  ', { position: 'top-right' });
    },

    onError: (err, newData, context) => {
      queryClient.setQueryData(['menuCollections', context.newData.id], context.previousData);
    },
    onSettled: (newData) => {
      dispatch(isSubmitOff());
      queryClient.invalidateQueries(['menuCollections', newData.id]);
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

const deleteCollectionMenus = async (id) =>
  request({
    url: `${process.env.REACT_APP_API_URL}/menus/collections/${id}`,
    method: 'delete',
    data: { _id: id },
  });

const useDeleteCollMenu = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation(deleteCollectionMenus, {
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
      queryClient.invalidateQueries('menuCollections');

      /** Handling Mutation Response Start */
      // queryClient.setQueryData('super-heroes', oldQueryData => {
      //   return {
      //     ...oldQueryData,
      //     data: [...oldQueryData.data, data.data]
      //   }
      // })
    },
    onSettled: () => {
      queryClient.invalidateQueries('menuCollections');
    },
    onError: (err) => {
      console.log('err', err);
    },
  });
};

export const useDestroyCollMenu = (id) => {
  const { mutate: deleteCont } = useDeleteCollMenu(id);
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
