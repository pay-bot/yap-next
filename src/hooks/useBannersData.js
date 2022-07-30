import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { closeLoading, isReactLoading } from '../features/reactLoadingSlice';
import request from '../utils/axios-utils';


const MySwal = withReactContent(Swal);


const fetchBanners = () => request({ url: '/banners' });

// export const useBannersData = (onSuccess, onError) =>
//   useQuery('banners', fetchBanners, {
//     onSuccess,
//     onError,
//   });

const bannersData = () => {
  const dispatch = useDispatch();

  return useQuery(['banners'], fetchBanners, {
    onSettled: () => {
      dispatch(closeLoading());
    },
  });
};

export const useBannersData = () => {
  const dispatch = useDispatch();

  const { data } = bannersData();

  useEffect(() => {
    if (data) {
      dispatch(isReactLoading());
      setTimeout(() => {
        dispatch(closeLoading());
      }, 100);
    } else dispatch(isReactLoading());
  }, [dispatch, data]);

  return data;
};

// export const deleteBanner = async (id) =>
//   request({
//     url: `/banners/${id}`,
//     method: 'delete',
//     data: { _id: `${id}` },
//   });

const fetchBannerDetail = ({ queryKey }) => {
  const bannerId = queryKey[1]; // destructured bannerId param passed as prop where queryKey[1] is the id
  console.log('col', bannerId);
  return request({ url: `/banners/${bannerId}/edit` });
};

const bannerDetail = (bannerId) => {
  const dispatch = useDispatch();

  return useQuery(['banner-detail', bannerId], fetchBannerDetail, {
    onSettled: () => {
      dispatch(closeLoading());
    },
  });
};

export const useBannerDetail = (bannerId) => {
  const dispatch = useDispatch();

  const { data } = bannerDetail(bannerId);

  useEffect(() => {
    if (data) {
      dispatch(isReactLoading());
      setTimeout(() => {
        dispatch(closeLoading());
      }, 100);
    } else dispatch(isReactLoading());
  }, [dispatch, data]);

  return data;
};

const updateBanner = (id, data) => {
  return request({ url: `/banners/${id}`, method: 'put', data });
};

export const useUpdateBanner = (id) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation((data) => updateBanner(id, data), {
    onMutate: async (newData) => {
      dispatch(isReactLoading());

      await queryClient.cancelQueries(['banners', newData.id]);
      const previousData = queryClient.getQueryData(['banners', newData.id]);
      queryClient.setQueryData(['banners', newData.id], newData);
      return { previousData, newData };
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData(['banners', context.newData.id], context.previousData);
    },
    onSettled: (newData) => {
      queryClient.invalidateQueries(['banners', newData.id]);
      dispatch(closeLoading());
    },
  });
};

const deleteBaner = async (id) =>
  request({
    url: `/banners/${id}`,
    method: 'delete',
    data: { _id: id },
  });

const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation(deleteBaner, {
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
      queryClient.invalidateQueries('banners');

      /** Handling Mutation Response Start */
      // queryClient.setQueryData('super-heroes', oldQueryData => {
      //   return {
      //     ...oldQueryData,
      //     data: [...oldQueryData.data, data.data]
      //   }
      // })
    },
    onSettled: () => {
      queryClient.invalidateQueries('banners');
    },
    onError: (err) => {
      console.log('err', err);
    },
  });
};

export const useDestroyBanner = (id) => {
  const { mutate: deleteCont } = useDeleteBanner(id);
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
