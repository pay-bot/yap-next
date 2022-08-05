import { useEffect, useState } from 'react';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch, useSelector } from 'react-redux';
import request from '../utils/axios-utils';
import { isDeleteOn, isSubmitOff } from '../features/crudSlice';
import { closeLoading, isReactLoading } from '../features/reactLoadingSlice';
import { closeModal } from '../features/website/modal/modalSlice';
import { toast } from 'react-toastify';


const MySwal = withReactContent(Swal);

const fetchStructures = (query) => request({ url: `/pages/${query}/sections` });

export const useSiteStructureData  = (query) => {

return useQueries({
  queries: query?.map((struc) => {
    return {
      queryKey: ["structures", struc.id],
      queryFn: () => fetchStructures(struc.id),
    };
  }),
})}