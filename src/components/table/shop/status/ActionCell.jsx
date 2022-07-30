import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import { closeModal, openModal } from '../../../../features/modal/modalSlice';
import Edit from '../../../button/Edit';
import Delete from '../../../button/Delete';
import { closeLoading, isReactLoading } from '../../../../features/reactLoadingSlice';
import ModalWrapper from '../../../modal/ModalWrapper';

import CategoryForm from '../../../form/category/CategoryForm';
import { deleteShopStatuses, updateShopStatuses } from '../../../../hooks/useShopsData';

export default function ActionCell({ value, data }) {
  const dispatch = useDispatch();
  const dataModal = useSelector((state) => state.modal);
  const { id } = dataModal;
  const queryClient = useQueryClient();

  const { mutateAsync: mutateUpdate } = useMutation(updateShopStatuses, {
    onSuccess: (e) => {
      queryClient.invalidateQueries('shopStatuses');
      if (e.request.status === 200) {
        toast.success('Feature has been created', { position: 'top-right' });
      } else {
        toast.error('Feature failed to create  ', { position: 'top-right' });
      }
    },
  });

  const { mutateAsync } = useMutation(deleteShopStatuses, {
    onSuccess: () => {
      queryClient.invalidateQueries('shopStatuses');
    },
  });
  const removeFeature = async (idStatus) => {
    await swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutateAsync(idStatus);
        swal('Poof! Your imaginary file has been deleted!', { icon: 'success' });
      } else {
        swal('Your imaginary file is safe!');
      }
    });
  };

  const onFormSubmit = async (dataStatus) => {
    dispatch(isReactLoading());
    await mutateUpdate({ ...dataStatus, id });
    dispatch(closeLoading());
    dispatch(closeModal());
  };

  return (
    <div className="flex items-center gap-x-1 ">
      {data.map((status) => {
        let html;

        if (status.id.toString() === value.toString()) {
          return (
            <>
              <Edit tooltip={`Edit ${status.name}`} onClick={() => dispatch(openModal({ componentName: 'EditShopStatus', id: value }))} />
              <Delete tooltip={`Delete ${status.name}`} onClick={() => removeFeature(value)} />
            </>
          );
        }
        return html;
      })}
      <ModalWrapper componentName="EditShopStatus" modalid={value}>
        {data.map((status) => {
          let html;

          if (status.id.toString() === dataModal.id.toString()) {
            return <CategoryForm name="EditShopStatus" defaultValues={status} key={status.id} onFormSubmit={onFormSubmit} />;
          }
          return html;
        })}
      </ModalWrapper>
    </div>
  );
}
