import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';
import { closeModal } from '../../features/modal/modalSlice';
import CategoryForm from '../form/shop/CategoryForm';
import request from '../../utils/axios-utils';
import ModalWrapper from './ModalWrapper';
import { closeLoading, isReactLoading } from '../../features/reactLoadingSlice';

export default function AddCategoryShopModal() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const createTag = (data) => {
    return request({
      url: `/shop/categories`,
      method: 'post',
      data,
    });
  };

  const { mutateAsync } = useMutation(createTag, {
    onSuccess: (e) => {
      queryClient.invalidateQueries('shopCategories');

      if (e.request.status === 200) {
        toast.success('Category has been created', { position: 'top-right' });
      } else {
        toast.error('Category failed to create  ', { position: 'top-right' });
      }
    },
  });

  const onSubmitCategory = async (data) => {
    dispatch(isReactLoading());
    await mutateAsync(data);
    dispatch(closeLoading());
    dispatch(closeModal());
  };

  const dataModal = useSelector((state) => state.modal);

  return (
    <ModalWrapper componentName="AddCategoryShop" modalid={dataModal.id}>
      <CategoryForm onFormSubmit={onSubmitCategory} isLoading="" />
    </ModalWrapper>
  );
}
