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
