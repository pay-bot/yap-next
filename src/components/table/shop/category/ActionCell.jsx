import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';

import swal from 'sweetalert';
import { toast } from 'react-toastify';
import Edit from '../../../button/Edit';
import Delete from '../../../button/Delete';
import { deleteShopCategories } from '../../../../hooks/useShopCategoriesData';
import CategoryForm from '../../../form/shop/CategoryForm';
import ModalWrapper from '../../../modal/ModalWrapper';
import { closeModal, openModal } from '../../../../features/modal/modalSlice';
import { closeLoading, isReactLoading } from '../../../../features/reactLoadingSlice';
import request from '../../../../utils/axios-utils';

export default function ActionCell({ value, data }) {
  const dispatch = useDispatch();
  const dataModal = useSelector((state) => state.modal);
  const queryClient = useQueryClient();

  const { id } = dataModal;

  const updateCategory = (dataCategory) => {
    return request({
      headers: { 'Content-Type': 'application/json' },
      url: `/shop/categories/${id}`,
      method: 'post',
      data: dataCategory,
    });
  };

  const { mutateAsync: mutateUpdate } = useMutation(updateCategory, {
    onSuccess: (e) => {
      queryClient.invalidateQueries('shopCategories');
      if (e.request.status === 200) {
        toast.success('Category has been created', { position: 'top-right' });
      } else {
        toast.error('Category failed to create  ', { position: 'top-right' });
      }
    },
  });

  const { mutateAsync: deleteCategory } = useMutation(deleteShopCategories, {
    onSuccess: () => {
      queryClient.invalidateQueries('shopCategories');
    },
  });
  const removeCategory = async (idCat) => {
    await swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteCategory(idCat);
        swal('Poof! Your imaginary file has been deleted!', { icon: 'success' });
      } else {
        swal('Your imaginary file is safe!');
      }
    });
  };

  const onFormSubmit = async (dataCategory) => {
    dispatch(isReactLoading());
    await mutateUpdate(dataCategory);
    dispatch(closeLoading());
    dispatch(closeModal());
  };

  return (
    <div className="flex items-center gap-x-1">
      {data.map((cat) => {
        let html;

        if (cat.id === value) {
          return (
            <>
              <Edit tooltip={`Edit ${cat.name}`} onClick={() => dispatch(openModal({ componentName: 'EditShopCat', id: value }))} />
              <Delete tooltip={`Delete ${cat.name}`} onClick={() => removeCategory(value)} />
            </>
          );
        }
        return html;
      })}
      <ModalWrapper componentName="EditShopCat" modalid={value}>
        {data.map((cat) => {
          let html;

          if (cat.id.toString() === dataModal.id.toString()) {
            return (
              <CategoryForm
                defaultValues={cat}
                key={cat.id}
                onFormSubmit={onFormSubmit}
                // isLoading={isMutatingUpdate}
              />
            );
          }
          return html;
        })}
      </ModalWrapper>
    </div>
  );
}
