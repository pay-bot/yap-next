import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import request from '../../utils/axios-utils';
import { closeModal } from '../../features/modal/modalSlice';
import MenuForm from '../form/menu/Form';
import ModalWrapper from './ModalWrapper';
import { closeLoading, isReactLoading } from '../../features/reactLoadingSlice';

export default function AddMenuModal() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const createMenu = (data) => {
    return request({
      url: `/menus`,
      method: 'post',
      data,
    });
  };

  const { mutateAsync } = useMutation(createMenu, {
    onSuccess: (e) => {
      queryClient.invalidateQueries('menus');
      if (e.request.status === 200) {
        toast.success('Menu has been created', { position: 'top-right' });
      } else {
        toast.error('Menu failed to create  ', { position: 'top-right' });
      }
    },
  });

  const onSubmitMenu = async (data) => {
    dispatch(isReactLoading());
    await mutateAsync(data);
    dispatch(closeLoading());
    dispatch(closeModal());
  };

  const dataModal = useSelector((state) => state.modal);

  return (
    <ModalWrapper componentName={dataModal.componentName} modalid={dataModal.id}>
      <MenuForm onFormSubmit={onSubmitMenu} isLoading="" />
    </ModalWrapper>
  );
}
