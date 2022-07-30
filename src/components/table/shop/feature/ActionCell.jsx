import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import { closeModal, openModal } from '../../../../features/modal/modalSlice';
import Edit from '../../../button/Edit';
import Delete from '../../../button/Delete';
import { closeLoading, isReactLoading } from '../../../../features/reactLoadingSlice';
import ModalWrapper from '../../../modal/ModalWrapper';
import { deleteShopFeatures, updateShopFeatures } from '../../../../hooks/useShopFeaturesData';

import CategoryForm from '../../../form/category/CategoryForm';

export default function ActionCell({ value, data }) {
  const dispatch = useDispatch();
  const dataModal = useSelector((state) => state.modal);
  const queryClient = useQueryClient();

  const { id } = dataModal;

  const { mutateAsync: mutateUpdate } = useMutation(updateShopFeatures, {
    onSuccess: (e) => {
      queryClient.invalidateQueries('shopFeatures');
      if (e.request.status === 200) {
        toast.success('Feature has been created', { position: 'top-right' });
      } else {
        toast.error('Feature failed to create  ', { position: 'top-right' });
      }
    },
  });

  const { mutateAsync } = useMutation(deleteShopFeatures, {
    onSuccess: () => {
      // queryClient.invalidateQueries("shopFeatures");
    },
  });
  const removeFeature = async (idFeatures) => {
    await swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutateAsync(idFeatures);
        swal('Poof! Your imaginary file has been deleted!', { icon: 'success' });
      } else {
        swal('Your imaginary file is safe!');
      }
    });
  };

  const onFormSubmit = async (dataFeatures) => {
    dispatch(isReactLoading());
    await mutateUpdate({ ...dataFeatures, id });
    dispatch(closeLoading());
    dispatch(closeModal());
  };

  return (
    <div className="flex items-center gap-x-1 ">
      {data.map((feat) => {
        let html;

        if (feat.id.toString() === value.toString()) {
          return (
            <>
              <Edit tooltip={`Edit ${feat.name}`} onClick={() => dispatch(openModal({ componentName: 'EditArticleCat', id: value }))} />
              <Delete tooltip={`Delete ${feat.name}`} onClick={() => removeFeature(value)} />
            </>
          );
        }
        return html;
      })}
      <ModalWrapper componentName="EditArticleCat" modalid={value}>
        {data.map((feat) => {
          let html;

          if (feat.id.toString() === dataModal.id.toString()) {
            return <CategoryForm defaultValues={feat} key={feat.id} onFormSubmit={onFormSubmit} />;
          }
          return html;
        })}
      </ModalWrapper>
    </div>
  );
}
